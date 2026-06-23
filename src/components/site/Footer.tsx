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
      "AI Pose Studio",
      "Stylo AI Stylist",
      "Brand Widget",
    ],
  },
  {
    title: "For Shoppers",
    links: ["Try Outfits", "Supported Stores", "AI Stylist", "How It Works"],
  },
  {
    title: "For Brands",
    links: [
      "Brand Studio",
      "Product Photoshoots",
      "Store Widget",
      "Bulk Catalog Visuals",
      "Book Demo",
    ],
  },
  {
    title: "Resources",
    links: ["Pricing", "FAQs", "Contact", "Privacy Policy", "Terms"],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24">
      {/* Top visual */}
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="relative rounded-t-[2rem] overflow-hidden border border-white/[0.06] border-b-0 bg-[#0a0810]">
          <div
            aria-hidden
            className="absolute inset-x-0 -top-40 h-[460px] pointer-events-none opacity-80"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(168,85,247,0.35), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div className="relative aspect-[21/9] sm:aspect-[21/8]">
            <img
              src={footerVisual}
              alt="TryVerse AI fashion interface"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
              loading="lazy"
              width={1920}
              height={960}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,7,13,0.15) 0%, rgba(8,7,13,0.85) 75%, rgba(8,7,13,1) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 lg:p-16">
              <div className="max-w-2xl">
                <div className="eyebrow">TryVerse · AI for clothing</div>
                <h3 className="font-display mt-4 text-3xl sm:text-5xl lg:text-6xl leading-[1.02] text-white">
                  Try It Before You Buy It.
                </h3>
                <p className="mt-4 text-sm sm:text-base text-white/70 max-w-md leading-relaxed">
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
