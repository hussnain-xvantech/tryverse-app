import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Upload, Sparkles, Download, Save, Camera, Loader2, Check, X,
  ArrowLeft, ArrowRight, Layers, Shirt, History, RotateCcw, ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";
import flatlay from "@/assets/garment-flatlay.jpg";
import fabricA from "@/assets/g1-before.jpg";
import fabricB from "@/assets/g2-before.jpg";
import fabricC from "@/assets/g2-catalog.jpg";
import resultImg from "@/assets/editorial-hero.jpg";

export const Route = createFileRoute("/dashboard/brands/fabric-studio")({
  head: () => ({ meta: [{ title: "Fabric Studio — TryVerse Brand Studio" }] }),
  component: FabricStudioPage,
});

type StepN = 1 | 2 | 3 | 4 | 5 | 6 | 7;
const STEP_LABELS = ["Type", "Upload", "Mapping", "Style", "Model", "Generate", "Results"] as const;

const MEN_STITCH = ["Kurta", "Shalwar Kameez", "Sherwani", "Prince Coat", "Waistcoat Set", "Pathani Suit"];
const WOMEN_STITCH = ["Straight Shirt", "A-Line", "Frock / Anarkali", "Maxi", "Angrakha", "Coat Style", "Peplum", "Kaftan", "Short Kurti"];
const SLEEVES = ["Full Length", "Three-Quarter", "Half Sleeve", "Bell Sleeve", "Puff Sleeve", "Cuff Sleeve", "Sleeveless"];
const NECKS = ["Round Neck", "V-Neck", "Boat Neck", "Ban / Band Collar", "Collar Neck", "Sweetheart", "Square Neck", "Mandarin / Chinese Collar", "Keyhole"];
const TROUSERS = ["Straight Trouser", "Cigarette Pants", "Palazzo", "Tulip Shalwar", "Sharara", "Gharara", "Farshi Pajama", "Churidar", "Traditional Shalwar", "Dhoti Style", "Boot Cut"];
const DUPATTAS = ["No Dupatta", "Chiffon", "Organza", "Silk", "Net", "Cotton", "Velvet", "Bridal Heavy"];
const SKIN_TONES = ["Any", "Fair / Light", "Medium / Olive", "Medium Brown", "Dark / Deep Brown", "East Asian", "Latin / Tan"];
const BODY_TYPES = ["Slim", "Average", "Athletic", "Curvy"];
const AGE_RANGES = ["20s", "30s", "40s"];
const POSES = ["Natural Standing", "Walking", "Three-Quarter Turn", "Seated", "Lifestyle / Candid"];
const BACKGROUNDS = ["Studio White", "Studio Gray", "Outdoor Garden", "Indoor Room", "Custom Color"];
const FITS = ["Slim Fit", "Regular Fit", "Relaxed / Loose"];
const PANEL_ROLES = ["Front Panel", "Back Panel", "Sleeves", "Neck / Gala", "Trouser / Shalwar", "Dupatta", "Other"];

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <div className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/85 mb-2.5">{title}</div>
        {hint && <div className="text-[11.5px] text-white/40">{hint}</div>}
      </div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[12.5px] border transition ${
        active
          ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.4)]"
          : "bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
      }`}
    >{children}</button>
  );
}

function Stepper({ step, maxUnlocked, onStep }: { step: StepN; maxUnlocked: StepN; onStep: (n: StepN) => void }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-max">
        {STEP_LABELS.map((label, idx) => {
          const n = (idx + 1) as StepN;
          const active = step === n;
          const done = n < step;
          const enabled = n <= maxUnlocked;
          return (
            <div key={n} className="flex items-center gap-2">
              <button
                type="button"
                disabled={!enabled}
                onClick={() => enabled && onStep(n)}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 border text-[12.5px] transition ${
                  active
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.45)]"
                    : done
                    ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/15"
                    : enabled
                    ? "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                    : "bg-white/[0.02] border-white/5 text-white/30 cursor-not-allowed"
                }`}
              >
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[10.5px] font-semibold ${
                  active ? "bg-white/20 text-white" : done ? "bg-emerald-400/20 text-emerald-100" : "bg-white/10 text-white/60"
                }`}>
                  {done ? <Check size={11} /> : n}
                </span>
                {label}
              </button>
              {idx < STEP_LABELS.length - 1 && <div className="h-px w-6 bg-white/10" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
function FabricStudioPage() {
  const [step, setStep] = useState<StepN>(1);
  const [maxUnlocked, setMaxUnlocked] = useState<StepN>(1);

  // Step 1
  const [garmentType, setGarmentType] = useState<"eastern" | "western">("eastern");

  // Step 2
  const [uploads, setUploads] = useState<{ id: string; role: string; img: string; confidence: number }[]>([]);
  const bulkUpload = () => {
    setUploads([
      { id: "u1", role: "Trouser / Shalwar", img: fabricA, confidence: 92 },
      { id: "u2", role: "Front Panel", img: fabricB, confidence: 96 },
      { id: "u3", role: "Back Panel", img: fabricC, confidence: 88 },
    ]);
  };
  const addSingle = (role: string) => {
    if (uploads.find((u) => u.role === role)) return;
    const pool = [fabricA, fabricB, fabricC];
    setUploads((u) => [...u, { id: `u${u.length + 1}`, role, img: pool[u.length % 3], confidence: 90 }]);
  };
  const updateRole = (id: string, role: string) =>
    setUploads((u) => u.map((x) => (x.id === id ? { ...x, role } : x)));

  // Step 4
  const [gender, setGender] = useState<"Women" | "Men">("Men");
  const [stitch, setStitch] = useState<string>("Kurta");
  const [sleeve, setSleeve] = useState<string>("Full Length");
  const [neck, setNeck] = useState<string>("Ban / Band Collar");
  const [trouser, setTrouser] = useState<string>("Straight Trouser");
  const [dupatta, setDupatta] = useState<string>("No Dupatta");
  const [designLib, setDesignLib] = useState(false);

  // Step 5
  const [skin, setSkin] = useState("Any");
  const [body, setBody] = useState("Average");
  const [age, setAge] = useState("30s");
  const [pose, setPose] = useState("Natural Standing");
  const [bg, setBg] = useState("Studio White");
  const [fit, setFit] = useState("Regular Fit");
  const [notes, setNotes] = useState("");

  // Step 6
  const [genPhase, setGenPhase] = useState<"idle" | "loading" | "done">("idle");

  function goto(n: StepN) {
    setStep(n);
    if (n > maxUnlocked) setMaxUnlocked(n);
  }
  function next() {
    if (step < 7) goto((step + 1) as StepN);
  }
  function back() {
    if (step > 1) setStep((step - 1) as StepN);
  }
  function startGenerate() {
    goto(6);
    setGenPhase("loading");
    setTimeout(() => {
      setGenPhase("done");
      goto(7);
    }, 2200);
  }
  function reset() {
    setStep(1); setMaxUnlocked(1); setUploads([]); setGenPhase("idle");
  }

  const canNext =
    (step === 1) ||
    (step === 2 && uploads.length > 0) ||
    (step === 3 && uploads.length > 0) ||
    (step === 4) ||
    (step === 5) ||
    step === 6 || step === 7;

  const stitchOptions = gender === "Men" ? MEN_STITCH : WOMEN_STITCH;

  return (
    <BrandShell title="Fabric Studio">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-8 pb-20">
        <div className="flex items-start gap-3">
          <Link
            to="/dashboard/brands"
            className="mt-1 grid h-9 w-9 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Back to dashboard"
          ><ArrowLeft size={15} /></Link>
          <div className="flex-1">
            <BrandPageHeader
              eyebrow="Brand Studio"
              title="Garment Builder"
              subtitle="From Fabric to Fashion in Seconds."
              right={
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/dashboard/brands/fabric-studio/history"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-3.5 py-1.5 text-[12.5px]"
                  ><History size={13} /> History</Link>
                  <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-200 px-2.5 py-1 text-[11.5px]">
                    <Layers size={12} /> 7-step workflow
                  </span>
                </div>
              }
            />
          </div>
        </div>

        <Stepper step={step} maxUnlocked={maxUnlocked} onStep={goto} />

        {/* STEP 1 */}
        {step === 1 && (
          <div className="mt-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl text-white">What are you creating?</h2>
              <p className="mt-2 text-[14.5px] text-white/60">Choose your garment type for a tailored experience.</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  id: "eastern" as const,
                  title: "Eastern Unstitched Suit",
                  desc: "Pakistani and South Asian unstitched fabrics. Upload product photos and choose stitching style, sleeves, neckline, trouser, and dupatta.",
                  tags: ["Shalwar Kameez", "Frock", "Angrakha", "Sharara", "Lehenga"],
                  img: fabricA,
                },
                {
                  id: "western" as const,
                  title: "Western Clothing",
                  desc: "Suits, dresses, blazers, shirts, and more. Upload fabric swatches and choose from the template library.",
                  tags: ["Suit", "Dress", "Blazer", "Jumpsuit", "Co-Ord"],
                  img: fabricB,
                },
              ].map((c) => {
                const active = garmentType === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setGarmentType(c.id)}
                    className={`text-left rounded-2xl border p-5 transition backdrop-blur-xl ${
                      active
                        ? "border-purple-400/60 bg-gradient-to-br from-purple-600/15 to-fuchsia-500/8 shadow-[0_0_28px_rgba(168,85,247,0.25)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-xl overflow-hidden border border-white/10 bg-black/40 shrink-0">
                        <img src={c.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Shirt size={15} className="text-purple-300" />
                          <div className="text-[16px] font-medium text-white">{c.title}</div>
                          {active && <Check size={15} className="ml-auto text-purple-300" />}
                        </div>
                        <p className="mt-2 text-[13px] text-white/60 leading-snug">{c.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <span key={t} className="text-[11.5px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70">{t}</span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="mt-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl text-white">Upload Your Product Images</h2>
              <p className="mt-2 text-[14.5px] text-white/60">Upload catalog photos. TryVerse will automatically detect each piece.</p>
            </div>

            <button
              type="button"
              onClick={bulkUpload}
              className="w-full rounded-2xl border-2 border-dashed border-purple-400/40 bg-gradient-to-br from-purple-600/10 to-fuchsia-500/5 hover:border-purple-400/70 transition p-8 text-center"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200">
                <Upload size={20} />
              </span>
              <div className="mt-4 text-white text-[15px] font-medium">Upload All Product Images</div>
              <div className="mt-1 text-[13px] text-white/60">Drop up to 8 photos. AI will understand which is front, back, sleeves, dupatta, trouser, etc.</div>
              <div className="mt-3 inline-block text-[12px] text-purple-200 bg-purple-500/10 border border-purple-400/30 rounded-full px-3 py-1">
                Just upload your catalog images as-is. No need to organize.
              </div>
            </button>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { role: "Front Panel", req: true },
                { role: "Back Panel", req: false },
                { role: "Sleeves", req: false },
                { role: "Neck / Gala", req: false },
                { role: "Trouser / Shalwar", req: false },
                { role: "Dupatta", req: false },
              ].map((slot) => {
                const found = uploads.find((u) => u.role === slot.role);
                return (
                  <button
                    key={slot.role}
                    type="button"
                    onClick={() => addSingle(slot.role)}
                    className={`relative aspect-[4/3] rounded-xl border overflow-hidden transition ${
                      found
                        ? "border-purple-400/50 bg-black/40"
                        : "border-white/10 bg-white/[0.03] border-dashed hover:border-purple-400/40"
                    }`}
                  >
                    {found ? (
                      <img src={found.img} alt={slot.role} className="absolute inset-0 h-full w-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-center px-4">
                        <div>
                          <Upload size={16} className="mx-auto text-white/60" />
                          <div className="mt-2 text-[13px] text-white">{slot.role}</div>
                          <div className="text-[11.5px] text-white/40">{slot.req ? "Required" : "Optional"}</div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 rounded-full bg-black/70 border border-white/10 text-white text-[10.5px] px-2 py-0.5">
                      {slot.role}
                    </div>
                    {found && <div className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-purple-600 text-white"><Check size={12} /></div>}
                  </button>
                );
              })}
            </div>

            {uploads.length > 0 && (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-400/30 px-4 py-2.5 text-[13px] text-emerald-200 flex items-center gap-2">
                <Check size={14} /> {uploads.length} fabric{uploads.length > 1 ? "s" : ""} uploaded and detected.
              </div>
            )}
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="mt-8 space-y-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl text-white">Fabric Mapping Preview</h2>
              <p className="mt-2 text-[14.5px] text-white/60">Review how AI mapped your images. Reassign if needed.</p>
            </div>
            <div className="space-y-3">
              {uploads.map((u) => (
                <div key={u.id} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-white/10 bg-black/40 shrink-0">
                    <img src={u.img} alt={u.role} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] text-white truncate">{u.role} Fabric</div>
                    <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2 py-0.5 text-[11px]">
                      <Check size={10} /> {u.confidence}% confident
                    </div>
                  </div>
                  <div className="relative">
                    <select
                      value={u.role}
                      onChange={(e) => updateRole(u.id, e.target.value)}
                      className="appearance-none rounded-lg bg-white/5 border border-white/10 text-white text-[13px] pl-3 pr-8 py-2 hover:bg-white/10 focus:outline-none focus:border-purple-400/60"
                    >
                      {PANEL_ROLES.map((r) => <option key={r} value={r} className="bg-[#1a1130]">{r}</option>)}
                    </select>
                    <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="mt-8 space-y-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl text-white">Choose Your Stitching Style</h2>
              <p className="mt-2 text-[14.5px] text-white/60">Customize every detail of the garment.</p>
            </div>

            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
              {(["Women", "Men"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setGender(g);
                    setStitch((g === "Men" ? MEN_STITCH : WOMEN_STITCH)[0]);
                  }}
                  className={`px-5 py-1.5 rounded-full text-[13px] transition ${
                    gender === g
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.4)]"
                      : "text-white/60 hover:text-white"
                  }`}
                >{g}</button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-5">
                <Section title="Stitching Style">
                  <div className="flex flex-wrap gap-2">
                    {stitchOptions.map((s) => <Chip key={s} active={stitch === s} onClick={() => setStitch(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <Section title="Sleeve Style">
                  <div className="flex flex-wrap gap-2">
                    {SLEEVES.map((s) => <Chip key={s} active={sleeve === s} onClick={() => setSleeve(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <Section title="Neck Style">
                  <div className="flex flex-wrap gap-2">
                    {NECKS.map((s) => <Chip key={s} active={neck === s} onClick={() => setNeck(s)}>{s}</Chip>)}
                  </div>
                </Section>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-5">
                <Section title="Trouser Style">
                  <div className="flex flex-wrap gap-2">
                    {TROUSERS.map((s) => <Chip key={s} active={trouser === s} onClick={() => setTrouser(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <Section title="Dupatta Style">
                  <div className="flex flex-wrap gap-2">
                    {DUPATTAS.map((s) => <Chip key={s} active={dupatta === s} onClick={() => setDupatta(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <div className={`rounded-xl border p-4 transition ${
                  designLib ? "border-purple-400/60 bg-gradient-to-br from-purple-600/15 to-fuchsia-500/8" : "border-white/10 bg-white/[0.03]"
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[14px] text-white font-medium">Design Library</div>
                      <p className="mt-1 text-[12.5px] text-white/60">Generate multiple stitch ideas from the same fabric — see your fabric as different garment styles.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDesignLib((v) => !v)}
                      className={`shrink-0 rounded-full px-4 py-1.5 text-[12.5px] font-medium transition ${
                        designLib
                          ? "bg-white/15 border border-white/20 text-white"
                          : "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.4)]"
                      }`}
                    >{designLib ? "Enabled" : "Enable"}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="mt-8 space-y-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl text-white">Model & Photography</h2>
              <p className="mt-2 text-[14.5px] text-white/60">Choose your model and setting.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-5">
                <div className="text-[13px] font-medium text-white">Model</div>
                <Section title="Skin Tone">
                  <div className="flex flex-wrap gap-2">
                    {SKIN_TONES.map((s) => <Chip key={s} active={skin === s} onClick={() => setSkin(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <Section title="Body Type">
                  <div className="flex flex-wrap gap-2">
                    {BODY_TYPES.map((s) => <Chip key={s} active={body === s} onClick={() => setBody(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <Section title="Age Range">
                  <div className="flex flex-wrap gap-2">
                    {AGE_RANGES.map((s) => <Chip key={s} active={age === s} onClick={() => setAge(s)}>{s}</Chip>)}
                  </div>
                </Section>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-5">
                <div className="text-[13px] font-medium text-white">Photography</div>
                <Section title="Pose">
                  <div className="flex flex-wrap gap-2">
                    {POSES.map((s) => <Chip key={s} active={pose === s} onClick={() => setPose(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <Section title="Background">
                  <div className="flex flex-wrap gap-2">
                    {BACKGROUNDS.map((s) => <Chip key={s} active={bg === s} onClick={() => setBg(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <Section title="Fit Style">
                  <div className="flex flex-wrap gap-2">
                    {FITS.map((s) => <Chip key={s} active={fit === s} onClick={() => setFit(s)}>{s}</Chip>)}
                  </div>
                </Section>
                <Section title="Custom Instructions">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Any special notes, e.g. minimal embroidery focus, modern catalog look, premium studio lighting."
                    className="w-full rounded-xl bg-white/[0.04] border border-white/10 text-white text-[13px] p-3 focus:outline-none focus:border-purple-400/60 placeholder:text-white/35"
                  />
                </Section>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-600/10 to-fuchsia-500/5 p-4 flex flex-wrap items-center gap-4 justify-between">
              <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-white/80">
                <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5">{garmentType === "eastern" ? "Eastern" : "Western"} — {stitch}</span>
                <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5">{uploads.length || 3} fabrics</span>
                <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5">{gender}</span>
                <span className="rounded-full bg-white/10 border border-white/10 px-2.5 py-0.5">{pose}</span>
                <span className="rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-100 px-2.5 py-0.5">1 Credit</span>
              </div>
              <button
                type="button"
                onClick={startGenerate}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13.5px] font-medium shadow-[0_0_22px_rgba(168,85,247,0.5)]"
              >
                <Sparkles size={14} /> Generate · 1 Credit
              </button>
            </div>
          </div>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
            <div className="text-center max-w-xl mx-auto">
              <Loader2 size={30} className="mx-auto animate-spin text-purple-300" />
              <h2 className="mt-4 font-display text-2xl text-white">Creating Your Visualization</h2>
              <p className="mt-2 text-[13.5px] text-white/60">
                Our AI is analyzing your fabric and generating a photorealistic outfit. This takes about 30–45 seconds.
              </p>
            </div>
            <div className="mt-8 max-w-md mx-auto space-y-2.5">
              {["Reading fabric images", "Mapping garment panels", "Applying stitching style", "Building model preview", "Rendering final outfit"].map((s, i) => (
                <div key={s} className="flex items-center gap-3 rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2 text-[13px] text-white/80">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-[11px]">{i + 1}</span>
                  {s}
                  {genPhase === "loading" && i < 3 && <Loader2 size={12} className="ml-auto animate-spin text-purple-300" />}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-[12px] text-white/50">
              <div>Fabrics: Trouser, Front, Back · Style: {stitch}</div>
            </div>
          </div>
        )}

        {/* STEP 7 */}
        {step === 7 && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 to-purple-500/5 p-6 flex flex-col md:flex-row md:items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200">
                <Check size={22} />
              </span>
              <div className="flex-1">
                <div className="font-display text-2xl text-white">Your Visualization is Ready!</div>
                <div className="mt-1 text-[13.5px] text-white/60">Classic {stitch} — Generated in 8.2s</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => toast.success("Downloading outfit…")} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"><Download size={13} /> Download</button>
                <button onClick={() => toast.success("Saved to catalog")} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><Save size={13} /> Save to Catalog</button>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 space-y-3">
                <div className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/85">Your Fabrics</div>
                {(uploads.length > 0 ? uploads : [
                  { id: "u1", role: "Trouser", img: fabricA, confidence: 92 },
                  { id: "u2", role: "Front", img: fabricB, confidence: 96 },
                  { id: "u3", role: "Back", img: fabricC, confidence: 88 },
                ]).map((u) => (
                  <div key={u.id} className="flex items-center gap-3 rounded-lg bg-white/[0.04] border border-white/10 p-2">
                    <div className="relative h-14 w-14 rounded-md overflow-hidden border border-white/10 bg-black/40 shrink-0">
                      <img src={u.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    <div className="text-[13px] text-white">{u.role}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4">
                <div className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/85 mb-3">Generated Outfit</div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-[4/5]">
                  <img src={resultImg} alt="Generated outfit" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute top-3 left-3 rounded-full bg-purple-600/70 text-white text-[11px] px-2 py-0.5 border border-purple-300/40">
                    {gender} · {stitch} · {pose}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <button type="button" onClick={() => setStep(4)} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><Shirt size={13} /> Different Style</button>
              <button type="button" onClick={() => setStep(5)} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><RotateCcw size={13} /> Different Model</button>
              <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><Upload size={13} /> New Fabric</button>
              <Link to="/dashboard/brands/photoshoot" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"><Camera size={13} /> Create Photoshoot</Link>
            </div>
          </div>
        )}

        {/* Nav */}
        {step < 7 && (
          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 text-[13px] disabled:opacity-40 disabled:cursor-not-allowed"
            ><ArrowLeft size={13} /> Back</button>
            {step === 5 ? (
              <button
                type="button"
                onClick={startGenerate}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              ><Sparkles size={13} /> Generate</button>
            ) : step === 6 ? null : (
              <button
                type="button"
                onClick={next}
                disabled={!canNext}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >Next <ArrowRight size={13} /></button>
            )}
          </div>
        )}
      </section>
    </BrandShell>
  );
}
