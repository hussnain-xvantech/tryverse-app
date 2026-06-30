import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Reveal, RevealLines } from "./Reveal";

export type LegalSection = {
  title: string;
  body?: string;
  bullets?: string[];
};

type Props = {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  effectiveDate?: string;
  sections: LegalSection[];
  ctaHeading: string;
  ctaSub: string;
};

export function LegalPage({
  eyebrow,
  title,
  accent,
  subtitle,
  effectiveDate = "2026",
  sections,
  ctaHeading,
  ctaSub,
}: Props) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-white">
      <Header />
      <main className="relative pt-[120px] pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[480px] w-[820px] -translate-x-1/2 opacity-55"
          style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
        />

        <section className="mx-auto max-w-[820px] px-6 sm:px-10 text-center">
          <Reveal as="div" className="eyebrow justify-center">{eyebrow}</Reveal>
          <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[58px] leading-[1.05]">
            <RevealLines lines={[title, accent]} accentIndices={[1]} step={120} />
          </h1>
          <Reveal as="p" delay={320} className="mt-6 text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </Reveal>
          <Reveal delay={420} className="mt-5 text-[12.5px] uppercase tracking-[0.18em] text-white/45">
            Effective Date: {effectiveDate}
          </Reveal>
        </section>

        <section className="mx-auto max-w-[780px] px-6 sm:px-10 mt-14 space-y-5">
          {sections.map((s, i) => (
            <Reveal
              key={s.title}
              delay={Math.min(i * 40, 280)}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7 backdrop-blur-sm"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[15px] text-violet/85 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl sm:text-[22px]">{s.title}</h2>
              </div>
              {s.body && (
                <p className="mt-3 text-[15px] text-white/75 leading-[1.75]">{s.body}</p>
              )}
              {s.bullets && (
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[14.5px] text-white/75 leading-[1.7]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </section>

        <section className="mx-auto max-w-[780px] px-6 sm:px-10 mt-12">
          <div className="rounded-2xl border border-violet/30 bg-gradient-to-br from-violet/12 to-transparent p-7 sm:p-9 text-center">
            <h3 className="font-display text-2xl">{ctaHeading}</h3>
            <p className="mt-2 text-white/70 text-[15px]">{ctaSub}</p>
            <Link to="/contact" className="btn-primary !py-3 !px-6 !text-sm mt-5 inline-flex">
              Contact Us <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
