import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from "react";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
};

/**
 * Subtle premium scroll-reveal wrapper.
 * Fades + lifts content into view once it enters the viewport.
 * Honors prefers-reduced-motion via the global CSS rule.
 */
export function Reveal({ as, children, className = "", delay = 0, style }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-visible={visible ? "true" : "false"}
      className={`reveal ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

type RevealLinesProps = {
  lines: string[];
  className?: string;
  accentIndices?: number[];
  startDelay?: number;
  step?: number;
};

/**
 * Reveals a heading line by line with a soft purple shimmer on accent lines.
 */
export function RevealLines({
  lines,
  className = "",
  accentIndices = [],
  startDelay = 0,
  step = 110,
}: RevealLinesProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`reveal-lines ${className}`} data-visible={visible ? "true" : "false"}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={`reveal-line ${accentIndices.includes(i) ? "reveal-accent" : ""}`}
          style={{ transitionDelay: `${startDelay + i * step}ms` }}
        >
          <span className="reveal-line-inner">{line}</span>
        </span>
      ))}
    </span>
  );
}
