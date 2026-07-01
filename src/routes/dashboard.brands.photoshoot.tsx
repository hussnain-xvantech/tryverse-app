import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Upload, Sparkles, Download, Save, Wand2, Video as VideoIcon, Loader2, Check, RefreshCw,
} from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";
import flatlay from "@/assets/garment-flatlay.jpg";
import result from "@/assets/hero-result.jpg";
import v1 from "@/assets/g1-after.jpg";
import v2 from "@/assets/g3-after.jpg";
import v3 from "@/assets/g5-after.jpg";

export const Route = createFileRoute("/dashboard/brands/photoshoot")({
  head: () => ({ meta: [{ title: "AI Photoshoot — TryVerse Brand Studio" }] }),
  component: PhotoshootPage,
});

const STYLES = ["Studio", "Editorial", "Catalog", "Social"] as const;
const MODELS = ["Female", "Male", "Diverse", "Auto"] as const;
const BACKGROUNDS = ["Clean studio", "Soft editorial", "Neutral ecommerce", "Lifestyle"] as const;
const RATIOS = ["1:1", "4:5", "9:16", "16:9"] as const;
const STEPS = ["Reading garment", "Building model pose", "Preserving fabric", "Final render"] as const;

function Pill<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-3 py-1.5 rounded-full text-[12.5px] border transition ${
            value === o
              ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.4)]"
              : "bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
          }`}
        >{o}</button>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">{label}</div>
      {children}
    </div>
  );
}

function PhotoshootPage() {
  const [uploaded, setUploaded] = useState(false);
  const [style, setStyle] = useState<typeof STYLES[number]>("Editorial");
  const [model, setModel] = useState<typeof MODELS[number]>("Female");
  const [bg, setBg] = useState<typeof BACKGROUNDS[number]>("Soft editorial");
  const [ratio, setRatio] = useState<typeof RATIOS[number]>("4:5");
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [step, setStep] = useState(0);

  function generate() {
    if (!uploaded) { setUploaded(true); return; }
    setPhase("loading"); setStep(0);
    STEPS.forEach((_, i) => setTimeout(() => setStep(i + 1), (i + 1) * 500));
    setTimeout(() => setPhase("done"), STEPS.length * 500 + 300);
  }

  return (
    <BrandShell title="AI Photoshoot">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10">
        <BrandPageHeader
          eyebrow="Brand Studio"
          title="AI Photoshoot"
          subtitle="Turn flat-lay, mannequin, or product photos into brand-ready model photos."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
          {/* LEFT: Upload + Settings */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-6">
            <Field label="Upload Product Photo">
              <button
                onClick={() => setUploaded(true)}
                className={`relative w-full aspect-[4/5] rounded-xl border-2 border-dashed transition overflow-hidden ${
                  uploaded ? "border-purple-400/60" : "border-white/15 hover:border-purple-400/50 bg-white/[0.02]"
                }`}
              >
                {uploaded ? (
                  <img src={flatlay} alt="Uploaded garment" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-center px-6">
                    <div>
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200"><Upload size={18} /></span>
                      <div className="mt-3 text-[13.5px] text-white">Upload clothing image</div>
                      <div className="mt-1 text-[12px] text-white/50">JPG, PNG, WebP up to 20MB<br />Flat-lay, hanger, mannequin, or product photo</div>
                    </div>
                  </div>
                )}
              </button>
            </Field>

            <Field label="Output style"><Pill options={STYLES} value={style} onChange={setStyle} /></Field>
            <Field label="Model type"><Pill options={MODELS} value={model} onChange={setModel} /></Field>
            <Field label="Background"><Pill options={BACKGROUNDS} value={bg} onChange={setBg} /></Field>
            <Field label="Aspect ratio"><Pill options={RATIOS} value={ratio} onChange={setRatio} /></Field>

            <button
              onClick={generate}
              disabled={phase === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-3 text-[14px] font-medium shadow-[0_0_28px_rgba(168,85,247,0.5)] hover:scale-[1.01] transition disabled:opacity-60 disabled:hover:scale-100"
            >
              {phase === "loading" ? <><Loader2 size={16} className="animate-spin" /> Generating…</> : <><Sparkles size={16} /> Generate Photoshoot</>}
            </button>
          </div>

          {/* RIGHT: Preview */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 min-h-[600px]">
            <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-4">Live Preview</div>

            {phase !== "done" ? (
              <div className="grid place-items-center h-[500px] text-center px-6 rounded-xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)]">
                <div>
                  {phase === "loading" ? (
                    <>
                      <Loader2 size={28} className="mx-auto animate-spin text-purple-300" />
                      <div className="mt-4 text-white font-medium">Crafting your photoshoot…</div>
                      <div className="mt-6 space-y-2 text-left mx-auto max-w-xs">
                        {STEPS.map((s, i) => (
                          <div key={s} className={`flex items-center gap-2 text-[13px] ${i < step ? "text-emerald-300" : i === step ? "text-white" : "text-white/40"}`}>
                            {i < step ? <Check size={14} /> : i === step ? <Loader2 size={14} className="animate-spin" /> : <span className="h-1.5 w-1.5 rounded-full bg-white/30" />}
                            {s}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-200"><Sparkles size={22} /></span>
                      <div className="mt-4 text-white font-medium">Your AI photoshoot preview will appear here</div>
                      <div className="mt-1 text-[13px] text-white/50">Upload a product photo and choose settings.</div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <div className="text-[11px] tracking-widest uppercase text-white/50 px-3 py-2 border-b border-white/10 bg-white/[0.02]">Uploaded product</div>
                    <img src={flatlay} alt="" className="aspect-[4/5] w-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-purple-400/40 shadow-[0_0_28px_rgba(168,85,247,0.25)]">
                    <div className="text-[11px] tracking-widest uppercase text-purple-200 px-3 py-2 border-b border-purple-400/30 bg-purple-500/10">AI photoshoot</div>
                    <img src={result} alt="" className="aspect-[4/5] w-full object-cover" />
                  </div>
                </div>

                <div>
                  <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Variations</div>
                  <div className="grid grid-cols-3 gap-3">
                    {[v1, v2, v3].map((src, i) => (
                      <img key={i} src={src} alt="" className="aspect-square w-full object-cover rounded-lg border border-white/10 hover:border-purple-400/50 transition cursor-pointer" />
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex flex-wrap gap-2">
                  {STEPS.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 text-[11.5px]">
                      <Check size={11} /> {s}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"><Download size={13} /> Download</button>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><Save size={13} /> Save to Catalog</button>
                  <button onClick={generate} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><RefreshCw size={13} /> Generate Variations</button>
                  <Link to="/dashboard/brands/video-studio" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><VideoIcon size={13} /> Create Video</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
