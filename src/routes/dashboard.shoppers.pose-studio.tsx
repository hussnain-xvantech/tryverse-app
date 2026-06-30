import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Upload, CheckCircle2, Sparkles, Loader2, Download, RefreshCw, Check } from "lucide-react";
import { DEMO_USER_PHOTO } from "@/lib/shopper-store";
import g1a from "@/assets/g1-after.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g6a from "@/assets/g6-after.jpg";
import editorialHero from "@/assets/editorial-hero.jpg";

export const Route = createFileRoute("/dashboard/shoppers/pose-studio")({
  component: PoseStudio,
});

type Pose = { id: string; title: string; desc: string; img: string };
type Category = { id: string; label: string; poses: Pose[] };

const POSE_IMGS = [g1a, g2a, g3a, g4a, g5a, g6a, editorialHero];
const pick = (i: number) => POSE_IMGS[i % POSE_IMGS.length];

const CATEGORIES: Category[] = [
  { id: "catalog", label: "Catalog & E-Commerce", poses: [
    { id: "white-studio", title: "White Studio", desc: "Clean front-facing catalog shot", img: pick(0) },
    { id: "warm-beige", title: "Warm Beige Studio", desc: "Soft tonal catalog backdrop", img: pick(1) },
    { id: "grey-backdrop", title: "Grey Backdrop", desc: "Neutral product-focused pose", img: pick(2) },
    { id: "pastel-studio", title: "Pastel Studio", desc: "Light pastel ecommerce look", img: pick(3) },
  ]},
  { id: "professional", label: "Professional", poses: [
    { id: "exec-walk", title: "Executive Walk", desc: "Confident forward stride", img: pick(4) },
    { id: "modern-office", title: "Modern Office", desc: "Editorial office backdrop", img: pick(5) },
    { id: "business-portrait", title: "Business Portrait", desc: "Polished waist-up pose", img: pick(6) },
    { id: "confident-standing", title: "Confident Standing", desc: "Sharp full-body stance", img: pick(0) },
  ]},
  { id: "casual", label: "Casual & Relaxed", poses: [
    { id: "casual-lean", title: "Casual Lean", desc: "Easy weight-shift pose", img: pick(2) },
    { id: "natural-walk", title: "Natural Walk", desc: "Relaxed mid-stride", img: pick(3) },
    { id: "street-stroll", title: "Street Stroll", desc: "Soft daylight street pose", img: pick(4) },
    { id: "relaxed-seated", title: "Relaxed Seated", desc: "Composed seated pose", img: pick(1) },
  ]},
  { id: "editorial", label: "Editorial & High Fashion", poses: [
    { id: "window-gaze", title: "Window Gaze", desc: "Side-light editorial framing", img: pick(5) },
    { id: "dramatic-profile", title: "Dramatic Profile", desc: "High-contrast profile shot", img: pick(6) },
    { id: "model-turn", title: "Model Turn", desc: "Subtle runway turn", img: pick(0) },
    { id: "over-shoulder", title: "Over The Shoulder", desc: "Refined back-glance pose", img: pick(2) },
  ]},
  { id: "lifestyle", label: "Lifestyle", poses: [
    { id: "coffee-shop", title: "Coffee Shop", desc: "Soft cafe lifestyle frame", img: pick(3) },
    { id: "garden-portrait", title: "Garden Portrait", desc: "Outdoor natural light", img: pick(4) },
    { id: "urban-bg", title: "Urban Background", desc: "Architectural city pose", img: pick(5) },
    { id: "staircase", title: "Staircase Pose", desc: "Elevated framing", img: pick(6) },
  ]},
  { id: "events", label: "Events & Celebrations", poses: [
    { id: "evening-pose", title: "Evening Pose", desc: "Elegant event stance", img: pick(0) },
    { id: "gala-stand", title: "Gala Stand", desc: "Formal full-body pose", img: pick(1) },
    { id: "candid-laugh", title: "Candid Moment", desc: "Soft natural smile", img: pick(2) },
    { id: "spotlight", title: "Spotlight", desc: "Centered event portrait", img: pick(3) },
  ]},
  { id: "resort", label: "Resort & Luxury", poses: [
    { id: "resort-stand", title: "Resort Stand", desc: "Soft luxury daylight", img: pick(4) },
    { id: "terrace-pose", title: "Terrace Pose", desc: "Refined terrace framing", img: pick(5) },
    { id: "garden-luxe", title: "Garden Luxe", desc: "Lush garden backdrop", img: pick(6) },
    { id: "soft-glow", title: "Soft Glow", desc: "Warm golden-hour pose", img: pick(0) },
  ]},
  { id: "athletic", label: "Athletic & Fitness", poses: [
    { id: "active-stance", title: "Active Stance", desc: "Composed athletic pose", img: pick(1) },
    { id: "studio-stretch", title: "Studio Stretch", desc: "Controlled mobility frame", img: pick(2) },
    { id: "training-stand", title: "Training Stand", desc: "Strong upright pose", img: pick(3) },
    { id: "balance-pose", title: "Balance Pose", desc: "Graceful balance hold", img: pick(4) },
  ]},
  { id: "dynamic", label: "Dynamic & Action", poses: [
    { id: "spin-pose", title: "Spin Pose", desc: "Subtle motion blur look", img: pick(5) },
    { id: "step-forward", title: "Step Forward", desc: "Confident forward step", img: pick(6) },
    { id: "wind-frame", title: "Wind Frame", desc: "Flowing fabric movement", img: pick(0) },
    { id: "energy-pose", title: "Energy Pose", desc: "Dynamic full-body energy", img: pick(1) },
  ]},
];

function PoseStudio() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [cat, setCat] = useState<string>(CATEGORIES[0].id);
  const [pose, setPose] = useState<Pose | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const category = CATEGORIES.find((c) => c.id === cat)!;

  function generate() {
    if (!photo || !pose) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1600);
  }

  function reset() {
    setPose(null); setStatus("idle");
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Home
      </Link>
      <div className="mt-5">
        <div className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">Pose Studio</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl text-white">AI Pose Studio</h1>
        <p className="mt-2 text-[15px] text-white/60">Upload one photo, choose your pose, and get professional fashion shots.</p>
      </div>

      {/* Upload */}
      <section className="mt-8">
        {!photo ? (
          <button onClick={() => setPhoto(DEMO_USER_PHOTO)} className="w-full relative overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.03] backdrop-blur-xl hover:border-purple-400/50 hover:bg-purple-500/5 transition p-10 text-center">
            <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="relative">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 border border-purple-400/30 text-purple-200">
                <Upload size={20} />
              </span>
              <h2 className="mt-4 font-display text-2xl text-white">Upload your photo</h2>
              <p className="mt-1.5 text-[14px] text-white/55">Click to browse or drag and drop.</p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 h-11 text-[14px] font-semibold shadow-[0_0_24px_rgba(168,85,247,0.4)]">
                <Upload size={15} /> Choose Photo
              </span>
            </div>
          </button>
        ) : (
          <div className="flex items-center gap-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.08] backdrop-blur p-4">
            <img src={photo} alt="Your photo" className="h-16 w-16 rounded-xl object-cover border border-white/10" />
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-300"><CheckCircle2 size={14} /> Photo uploaded</div>
              <div className="text-[13px] text-white/65 mt-0.5">Now choose a pose category below.</div>
            </div>
            <button onClick={() => { setPhoto(null); reset(); }} className="text-[12.5px] text-white/70 hover:text-white border border-white/15 rounded-full px-3 h-8">Change</button>
          </div>
        )}
      </section>

      {/* Categories */}
      {photo && (
        <section className="mt-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`shrink-0 rounded-full px-4 h-9 text-[12.5px] font-medium border transition ${
                  cat === c.id
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.4)]"
                    : "bg-white/[0.04] text-white/65 border-white/10 hover:text-white hover:border-white/25"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {category.poses.map((p) => {
              const selected = pose?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPose(p)}
                  className={`group relative overflow-hidden rounded-2xl border text-left transition ${
                    selected
                      ? "border-purple-400/70 shadow-[0_0_24px_rgba(168,85,247,0.35)]"
                      : "border-white/10 hover:border-purple-400/40 hover:shadow-[0_0_18px_rgba(168,85,247,0.2)]"
                  } bg-white/[0.03]`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    {selected && (
                      <span className="absolute top-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-[0_0_14px_rgba(168,85,247,0.5)]">
                        <Check size={14} />
                      </span>
                    )}
                    <div className="absolute left-3 right-3 bottom-3">
                      <div className="font-display text-[16px] text-white">{p.title}</div>
                      <div className="text-[12px] text-white/70 mt-0.5">{p.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Generate */}
      {photo && pose && status === "idle" && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex items-center gap-4 flex-1">
            <img src={photo} alt="You" className="h-16 w-16 rounded-xl object-cover border border-white/10" />
            <span className="text-white/40">+</span>
            <img src={pose.img} alt={pose.title} className="h-16 w-16 rounded-xl object-cover border border-purple-400/40" />
            <div className="text-[13.5px] text-white/70">Pose: <span className="text-white font-medium">{pose.title}</span></div>
          </div>
          <button onClick={generate} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-6 h-11 text-[14px] font-semibold shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:scale-[1.02] transition">
            <Sparkles size={15} /> Generate Pose
          </button>
        </section>
      )}

      {/* Loading */}
      {status === "loading" && (
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 text-center">
          <Loader2 size={32} className="mx-auto text-purple-300 animate-spin" />
          <div className="mt-4 font-display text-2xl text-white">Generating your pose…</div>
          <p className="mt-2 text-[14px] text-white/55">Stylo is rendering your shot. Hang tight.</p>
        </section>
      )}

      {/* Result */}
      {status === "done" && photo && pose && (
        <section className="mt-8">
          <h2 className="font-display text-2xl text-white">Your Pose Result</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <ResultCard label="Original photo" src={photo} />
            <ResultCard label={`Pose: ${pose.title}`} src={pose.img} />
            <ResultCard label="Generated result" src={pose.img} highlight />
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 h-10 text-[13px] font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:scale-[1.02] transition">
              <Download size={14} /> Download Result
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 text-white px-4 h-10 text-[13px] font-semibold hover:bg-white/[0.1] transition">
              <RefreshCw size={14} /> Generate Another Pose
            </button>
            <Link to="/dashboard/shoppers/try-on" className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 text-white px-4 h-10 text-[13px] font-semibold hover:bg-white/[0.1] transition">
              Try Outfit On
            </Link>
            <Link to="/dashboard/shoppers" className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 text-white px-4 h-10 text-[13px] font-semibold hover:bg-white/[0.1] transition">
              Back to Dashboard
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function ResultCard({ label, src, highlight }: { label: string; src: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl overflow-hidden border ${highlight ? "border-purple-400/60 shadow-[0_0_24px_rgba(168,85,247,0.35)]" : "border-white/10"} bg-white/[0.03]`}>
      <img src={src} alt={label} className="w-full aspect-[3/4] object-cover" />
      <div className="px-3 py-2 text-[12.5px] text-white/70 bg-black/30 border-t border-white/5">{label}</div>
    </div>
  );
}
