import { useEffect, useMemo, useState } from "react";
import { Sparkles, Upload, Wand2, Check } from "lucide-react";
import heroResult from "@/assets/hero-result.jpg";
import userPhoto from "@/assets/user-photo.jpg";
import blazer from "@/assets/clothing-blazer.jpg";

const STEPS = [
  "Reading garment",
  "Matching pose",
  "Preserving fabric details",
  "Result ready",
];

const PILLS = ["Virtual Try-On", "AI Photoshoot", "Ghost Mannequin", "Pose Studio"];

export function TryOnDemo() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 60), 250);
    return () => clearInterval(id);
  }, []);

  // cycle: 0-15 idle, 16-47 progress 4 steps, 48-59 reveal result
  const step = useMemo(() => {
    if (tick < 16) return -1;
    if (tick < 48) return Math.min(3, Math.floor((tick - 16) / 8));
    return 4;
  }, [tick]);

  const revealed = step === 4;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] items-stretch">
      {/* Left: result preview */}
      <div className="surface-card relative overflow-hidden p-3 sm:p-4 min-h-[440px] sm:min-h-[560px]">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "var(--gradient-glow)" }} />
        <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-black/30">
          <img
            src={heroResult}
            alt="AI virtual try-on result"
            className={`h-full w-full object-cover transition-all duration-700 ${
              revealed ? "opacity-100 scale-100" : "opacity-90 scale-[1.02]"
            }`}
            loading="lazy"
            width={896}
            height={1152}
          />
          {/* before overlay (greyscale) that fades out as we approach result */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              revealed ? "opacity-0" : "opacity-100"
            }`}
            style={{
              backdropFilter: "grayscale(0.6) brightness(0.85)",
              WebkitBackdropFilter: "grayscale(0.6) brightness(0.85)",
            }}
          />
          {/* shimmer scan line during processing */}
          {step >= 0 && step < 4 && (
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
              <div
                className="absolute left-0 right-0 h-24 -translate-y-1/2"
                style={{
                  top: `${20 + step * 20}%`,
                  background:
                    "linear-gradient(180deg, transparent, rgba(168,85,247,0.35), transparent)",
                  filter: "blur(8px)",
                  transition: "top 700ms ease",
                }}
              />
            </div>
          )}

          <div className="absolute top-3 left-3 flex gap-2">
            <span className="chip backdrop-blur bg-black/40">
              {revealed ? "After" : "Before"}
            </span>
            <span className="chip chip-active backdrop-blur">Try-On</span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between glass rounded-xl px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
              {revealed ? "Generation complete" : "Generating result…"}
            </div>
            <span className="text-[11px] text-muted-foreground">tryverse.ai</span>
          </div>
        </div>
      </div>

      {/* Right: process panel */}
      <div className="surface-card p-4 sm:p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 border border-white/10">
              <Wand2 size={14} className="text-violet" />
            </span>
            <span className="text-sm font-medium">Studio</span>
          </div>
          <span className="chip">Live preview</span>
        </div>

        {/* inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 overflow-hidden bg-black/30 aspect-[4/5] relative">
            <img src={userPhoto} alt="Your photo" loading="lazy" width={640} height={800}
              className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                <Upload size={11} /> Your photo
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 overflow-hidden bg-white aspect-[4/5] relative">
            <img src={blazer} alt="Garment" loading="lazy" width={640} height={800}
              className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center gap-1.5 text-[11px] text-white">
                <Sparkles size={11} /> Lavender blazer
              </div>
            </div>
          </div>
        </div>

        {/* pills */}
        <div className="flex flex-wrap gap-1.5">
          {PILLS.map((p, i) => (
            <span key={p} className={i === 0 ? "chip chip-active" : "chip"}>
              {p}
            </span>
          ))}
        </div>

        {/* prompt */}
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">Prompt</div>
          <p className="text-sm text-white/85 leading-relaxed">
            Create a realistic try-on result while preserving fabric color, fit, texture, and clothing details.
          </p>
        </div>

        {/* generate */}
        <button
          type="button"
          className={`btn-primary w-full !py-3 ${step >= 0 && step < 4 ? "animate-glow-pulse" : ""}`}
        >
          <Sparkles size={16} />
          {revealed ? "Regenerate" : step >= 0 ? "Generating…" : "Generate"}
        </button>

        {/* progress */}
        <ul className="space-y-2">
          {STEPS.map((s, i) => {
            const done = step > i || revealed;
            const active = step === i && !revealed;
            return (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full border ${
                    done
                      ? "bg-gradient-to-br from-violet to-magenta border-transparent text-white"
                      : active
                      ? "border-violet/60 text-violet animate-glow-pulse"
                      : "border-white/15 text-muted-foreground"
                  }`}
                >
                  {done ? <Check size={12} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                </span>
                <span className={done || active ? "text-white" : "text-muted-foreground"}>{s}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
