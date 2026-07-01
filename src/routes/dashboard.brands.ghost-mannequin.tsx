import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Sparkles, Download, Save, Camera, Loader2, Check } from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";
import before from "@/assets/g2-before.jpg";
import after from "@/assets/ghost-mannequin-result.jpg";

export const Route = createFileRoute("/dashboard/brands/ghost-mannequin")({
  head: () => ({ meta: [{ title: "Ghost Mannequin — TryVerse Brand Studio" }] }),
  component: GhostPage,
});

const TYPES = ["Jacket", "Dress", "Shirt", "Hoodie", "Pants"] as const;
const BGS = ["White", "Light grey", "Transparent", "Soft studio"] as const;
const OUTS = ["Front view", "Back view", "Detail crop", "Full set"] as const;

function Pill<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)}
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

function GhostPage() {
  const [uploaded, setUploaded] = useState(false);
  const [type, setType] = useState<typeof TYPES[number]>("Jacket");
  const [bg, setBg] = useState<typeof BGS[number]>("White");
  const [out, setOut] = useState<typeof OUTS[number]>("Front view");
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [split, setSplit] = useState(50);

  function generate() {
    if (!uploaded) { setUploaded(true); return; }
    setPhase("loading");
    setTimeout(() => setPhase("done"), 1600);
  }

  return (
    <BrandShell title="Ghost Mannequin">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10">
        <BrandPageHeader
          eyebrow="Brand Studio"
          title="Ghost Mannequin"
          subtitle="Convert flat-lay, hanger, or mannequin clothing photos into clean product-ready visuals."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-6">
            <div>
              <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Upload Garment Photo</div>
              <button onClick={() => setUploaded(true)}
                className={`relative w-full aspect-[4/5] rounded-xl border-2 border-dashed overflow-hidden transition ${
                  uploaded ? "border-purple-400/60" : "border-white/15 hover:border-purple-400/50 bg-white/[0.02]"
                }`}>
                {uploaded ? (
                  <img src={before} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-center px-6">
                    <div>
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200"><Upload size={18} /></span>
                      <div className="mt-3 text-[13.5px] text-white">Upload flat-lay, hanger, or mannequin image</div>
                      <div className="mt-1 text-[12px] text-white/50">JPG, PNG, WebP up to 20MB</div>
                    </div>
                  </div>
                )}
              </button>
            </div>

            <div><div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Product type</div><Pill options={TYPES} value={type} onChange={setType} /></div>
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Background</div><Pill options={BGS} value={bg} onChange={setBg} /></div>
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Output</div><Pill options={OUTS} value={out} onChange={setOut} /></div>

            <button onClick={generate} disabled={phase === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-3 text-[14px] font-medium shadow-[0_0_28px_rgba(168,85,247,0.5)] disabled:opacity-60">
              {phase === "loading" ? <><Loader2 size={16} className="animate-spin" /> Generating…</> : <><Sparkles size={16} /> Generate Ghost Mannequin</>}
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 min-h-[600px]">
            <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-4">Preview</div>

            {phase !== "done" ? (
              <div className="grid place-items-center h-[500px] text-center rounded-xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_60%)]">
                {phase === "loading" ? (
                  <div><Loader2 size={28} className="mx-auto animate-spin text-purple-300" /><div className="mt-4 text-white">Cleaning garment…</div></div>
                ) : (
                  <div>
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-200"><Sparkles size={22} /></span>
                    <div className="mt-4 text-white">Upload a garment to see the ghost mannequin preview.</div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                <div className="relative aspect-[4/5] max-w-[520px] mx-auto rounded-xl overflow-hidden border border-white/10 select-none">
                  <img src={after} alt="Ghost mannequin" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: `${split}%` }}>
                    <img src={before} alt="Original" className="absolute inset-0 h-full w-full object-cover" style={{ width: `${100 / (split / 100)}%`, maxWidth: "none" }} />
                  </div>
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 text-white text-[11px] px-2 py-0.5 border border-white/10">Original</div>
                  <div className="absolute top-3 right-3 rounded-full bg-purple-600/70 text-white text-[11px] px-2 py-0.5 border border-purple-300/40">Ghost Mannequin</div>
                  <div className="absolute inset-y-0" style={{ left: `${split}%` }}>
                    <div className="w-0.5 h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.7)]" />
                  </div>
                  <input type="range" min={0} max={100} value={split} onChange={(e) => setSplit(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" aria-label="Compare slider" />
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 text-[11.5px]"><Check size={11} /> Fabric preserved</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 text-[11.5px]"><Check size={11} /> Clean background</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 text-[11.5px]"><Check size={11} /> Ecommerce ready</span>
                </div>

                <div className="flex flex-wrap gap-2 justify-center pt-2">
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"><Download size={13} /> Download PNG</button>
                  <button className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><Save size={13} /> Save to Catalog</button>
                  <Link to="/dashboard/brands/photoshoot" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><Camera size={13} /> Create AI Photoshoot</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
