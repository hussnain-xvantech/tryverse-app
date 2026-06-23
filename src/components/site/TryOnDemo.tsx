import { useEffect, useMemo, useState } from "react";
import { Sparkles, Upload, Wand2, Check, ImageIcon, Shirt } from "lucide-react";
import resultImg from "@/assets/editorial-hero.jpg";
import userImg from "@/assets/user-reference.jpg";
import garmentImg from "@/assets/garment-flatlay.jpg";

const STEPS = [
  "Analyzing garment",
  "Mapping pose & body",
  "Preserving fabric & color",
  "Final render",
];

const FEATURES = [
  { label: "Virtual Try-On", active: true },
  { label: "AI Photoshoot" },
  { label: "Ghost Mannequin" },
  { label: "Pose Studio" },
];

export function TryOnDemo() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 64), 220);
    return () => clearInterval(id);
  }, []);

  const step = useMemo(() => {
    if (tick < 12) return -1;          // idle
    if (tick < 52) return Math.min(3, Math.floor((tick - 12) / 10)); // 0..3
    return 4;                          // revealed
  }, [tick]);

  const revealed = step === 4;
  const running = step >= 0 && step < 4;
  const progressPct = revealed ? 100 : running ? ((step + 1) / 4) * 100 : 0;

  return (
    <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.15fr_1fr] items-stretch">
      {/* LEFT — bright result */}
      <div className="relative rounded-[2rem] overflow-hidden bg-[#f3eee8] min-h-[520px] lg:min-h-[720px]">
        <img
          src={resultImg}
          alt="AI try-on result on model wearing lavender blazer"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            revealed ? "scale-100 opacity-100" : "scale-[1.02] opacity-95"
          }`}
          width={1152}
          height={1440}
          loading="lazy"
        />

        {/* subtle vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.35))" }} />

        {/* scanline while generating */}
        {running && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute left-0 right-0 h-40 animate-scan"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(168,85,247,0.45), transparent)",
                filter: "blur(10px)",
              }}
            />
          </div>
        )}

        {/* top chips */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span className="chip backdrop-blur bg-black/40 text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-violet animate-glow-pulse" />
            Live demo
          </span>
          <span className="chip chip-active backdrop-blur">Virtual Try-On</span>
        </div>

        {/* bottom caption */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
          <div className="text-white">
            <div className="eyebrow !text-white/70">Result</div>
            <div className="font-display text-2xl sm:text-3xl italic leading-tight mt-1">
              Lavender Oversized Blazer
            </div>
            <div className="text-xs text-white/70 mt-1">Maison Studio · on you</div>
          </div>
          <span className="glass rounded-full px-3 py-1.5 text-[11px] text-white/90 whitespace-nowrap">
            {revealed ? "Generated in 0.8s" : running ? "Generating…" : "Ready"}
          </span>
        </div>
      </div>

      {/* RIGHT — dark studio panel */}
      <div className="surface-card p-5 sm:p-7 flex flex-col gap-5">
        {/* head */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-violet/30 to-magenta/20 border border-violet/30">
              <Wand2 size={15} className="text-white" />
            </span>
            <div>
              <div className="text-sm font-medium">TryVerse Studio</div>
              <div className="text-[11px] text-muted-foreground">try-on workflow</div>
            </div>
          </div>
          <span className="chip">v2.4</span>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-2 gap-3.5">
          <InputCard
            label="Your photo"
            icon={<Upload size={12} />}
            img={userImg}
            tone="dark"
          />
          <InputCard
            label="Garment"
            icon={<Shirt size={12} />}
            img={garmentImg}
            tone="light"
          />
        </div>

        {/* Feature pills */}
        <div>
          <div className="eyebrow mb-2">Feature</div>
          <div className="flex flex-wrap gap-1.5">
            {FEATURES.map((f) => (
              <span key={f.label} className={f.active ? "chip chip-active" : "chip"}>
                {f.label}
              </span>
            ))}
          </div>
        </div>

        {/* Prompt */}
        <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="eyebrow">Prompt</div>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <ImageIcon size={10} /> auto-suggested
            </span>
          </div>
          <p className="text-[13.5px] text-white/85 leading-relaxed">
            Place the <span className="text-white">lavender blazer</span> onto the model.
            Preserve fabric drape, color, fit, and lighting. Studio-quality output.
          </p>
        </div>

        {/* Generate */}
        <button
          type="button"
          className={`btn-primary w-full !py-3.5 ${running ? "animate-glow-pulse" : ""}`}
        >
          <Sparkles size={16} />
          {revealed ? "Regenerate" : running ? "Generating…" : "Generate try-on"}
        </button>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <div className="eyebrow">Progress</div>
            <span className="text-[11px] text-muted-foreground">
              {revealed ? "Done" : running ? `${Math.round(progressPct)}%` : "Idle"}
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-500 ease-out"
              style={{
                width: `${progressPct}%`,
                background: "var(--gradient-brand)",
              }}
            />
          </div>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {STEPS.map((s, i) => {
              const done = step > i || revealed;
              const active = step === i && !revealed;
              return (
                <li key={s} className="flex items-center gap-2.5 text-[12.5px]">
                  <span
                    className={`grid h-4 w-4 place-items-center rounded-full border ${
                      done
                        ? "bg-gradient-to-br from-violet to-magenta border-transparent text-white"
                        : active
                        ? "border-violet/60 text-violet animate-glow-pulse"
                        : "border-white/15 text-muted-foreground"
                    }`}
                  >
                    {done ? <Check size={9} /> : <span className="h-1 w-1 rounded-full bg-current" />}
                  </span>
                  <span className={done || active ? "text-white/90" : "text-muted-foreground"}>
                    {s}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function InputCard({
  label,
  icon,
  img,
  tone,
}: {
  label: string;
  icon: React.ReactNode;
  img: string;
  tone: "dark" | "light";
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-white/10 relative aspect-[4/5] ${
        tone === "light" ? "bg-[#f6f3ee]" : "bg-black/30"
      }`}
    >
      <img
        src={img}
        alt={label}
        loading="lazy"
        width={1024}
        height={1280}
        className="h-full w-full object-cover"
      />
      <div className="absolute top-2.5 left-2.5">
        <span className="chip backdrop-blur bg-black/45 text-white !py-1">
          {icon} {label}
        </span>
      </div>
    </div>
  );
}
