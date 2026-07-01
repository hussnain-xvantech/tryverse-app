import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Sparkles, Download, Save, Play, Loader2, ArrowLeft, RefreshCw } from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";
import poster from "@/assets/g5-after.jpg";
import t1 from "@/assets/g1-after.jpg";
import t2 from "@/assets/g2-after.jpg";
import t3 from "@/assets/g3-after.jpg";
import t4 from "@/assets/g4-after.jpg";
import t5 from "@/assets/g6-after.jpg";
import t6 from "@/assets/editorial-hero.jpg";

export const Route = createFileRoute("/dashboard/brands/video-studio")({
  head: () => ({ meta: [{ title: "Video Studio — TryVerse Brand Studio" }] }),
  component: VideoStudioPage,
});

const FORMATS = ["9:16 Reels/TikTok", "1:1 Square", "4:5 Instagram", "16:9 Landscape"] as const;
const DURATIONS = ["8 seconds", "12 seconds", "15 seconds"] as const;
const MOTIONS = ["Smooth pan", "Runway motion", "Editorial reveal", "Product detail"] as const;
const BGS = ["Keep original", "Studio glow", "Editorial gradient", "Clean ecommerce"] as const;

const TEMPLATES = [
  { title: "Product Reveal", desc: "Cinematic zoom onto the garment", img: t1 },
  { title: "Model Walk", desc: "Runway-style forward motion", img: t2 },
  { title: "Fabric Detail", desc: "Macro close-ups of texture", img: t3 },
  { title: "Editorial Motion", desc: "Elegant editorial cinematography", img: t4 },
  { title: "Social Ad", desc: "Punchy loop for Reels & TikTok", img: t5 },
  { title: "Catalog Loop", desc: "Clean 360° product turntable", img: t6 },
] as const;

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

function VideoStudioPage() {
  const [uploaded, setUploaded] = useState(false);
  const [format, setFormat] = useState<typeof FORMATS[number]>("9:16 Reels/TikTok");
  const [dur, setDur] = useState<typeof DURATIONS[number]>("8 seconds");
  const [motion, setMotion] = useState<typeof MOTIONS[number]>("Editorial reveal");
  const [bg, setBg] = useState<typeof BGS[number]>("Studio glow");
  const [tpl, setTpl] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");

  function generate() {
    if (!uploaded) { setUploaded(true); return; }
    setPhase("loading");
    setTimeout(() => setPhase("done"), 1700);
  }

  return (
    <BrandShell title="Video Studio">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10">
        <BrandPageHeader
          eyebrow="Brand Studio"
          title="Video Studio"
          subtitle="Create cinematic clothing videos for product launches, ads, Reels, TikTok, and ecommerce pages."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-6">
            <div>
              <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Upload Visual</div>
              <button onClick={() => setUploaded(true)}
                className={`relative w-full aspect-[4/5] rounded-xl border-2 border-dashed overflow-hidden transition ${
                  uploaded ? "border-purple-400/60" : "border-white/15 hover:border-purple-400/50 bg-white/[0.02]"
                }`}>
                {uploaded ? (
                  <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-center px-6">
                    <div>
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200"><Upload size={18} /></span>
                      <div className="mt-3 text-[13.5px] text-white">Upload product photo, AI photoshoot, or catalog image</div>
                      <div className="mt-1 text-[12px] text-white/50">JPG, PNG, WebP, MP4 up to 20MB</div>
                    </div>
                  </div>
                )}
              </button>
            </div>

            <div><div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Format</div><Pill options={FORMATS} value={format} onChange={setFormat} /></div>
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Duration</div><Pill options={DURATIONS} value={dur} onChange={setDur} /></div>
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Motion style</div><Pill options={MOTIONS} value={motion} onChange={setMotion} /></div>
            <div><div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">Background</div><Pill options={BGS} value={bg} onChange={setBg} /></div>

            <button onClick={generate} disabled={phase === "loading"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-3 text-[14px] font-medium shadow-[0_0_28px_rgba(168,85,247,0.5)] disabled:opacity-60">
              {phase === "loading" ? <><Loader2 size={16} className="animate-spin" /> Rendering…</> : <><Sparkles size={16} /> Generate Video</>}
            </button>
          </div>

          <div className="space-y-6 min-w-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
              <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-4">Template Video Styles</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TEMPLATES.map((t, i) => (
                  <button key={t.title} onClick={() => setTpl(i)}
                    className={`group relative rounded-xl overflow-hidden border transition text-left ${
                      tpl === i ? "border-purple-400/70 shadow-[0_0_24px_rgba(168,85,247,0.35)]" : "border-white/10 hover:border-purple-400/40"
                    }`}>
                    <div className="aspect-[4/5] relative">
                      <img src={t.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                      <span className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-white/15 backdrop-blur border border-white/25 text-white"><Play size={12} className="ml-0.5" /></span>
                      <div className="absolute bottom-0 inset-x-0 p-3">
                        <div className="text-[13px] font-medium text-white">{t.title}</div>
                        <div className="text-[11.5px] text-white/60 line-clamp-1">{t.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {phase === "done" && (
              <div className="rounded-2xl border border-purple-400/40 bg-white/[0.03] backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-3">Your Brand Video Is Ready</div>
                <div className="grid md:grid-cols-[280px_1fr] gap-5 items-center">
                  <div className="relative aspect-[9/16] max-w-[280px] rounded-xl overflow-hidden border border-white/10">
                    <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/20 backdrop-blur border border-white/30"><Play size={20} className="ml-0.5 text-white" /></span>
                    </span>
                  </div>
                  <div>
                    <div className="font-display text-xl text-white">{TEMPLATES[tpl].title}</div>
                    <div className="mt-1 text-[13px] text-white/60">{format} · {dur} · {motion}</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"><Download size={13} /> Download Video</button>
                      <button className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><Save size={13} /> Save to Campaign</button>
                      <button onClick={generate} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><RefreshCw size={13} /> Generate Another</button>
                      <Link to="/dashboard/brands" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[13px]"><ArrowLeft size={13} /> Back to Dashboard</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </BrandShell>
  );
}
