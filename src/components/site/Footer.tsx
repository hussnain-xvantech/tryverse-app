import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import footerVisual from "@/assets/footer-visual.jpg";

type FooterLink = { label: string; to: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Virtual Try-On", to: "/features/virtual-try-on" },
      { label: "AI Photoshoot", to: "/features/ai-photoshoot" },
      { label: "Ghost Mannequin", to: "/features/ghost-mannequin" },
      { label: "Pose Studio", to: "/features/pose-studio" },
      { label: "Video Studio", to: "/features/video-studio" },
      { label: "Stylo AI Stylist", to: "/features/stylo-ai-stylist" },
    ],
  },
  {
    title: "For Shoppers",
    links: [
      { label: "AI Fashion Store", to: "/for-shoppers" },
      { label: "Try Outfits", to: "/for-shoppers" },
      { label: "AI Stylist", to: "/features/stylo-ai-stylist" },
      { label: "Showcase Video", to: "/features/video-studio" },
    ],
  },
  {
    title: "For Brands",
    links: [
      { label: "Brand Studio", to: "/for-brands" },
      { label: "Fabric Studio", to: "/features/fabric-studio" },
      { label: "Widget", to: "/features/brand-widget" },
      { label: "Stores", to: "/stores" },
      { label: "Analytics", to: "/features/analytics" },
      { label: "Book Demo", to: "/book-demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", to: "/pricing" },
      { label: "Contact", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];

export function Footer({ variant = "full" }: { variant?: "full" | "minimal" } = {}) {
  return (
    <footer className="relative mt-24">
      {variant === "full" && (
      <div className="relative">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 pt-16 sm:pt-24">
          <div className="relative">
            {/* soft static purple glow behind the panel */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -top-10 h-[60%] -z-0"
              style={{
                background:
                  "radial-gradient(60% 70% at 50% 0%, rgba(217,70,239,0.28), rgba(168,85,247,0.18) 45%, transparent 78%)",
              }}
            />

            <div className="relative rounded-t-[2rem] overflow-hidden">
              {/* corner strokes — purple */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 h-px w-[55%]"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(217,70,239,0.95), rgba(168,85,247,0.7) 50%, transparent)",
                  boxShadow: "0 0 14px rgba(168,85,247,0.55)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 w-px h-[45%]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(217,70,239,0.95), rgba(168,85,247,0.6) 50%, transparent)",
                  boxShadow: "0 0 14px rgba(168,85,247,0.55)",
                }}
              />

              {/* running scan line along the top edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] overflow-hidden"
              >
                <div
                  className="h-full w-[28%] animate-runline rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(217,70,239,0.95), rgba(168,85,247,0.9), transparent)",
                    boxShadow:
                      "0 0 10px rgba(217,70,239,0.7), 0 0 18px rgba(168,85,247,0.4)",
                  }}
                />
              </div>

              <img
                src={footerVisual}
                alt="TryVerse Studio interface"
                className="block w-full h-auto"
                loading="lazy"
                decoding="async"
                width={1920}
                height={896}
              />

              {/* fade image bottom into page background */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[85%]"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, var(--color-background) 78%, var(--color-background) 100%)",
                }}
              />

              {/* small premium URL label */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex justify-center">
                <span className="font-display text-[15px] sm:text-base tracking-wide text-white/85">
                  tryverse.app
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Link columns — no gap, merges with glowing interface */}
      <div className="-mt-px">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 pt-10 sm:pt-12 pb-14 sm:pb-16">
          <div className="grid gap-12 lg:gap-16 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
            <div className="md:col-span-1">
              <Logo />
              <p className="mt-5 text-sm text-white/60 max-w-xs leading-relaxed">
                Try it before you buy it.
              </p>
            </div>

            {COLUMNS.map((col) => (
              <div key={col.title} className="min-w-0">
                <h4 className="text-[13px] font-semibold text-white mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="text-[13.5px] text-white/55 hover:text-violet transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <p className="text-xs text-white/45">
              © 2026 TryVerse. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              {[Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-violet/50 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
