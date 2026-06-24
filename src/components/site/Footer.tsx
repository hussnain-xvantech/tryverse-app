import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import footerVisual from "@/assets/footer-visual.jpg";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Product",
    links: [
      "Virtual Try-On",
      "AI Photoshoot",
      "Ghost Mannequin",
      "Pose Studio",
      "Video Studio",
      "Stylo AI Stylist",
    ],
  },
  {
    title: "For Shoppers",
    links: ["AI Fashion Store", "Try Outfits", "AI Stylist", "Showcase Video"],
  },
  {
    title: "For Brands",
    links: [
      "Brand Studio",
      "Fabric Studio",
      "Widget",
      "Stores",
      "Analytics",
      "Book Demo",
    ],
  },
  {
    title: "Company",
    links: ["Pricing", "Contact", "Privacy Policy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24">
      {/* Glowing TryVerse Studio interface */}
      <div className="relative overflow-hidden">
        {/* edge glow on top-left corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 left-[6%] sm:left-[10%] h-[280px] w-[60%] rounded-[3rem] animate-corner-sweep"
          style={{
            background:
              "radial-gradient(60% 100% at 10% 0%, rgba(94,141,255,0.65), rgba(168,85,247,0.35) 45%, transparent 75%)",
          }}
        />
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 pt-16 sm:pt-24">
          <div className="relative rounded-t-[2rem] overflow-hidden">
            {/* top-left neon stroke */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 h-px w-[55%]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(94,141,255,0.95), rgba(168,85,247,0.7) 50%, transparent)",
                boxShadow: "0 0 18px rgba(94,141,255,0.7)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 w-px h-[55%]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(94,141,255,0.95), rgba(168,85,247,0.6) 50%, transparent)",
                boxShadow: "0 0 18px rgba(94,141,255,0.7)",
              }}
            />
            <img
              src={footerVisual}
              alt="TryVerse Studio interface"
              className="block w-full h-auto"
              loading="lazy"
              width={1920}
              height={896}
            />
            {/* fade to black */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/3"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(8,7,13,0.85) 70%, rgba(8,7,13,1) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
              <div className="max-w-2xl">
                <div className="eyebrow">TryVerse Studio</div>
                <h3 className="font-display mt-3 text-3xl sm:text-5xl leading-[1.02] text-white">
                  Try It Before You Buy It.
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/65 max-w-md leading-relaxed">
                  The AI fashion platform built only for clothing — for shoppers
                  who want to see it on, and brands who want to sell more of it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="bg-background/80 border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 py-16 sm:py-20">
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
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[13.5px] text-white/55 hover:text-violet transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
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
