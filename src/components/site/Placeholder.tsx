import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Reveal, RevealLines } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
};

export function Placeholder({
  eyebrow = "TryVerse",
  title,
  accent,
  description = "This page is coming soon. In the meantime, explore TryVerse below.",
  primaryCta = { label: "Try It Free", to: "/signup" },
  secondaryCta = { label: "Back To Home", to: "/" },
}: Props) {
  const lines = accent ? [title, accent] : [title];
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      <Header />
      <main className="relative pt-[120px] pb-32">
        <div
          className="pointer-events-none absolute left-1/2 top-32 -z-10 h-[600px] w-[900px] -translate-x-1/2 opacity-50"
          style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
        />
        <div className="mx-auto max-w-[820px] px-6 sm:px-10 text-center">
          <Reveal as="div" className="eyebrow justify-center">
            {eyebrow}
          </Reveal>
          <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[64px] leading-[1.05]">
            <RevealLines lines={lines} accentIndices={accent ? [1] : []} step={130} />
          </h1>
          <Reveal as="p" delay={340} className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {description}
          </Reveal>
          <Reveal delay={500} className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to={primaryCta.to} className="btn-primary !py-3.5 !px-7 !text-sm">
              {primaryCta.label} <ArrowRight size={16} />
            </Link>
            <Link to={secondaryCta.to} className="btn-secondary !py-3.5 !px-7 !text-sm">
              {secondaryCta.label}
            </Link>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
