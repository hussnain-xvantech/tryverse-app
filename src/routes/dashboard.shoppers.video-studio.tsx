import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Upload,
  Play,
  Sparkles,
  Download,
  RefreshCw,
  Shirt,
  Instagram,
  Megaphone,
  ShoppingBag,
  Video as VideoIcon,
  CheckCircle2,
} from "lucide-react";
import { ShopperPageHeader } from "@/components/site/ShopperShell";
import editorialHero from "@/assets/editorial-hero.jpg";
import g1a from "@/assets/g1-after.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";

export const Route = createFileRoute("/dashboard/shoppers/video-studio")({
  component: VideoStudio,
});

const TEMPLATES = [
  { id: "spin", title: "360° Spin", desc: "Full-body rotation showcasing the outfit from every angle.", cat: "Product", img: editorialHero },
  { id: "runway", title: "Runway Walk", desc: "Confident catwalk-style motion for fashion content.", cat: "Editorial", img: g1a },
  { id: "pose", title: "Pose Shift", desc: "Smooth transition between natural outfit poses.", cat: "Social", img: g2a },
  { id: "detail", title: "Detail Close-Up", desc: "Slow cinematic pan highlighting fabric and design details.", cat: "Product", img: g3a },
  { id: "street", title: "Street Style", desc: "Casual fashion motion for social-ready outfit content.", cat: "Social", img: g4a },
  { id: "drama", title: "Dramatic Entrance", desc: "Bold entrance-style video for campaigns and launches.", cat: "Editorial", img: g5a },
  { id: "slowmo", title: "Slow Motion Walk", desc: "Elegant slow motion fashion walk with polished movement.", cat: "Editorial", img: g1a },
  { id: "turn", title: "Graceful Turn", desc: "Subtle turn motion to reveal the outfit shape and fit.", cat: "Product", img: g2a },
  { id: "seated", title: "Seated Elegance", desc: "Relaxed seated motion for lifestyle fashion content.", cat: "Lifestyle", img: g3a },
  { id: "edit", title: "Editorial Stance", desc: "Magazine-inspired pose motion for premium fashion visuals.", cat: "Editorial", img: g4a },
] as const;

const FORMATS = ["9:16 Reels/TikTok", "1:1 Square", "4:5 Instagram", "16:9 Landscape"];
const DURATIONS = ["8 seconds", "12 seconds", "15 seconds"];
const MOTIONS = ["Subtle", "Smooth", "Cinematic", "Dynamic"];
const BACKGROUNDS = ["Keep original", "Studio clean", "Editorial glow", "Soft gradient"];

const CAT_COLORS: Record<string, string> = {
  Product: "bg-sky-500/20 text-sky-200 border-sky-400/30",
  Social: "bg-pink-500/20 text-pink-200 border-pink-400/30",
  Lifestyle: "bg-amber-500/20 text-amber-200 border-amber-400/30",
  Editorial: "bg-purple-500/20 text-purple-200 border-purple-400/30",
};

function VideoStudio() {
  const [uploaded, setUploaded] = useState(false);
  const [template, setTemplate] = useState<string | null>(null);
  const [format, setFormat] = useState(FORMATS[0]);
  const [duration, setDuration] = useState(DURATIONS[0]);
  const [motion, setMotion] = useState(MOTIONS[1]);
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const canGenerate = uploaded && template && status !== "loading";
  const selectedTemplate = useMemo(() => TEMPLATES.find((t) => t.id === template), [template]);

  function onGenerate() {
    if (!canGenerate) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1600);
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div className="mt-4">
        <ShopperPageHeader
          eyebrow="AI VIDEO STUDIO"
          title="Showcase Video"
          subtitle="Upload an outfit image or try-on result, choose a video template, and create a short fashion video in seconds."
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {["8-second video", "9:16 / 16:9 ready", "10 credits per video", "No watermark on Pro"].map((c) => (
          <span key={c} className="rounded-full bg-white/[0.05] border border-white/10 px-3 py-1.5 text-[12px] text-white/75">{c}</span>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        {/* LEFT — Upload + Settings */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            <div className="font-display text-[20px] text-white">Upload Your Outfit</div>
            <p className="mt-1 text-[13px] text-white/55">Use a try-on result, product photo, or outfit image to create a short fashion video.</p>

            {!uploaded ? (
              <button
                onClick={() => setUploaded(true)}
                className="mt-4 group w-full rounded-xl border-2 border-dashed border-white/15 hover:border-purple-400/60 bg-white/[0.02] hover:bg-purple-500/[0.06] transition p-6 text-center"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                  <Upload size={18} />
                </span>
                <div className="mt-3 text-[14px] font-medium text-white">Upload image or video</div>
                <div className="mt-1 text-[12px] text-white/50">JPG, PNG, WebP, MP4 up to 20MB</div>
                <div className="mt-1 text-[12px] text-white/50">Drag and drop or browse</div>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-[12.5px] font-medium text-white group-hover:bg-purple-500/20 group-hover:border-purple-400/40 transition">
                  Choose File
                </span>
              </button>
            ) : (
              <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/[0.06] p-4 flex items-center gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  <img src={editorialHero} alt="uploaded" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[12px] text-emerald-300 font-medium">
                    <CheckCircle2 size={12} /> Ready for video generation
                  </div>
                  <div className="mt-0.5 text-[13.5px] text-white truncate">outfit-preview.jpg</div>
                </div>
                <button onClick={() => { setUploaded(false); setStatus("idle"); }} className="text-[12px] text-white/70 hover:text-white border border-white/15 rounded-md px-2.5 py-1">
                  Change
                </button>
              </div>
            )}

            <p className="mt-4 text-[11.5px] text-white/45 leading-relaxed">
              Your uploaded file is only used to generate your video and is deleted after your session.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5">
            <div className="font-display text-[20px] text-white">Video Settings</div>
            <div className="mt-4 space-y-4">
              <PickRow label="Format" options={FORMATS} value={format} onChange={setFormat} />
              <PickRow label="Duration" options={DURATIONS} value={duration} onChange={setDuration} />
              <PickRow label="Motion Style" options={MOTIONS} value={motion} onChange={setMotion} />
              <PickRow label="Background" options={BACKGROUNDS} value={background} onChange={setBackground} />
            </div>

            <button
              onClick={onGenerate}
              disabled={!canGenerate}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-3 text-[14px] font-medium shadow-[0_0_28px_rgba(168,85,247,0.5)] hover:scale-[1.01] transition disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100"
            >
              {status === "loading" ? (
                <><RefreshCw size={15} className="animate-spin" /> Creating your video...</>
              ) : (
                <><Sparkles size={15} /> Generate Showcase Video</>
              )}
            </button>
            {!canGenerate && status !== "loading" && (
              <div className="mt-2 text-center text-[11.5px] text-white/45">
                {!uploaded ? "Upload a file to begin" : "Select a template on the right"}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Templates */}
        <div>
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="font-display text-[22px] text-white">Choose A Video Template</div>
              <p className="mt-1 text-[13px] text-white/55">Select a short video style for your outfit showcase.</p>
            </div>
            {template && (
              <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 px-3 py-1 text-[11.5px]">
                <CheckCircle2 size={11} /> {selectedTemplate?.title}
              </span>
            )}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {TEMPLATES.map((t) => {
              const active = t.id === template;
              return (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={`group relative text-left overflow-hidden rounded-2xl border bg-white/[0.03] transition-all duration-300 hover:-translate-y-0.5 ${
                    active
                      ? "border-purple-400/70 shadow-[0_0_30px_rgba(168,85,247,0.35)]"
                      : "border-white/10 hover:border-purple-400/40 hover:shadow-[0_0_24px_rgba(168,85,247,0.18)]"
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={t.img} alt={t.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
                    <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur border border-white/15 px-2 py-0.5 text-[10.5px] font-medium text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" /> PREVIEW
                    </span>
                    <span className={`absolute top-2.5 right-2.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium ${CAT_COLORS[t.cat]}`}>{t.cat}</span>
                    <span className="absolute inset-0 grid place-items-center pointer-events-none">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur border border-white/30 group-hover:bg-purple-500/40 transition">
                        <Play size={16} className="ml-0.5 text-white fill-white" />
                      </span>
                    </span>
                    {active && (
                      <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-purple-500/90 text-white text-[10.5px] font-medium px-2 py-0.5">
                        <CheckCircle2 size={11} /> Selected
                      </span>
                    )}
                  </div>
                  <div className="p-3.5">
                    <div className="font-display text-[15px] text-white">{t.title}</div>
                    <p className="mt-1 text-[12px] text-white/55 leading-relaxed line-clamp-2">{t.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result */}
      {status === "done" && selectedTemplate && (
        <section className="mt-10 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-900/30 via-fuchsia-900/20 to-indigo-900/20 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
          <div className="flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300">
            <Sparkles size={12} /> Your Result
          </div>
          <h2 className="mt-2 font-display text-[26px] text-white">Your Showcase Video Is Ready</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/15 bg-black">
              <img src={selectedTemplate.img} alt="result" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/20 backdrop-blur border border-white/40">
                  <Play size={20} className="ml-0.5 text-white fill-white" />
                </span>
              </span>
              <span className="absolute bottom-3 left-3 rounded-md bg-black/60 backdrop-blur px-2 py-1 text-[11px] text-white border border-white/15">
                {duration.split(" ")[0]}s
              </span>
            </div>
            <div className="space-y-3">
              <Meta label="Template" value={selectedTemplate.title} />
              <Meta label="Format" value={format} />
              <Meta label="Duration" value={duration} />
              <Meta label="Motion" value={motion} />
              <Meta label="Background" value={background} />
              <Meta label="Credits used" value="10" />

              <div className="flex flex-wrap gap-2 pt-3">
                <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2.5 text-[13.5px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.45)]">
                  <Download size={14} /> Download Video
                </button>
                <button onClick={() => setStatus("idle")} className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 text-white px-4 py-2.5 text-[13.5px] font-medium hover:bg-white/15 transition">
                  <RefreshCw size={14} /> Generate Another
                </button>
                <Link to="/dashboard/shoppers/try-on" className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 text-white/85 px-4 py-2.5 text-[13.5px] font-medium hover:bg-white/10 transition">
                  <Shirt size={14} /> Try Another Outfit
                </Link>
                <Link to="/dashboard/shoppers" className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/10 text-white/85 px-4 py-2.5 text-[13.5px] font-medium hover:bg-white/10 transition">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Perfect For */}
      <section className="mt-12">
        <h2 className="font-display text-2xl text-white">Perfect For</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Instagram, title: "Instagram Reels", desc: "9:16 ready" },
            { icon: VideoIcon, title: "TikTok Videos", desc: "Trend-worthy" },
            { icon: ShoppingBag, title: "Product Pages", desc: "Motion showcase" },
            { icon: Megaphone, title: "Ads & Marketing", desc: "Campaign ready" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 hover:border-purple-400/40 hover:shadow-[0_0_24px_rgba(168,85,247,0.18)] transition">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]">
                  <Icon size={16} />
                </span>
                <div className="mt-4 font-display text-[16px] text-white">{c.title}</div>
                <p className="mt-1 text-[12.5px] text-white/55">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function PickRow({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-[11.5px] font-semibold tracking-[0.18em] uppercase text-white/55">{label}</div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={`rounded-full px-3 py-1.5 text-[12px] border transition ${
                active
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_14px_rgba(168,85,247,0.45)]"
                  : "bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-white/[0.04] border border-white/10 px-4 py-2.5">
      <span className="text-[12px] uppercase tracking-wider text-white/50">{label}</span>
      <span className="text-[13.5px] text-white font-medium text-right">{value}</span>
    </div>
  );
}
