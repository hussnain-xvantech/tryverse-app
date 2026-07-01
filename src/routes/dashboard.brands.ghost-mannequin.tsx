import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Upload, Sparkles, Download, Save, Camera, Video, Loader2, Check,
  ArrowLeft, ArrowRight, Ghost, X, RotateCcw, ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";
import flatlay from "@/assets/garment-flatlay.jpg";
import mannequinImg from "@/assets/ghost-mannequin-result.jpg";
import modelImg from "@/assets/editorial-hero.jpg";
import referenceImg from "@/assets/user-reference.jpg";

export const Route = createFileRoute("/dashboard/brands/ghost-mannequin")({
  head: () => ({ meta: [{ title: "Ghost Mannequin — TryVerse Brand Studio" }] }),
  component: GhostPage,
});

/* ---------- Options ---------- */
const MANNEQUIN_STYLES = [
  { id: "ghost", name: "Ghost / Invisible", desc: "Garment floats on an invisible body" },
  { id: "full", name: "Full Body", desc: "Standard retail mannequin" },
  { id: "half", name: "Half Body", desc: "Waist up with head and arms" },
  { id: "torso", name: "Torso Only", desc: "No head, arms, or legs" },
] as const;

const POSES_STEP1 = ["Front", "Hand on Hip", "Walking", "3/4 Turn", "Side View", "Back View", "Arms Crossed", "Seated"];
const INPUT_TYPES = ["Mannequin Photo", "Flat-Lay / Ghost", "Model Swap"];
const MODEL_POSES = ["Standing", "Walking", "3/4 Turn", "Seated", "Casual", "Runway"];
const SKIN_TONES = [
  { id: "fair", hex: "#f6dcc4" }, { id: "light", hex: "#eec9a6" },
  { id: "medium", hex: "#d6a375" }, { id: "tan", hex: "#b6814f" },
  { id: "brown", hex: "#8b5a34" }, { id: "deep", hex: "#5a3720" },
  { id: "auto", hex: "transparent" },
];

/* ---------- Small primitives ---------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/85 mb-2.5">{title}</div>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[12.5px] border transition ${
        active
          ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.4)]"
          : "bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
      }`}
    >{children}</button>
  );
}

function StyleCard({ active, onClick, name, desc }: { active: boolean; onClick: () => void; name: string; desc: string }) {
  return (
    <button
      onClick={onClick}
      className={`text-left w-full rounded-xl border p-3 transition ${
        active
          ? "border-purple-400/60 bg-gradient-to-br from-purple-600/15 to-fuchsia-500/10 shadow-[0_0_18px_rgba(168,85,247,0.2)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[13.5px] font-medium text-white">{name}</span>
        {active && <Check size={14} className="text-purple-300" />}
      </div>
      <div className="mt-1 text-[12px] text-white/55 leading-snug">{desc}</div>
    </button>
  );
}

/* ---------- Stepper ---------- */
function Stepper({ step, canStep2, onStep }: { step: 1 | 2 | 3; canStep2: boolean; onStep: (n: 1 | 2) => void }) {
  const items = [
    { n: 1 as const, label: "Product → Mannequin" },
    { n: 2 as const, label: "Mannequin → Model" },
  ];
  return (
    <div className="mt-6 overflow-x-auto">
      <div className="flex items-center gap-3 min-w-max">
        {items.map((it, i) => {
          const active = step === it.n || (step === 3 && it.n === 2);
          const done = (it.n === 1 && step >= 2) || (it.n === 2 && step === 3);
          const enabled = it.n === 1 || canStep2;
          return (
            <div key={it.n} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => enabled && onStep(it.n)}
                disabled={!enabled}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 border text-[12.5px] transition ${
                  active
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.45)]"
                    : done
                    ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-200 hover:bg-emerald-500/15"
                    : enabled
                    ? "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
                    : "bg-white/[0.02] border-white/5 text-white/30 cursor-not-allowed"
                }`}
              >
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[10.5px] font-semibold ${
                  active ? "bg-white/20 text-white" : done ? "bg-emerald-400/20 text-emerald-100" : "bg-white/10 text-white/60"
                }`}>
                  {done ? <Check size={11} /> : it.n}
                </span>
                {it.label}
              </button>
              {i < items.length - 1 && <div className="h-px w-8 bg-white/10" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
function GhostPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 state
  const [uploaded, setUploaded] = useState(false);
  const [style, setStyle] = useState<(typeof MANNEQUIN_STYLES)[number]["id"]>("ghost");
  const [pose1, setPose1] = useState("Front");
  const [phase1, setPhase1] = useState<"idle" | "loading" | "done">("idle");

  // Step 2 state
  const [gender, setGender] = useState<"Female" | "Male">("Female");
  const [inputType, setInputType] = useState("Flat-Lay / Ghost");
  const [skin, setSkin] = useState("auto");
  const [pose2, setPose2] = useState("Runway");
  const [phase2, setPhase2] = useState<"idle" | "loading" | "done">("idle");
  const [useReference, setUseReference] = useState(true);

  function generateMannequin() {
    if (!uploaded) return;
    setPhase1("loading");
    setTimeout(() => setPhase1("done"), 1400);
  }
  function generateModel() {
    setPhase2("loading");
    setTimeout(() => {
      setPhase2("done");
      setStep(3);
    }, 1500);
  }
  function reset() {
    setStep(1); setUploaded(false); setPhase1("idle"); setPhase2("idle");
    setStyle("ghost"); setPose1("Front");
  }

  return (
    <BrandShell title="Ghost Mannequin">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-8 pb-20">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Link
            to="/dashboard/brands"
            className="mt-1 grid h-9 w-9 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={15} />
          </Link>
          <div className="flex-1">
            <BrandPageHeader
              eyebrow="Brand Studio"
              title="Ghost Mannequin"
              subtitle="Professional garment photography pipeline — turn flat-lays into clean mannequin shots, then into model photography."
              right={
                <span className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-200 px-2.5 py-1 text-[11.5px]">
                  <Ghost size={12} /> 2-step workflow
                </span>
              }
            />
          </div>
        </div>

        <Stepper step={step} canStep2={phase1 === "done"} />

        {/* STEP 1 */}
        {step === 1 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[440px_1fr]">
            {/* Controls */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-6">
              <Section title="Upload Product Photo">
                <button
                  onClick={() => setUploaded(true)}
                  className={`relative w-full aspect-[4/5] rounded-xl border-2 border-dashed overflow-hidden transition ${
                    uploaded ? "border-purple-400/60" : "border-white/15 hover:border-purple-400/50 bg-white/[0.02]"
                  }`}
                >
                  {uploaded ? (
                    <>
                      <img src={flatlay} alt="Uploaded garment" className="absolute inset-0 h-full w-full object-contain bg-black/40 p-6" />
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); setUploaded(false); setPhase1("idle"); }}
                        className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 border border-white/20 text-white hover:bg-black/90"
                        aria-label="Remove"
                      >
                        <X size={13} />
                      </span>
                    </>
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-center px-6">
                      <div>
                        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200">
                          <Upload size={18} />
                        </span>
                        <div className="mt-3 text-[13.5px] text-white">Upload Product Photo</div>
                        <div className="mt-1 text-[12px] text-white/50">JPG, PNG, WebP up to 20MB</div>
                        <div className="mt-1 text-[11.5px] text-white/40">Drag and drop or click to upload</div>
                      </div>
                    </div>
                  )}
                </button>
                {uploaded && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-400/30 px-3 py-2 text-[12.5px] text-emerald-200">
                    <Check size={13} /> Detected: Shalwar Kameez
                  </div>
                )}
              </Section>

              <Section title="Mannequin Style">
                <div className="grid grid-cols-2 gap-2.5">
                  {MANNEQUIN_STYLES.map((s) => (
                    <StyleCard key={s.id} active={style === s.id} onClick={() => setStyle(s.id)} name={s.name} desc={s.desc} />
                  ))}
                </div>
              </Section>

              <Section title="Pose">
                <div className="flex flex-wrap gap-2">
                  {POSES_STEP1.map((p) => (
                    <Chip key={p} active={pose1 === p} onClick={() => setPose1(p)}>{p}</Chip>
                  ))}
                </div>
              </Section>

              <button
                onClick={generateMannequin}
                disabled={!uploaded || phase1 === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-3 text-[14px] font-medium shadow-[0_0_28px_rgba(168,85,247,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {phase1 === "loading" ? <><Loader2 size={16} className="animate-spin" /> Generating mannequin…</> : <><Sparkles size={16} /> Generate Mannequin</>}
              </button>
            </div>

            {/* Preview */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 min-h-[600px] flex flex-col">
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/85 mb-4">Preview</div>
              {phase1 !== "done" ? (
                <div className="flex-1 grid place-items-center text-center rounded-xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)] min-h-[500px]">
                  {phase1 === "loading" ? (
                    <div>
                      <Loader2 size={30} className="mx-auto animate-spin text-purple-300" />
                      <div className="mt-4 text-white">Generating mannequin…</div>
                      <div className="mt-1 text-[12.5px] text-white/50">Isolating garment · reconstructing shape · cleaning background</div>
                    </div>
                  ) : (
                    <div className="max-w-sm">
                      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-200">
                        <Ghost size={22} />
                      </span>
                      <div className="mt-4 text-white text-[15px]">Mannequin result will appear here</div>
                      <div className="mt-1.5 text-[13px] text-white/55">Upload a product photo and click Generate.</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-5 flex-1 flex flex-col">
                  <div className="relative flex-1 rounded-xl overflow-hidden border border-white/10 bg-black/40 min-h-[500px]">
                    <img src={mannequinImg} alt="Ghost mannequin" className="absolute inset-0 h-full w-full object-contain p-4" />
                    <div className="absolute top-3 left-3 rounded-full bg-purple-600/70 text-white text-[11px] px-2 py-0.5 border border-purple-300/40">Ghost Mannequin · {pose1}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 text-[11.5px]"><Check size={11} /> Fabric preserved</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 text-[11.5px]"><Check size={11} /> Clean background</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 text-[11.5px]"><Check size={11} /> Ecommerce ready</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center pt-1">
                    <button
                      onClick={() => toast.success("Downloading mannequin PNG…")}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"
                    >
                      <Download size={13} /> Download
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    >
                      Continue to Step 2 <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[440px_1fr]">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-6">
              <Section title="Gender">
                <div className="grid grid-cols-2 gap-2">
                  {(["Female", "Male"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`py-2.5 rounded-xl border text-[13px] transition ${
                        gender === g
                          ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.4)]"
                          : "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >{g}</button>
                  ))}
                </div>
              </Section>

              <Section title="Garment / Mannequin Photo">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-black/40">
                  <img src={mannequinImg} alt="Mannequin" className="absolute inset-0 h-full w-full object-contain p-4" />
                  <button
                    onClick={() => setStep(1)}
                    className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/70 border border-white/20 text-white px-2.5 py-1 text-[11.5px] hover:bg-black/90"
                  >
                    <RotateCcw size={11} /> Change
                  </button>
                  <div className="absolute top-2 left-2 rounded-full bg-purple-600/70 text-white text-[10.5px] px-2 py-0.5 border border-purple-300/40">From Step 1</div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-400/30 px-3 py-2 text-[12.5px] text-emerald-200">
                  <Check size={13} /> Detected: Shalwar Kameez · {gender}
                </div>
              </Section>

              <Section title="Reference Model (optional)">
                <button
                  onClick={() => setUseReference((v) => !v)}
                  className={`relative w-full aspect-[4/5] rounded-xl border overflow-hidden transition ${
                    useReference ? "border-purple-400/60 shadow-[0_0_18px_rgba(168,85,247,0.2)]" : "border-white/15 opacity-60"
                  }`}
                >
                  <img src={referenceImg} alt="Reference" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2.5 text-left">
                    <div className="text-[12px] text-white">Editorial Reference</div>
                    <div className="text-[11px] text-white/60">{useReference ? "Selected" : "Tap to use"}</div>
                  </div>
                  {useReference && <div className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-purple-600 text-white"><Check size={12} /></div>}
                </button>
              </Section>

              <Section title="Input Type">
                <div className="flex flex-wrap gap-2">
                  {INPUT_TYPES.map((t) => <Chip key={t} active={inputType === t} onClick={() => setInputType(t)}>{t}</Chip>)}
                </div>
              </Section>

              <Section title="Skin Tone">
                <div className="flex flex-wrap gap-2.5">
                  {SKIN_TONES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSkin(t.id)}
                      title={t.id}
                      className={`relative h-9 w-9 rounded-full border-2 transition ${
                        skin === t.id ? "border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.55)]" : "border-white/15 hover:border-white/40"
                      } ${t.id === "auto" ? "bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-[9px] font-semibold grid place-items-center" : ""}`}
                      style={t.id === "auto" ? undefined : { background: t.hex }}
                    >
                      {t.id === "auto" ? "AUTO" : null}
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="Model Pose">
                <div className="flex flex-wrap gap-2">
                  {MODEL_POSES.map((p) => <Chip key={p} active={pose2 === p} onClick={() => setPose2(p)}>{p}</Chip>)}
                </div>
              </Section>

              <button
                onClick={generateModel}
                disabled={phase2 === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-3 text-[14px] font-medium shadow-[0_0_28px_rgba(168,85,247,0.5)] disabled:opacity-60"
              >
                {phase2 === "loading" ? <><Loader2 size={16} className="animate-spin" /> Generating model photo…</> : <><Sparkles size={16} /> Generate Model Photo</>}
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 min-h-[600px] flex flex-col">
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/85 mb-4">Model Preview</div>
              {phase2 === "loading" ? (
                <div className="flex-1 grid place-items-center rounded-xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)] min-h-[500px]">
                  <div className="text-center">
                    <Loader2 size={30} className="mx-auto animate-spin text-purple-300" />
                    <div className="mt-4 text-white">Generating model photo…</div>
                    <div className="mt-1 text-[12.5px] text-white/50">Fitting garment · matching pose · rendering final image</div>
                  </div>
                </div>
              ) : phase2 === "idle" ? (
                <div className="flex-1 flex flex-col rounded-xl border border-white/10 bg-black/40 overflow-hidden relative min-h-[500px]">
                  <img src={mannequinImg} alt="Mannequin base" className="absolute inset-0 h-full w-full object-contain p-6 opacity-70" />
                  <div className="relative mt-auto p-4 bg-gradient-to-t from-black/80 to-transparent text-center">
                    <div className="text-[13.5px] text-white">Choose settings and generate a model photo.</div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 rounded-xl border border-white/10 overflow-hidden relative min-h-[500px] bg-black/40">
                  <img src={modelImg} alt="Model result" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute top-3 left-3 rounded-full bg-purple-600/70 text-white text-[11px] px-2 py-0.5 border border-purple-300/40">{gender} · {pose2}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3 — Summary */}
        {step === 3 && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 to-purple-500/5 p-6 flex flex-col md:flex-row md:items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200">
                <ShieldCheck size={22} />
              </span>
              <div className="flex-1">
                <div className="font-display text-2xl text-white">Ghost Mannequin Workflow Complete</div>
                <div className="mt-1 text-[13.5px] text-white/60">Original product uploaded · Ghost mannequin generated · Model photo generated</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => toast.success("Downloading all assets…")} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"><Download size={13} /> Download All</button>
                <button onClick={() => toast.success("Saved all to catalog")} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><Save size={13} /> Save All</button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Original Product", img: flatlay, tag: "Flat-lay", fit: "contain" as const },
                { label: "Ghost Mannequin", img: mannequinImg, tag: "Cleaned", fit: "contain" as const },
                { label: "Model Photo", img: modelImg, tag: `${gender} · ${pose2}`, fit: "cover" as const },
              ].map((c, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
                  <div className={`relative aspect-[4/5] bg-black/40 ${c.fit === "contain" ? "p-4" : ""}`}>
                    <img src={c.img} alt={c.label} className={`absolute inset-0 h-full w-full ${c.fit === "contain" ? "object-contain p-4" : "object-cover"}`} />
                    <span className="absolute top-2 left-2 rounded-full bg-black/60 border border-white/10 text-white text-[10.5px] px-2 py-0.5">{c.tag}</span>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div className="text-[13px] text-white">{c.label}</div>
                    <button onClick={() => toast.success(`Downloading ${c.label}`)} className="text-[12px] text-purple-300 hover:text-white inline-flex items-center gap-1"><Download size={12} /> Download</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.5)]"><RotateCcw size={13} /> New Ghost Mannequin</button>
              <Link to="/dashboard/brands/photoshoot" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2.5 text-[13px]"><Camera size={13} /> Create AI Photoshoot</Link>
              <Link to="/dashboard/brands/video-studio" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2.5 text-[13px]"><Video size={13} /> Create Video</Link>
              <Link to="/dashboard/brands" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2.5 text-[13px]"><ArrowLeft size={13} /> Back to Dashboard</Link>
            </div>
          </div>
        )}
      </section>
    </BrandShell>
  );
}
