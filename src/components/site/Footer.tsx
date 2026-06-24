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
      {/* Glowing TryVerse Studio interface merged into footer */}
      <div className="relative overflow-hidden">
        {/* ambient purple/magenta glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-[420px] w-[85%] rounded-[3rem] animate-corner-sweep"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(217,70,239,0.55), rgba(168,85,247,0.45) 40%, rgba(109,40,255,0.25) 65%, transparent 80%)",
          }}
        />
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 pt-16 sm:pt-24">
          <div className="relative rounded-t-[2rem] overflow-hidden">
            {/* corner strokes — purple */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 h-px w-[55%]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(217,70,239,0.95), rgba(168,85,247,0.7) 50%, transparent)",
                boxShadow: "0 0 18px rgba(168,85,247,0.7)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 w-px h-[55%]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(217,70,239,0.95), rgba(168,85,247,0.6) 50%, transparent)",
                boxShadow: "0 0 18px rgba(168,85,247,0.7)",
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
                    "0 0 14px rgba(217,70,239,0.85), 0 0 28px rgba(168,85,247,0.55)",
                }}
              />
            </div>

            <img
              src={footerVisual}
              alt="TryVerse Studio interface"
              className="block w-full h-auto"
              loading="lazy"
              width={1920}
              height={896}
            />

            {/* purple tint overlay to neutralize any blue */}
            <div
              aria-hidden
              className="absolute inset-0 mix-blend-color opacity-60"
              style={{
                background:
                  "linear-gradient(180deg, rgba(168,85,247,0.35), rgba(217,70,239,0.25) 50%, transparent 100%)",
              }}
            />

            {/* fade to background so it merges with footer */}
            <div
              className="absolute inset-x-0 bottom-0 h-3/4"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(8,7,13,0.85) 55%, rgba(8,7,13,1) 100%)",
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

      {/* Link columns — no gap, merges with glowing interface */}
      <div className="bg-background/80 border-t border-white/[0.06] -mt-px">
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
