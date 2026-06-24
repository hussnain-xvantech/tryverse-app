import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After Try-On",
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  // intro animation: 35% -> 65% -> 50%
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const duration = 2400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // ease in/out
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      // 35 -> 65 -> 50 across t (two-phase)
      const v =
        e < 0.5
          ? 35 + (65 - 35) * (e / 0.5)
          : 65 + (50 - 65) * ((e - 0.5) / 0.5);
      setPos(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => updateFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden select-none touch-pan-y rounded-[2rem] bg-[#f3eee8] ${className}`}
      onPointerDown={(e) => {
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
    >
      {/* AFTER (base) */}
      <img
        src={after}
        alt={afterLabel}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {/* BEFORE (clipped from the left) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={beforeLabel}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
          draggable={false}
        />
      </div>

      {/* labels */}
      <span className="absolute top-4 left-4 chip backdrop-blur bg-black/45 text-white !text-[11px]">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 chip backdrop-blur bg-black/45 text-white !text-[11px]">
        {afterLabel}
      </span>

      {/* divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/85 pointer-events-none"
        style={{
          left: `${pos}%`,
          boxShadow: "0 0 18px rgba(168,85,247,0.55)",
        }}
      />

      {/* handle */}
      <button
        type="button"
        aria-label="Drag to compare"
        onPointerDown={(e) => {
          e.stopPropagation();
          setDragging(true);
        }}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center h-11 w-11 rounded-full bg-white text-black shadow-[0_0_0_4px_rgba(168,85,247,0.25),0_8px_24px_-8px_rgba(168,85,247,0.65)] hover:shadow-[0_0_0_6px_rgba(168,85,247,0.32),0_10px_28px_-8px_rgba(168,85,247,0.8)] transition-shadow cursor-ew-resize"
        style={{ left: `${pos}%` }}
      >
        <ChevronLeft size={14} className="-mr-0.5" />
        <ChevronRight size={14} className="-ml-0.5" />
      </button>
    </div>
  );
}
