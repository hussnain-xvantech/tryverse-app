import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Play, Sparkles, ArrowRight } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

import editorialHero from "@/assets/editorial-hero.jpg";
import garmentFlat from "@/assets/garment-flatlay.jpg";
import clothingBlazer from "@/assets/clothing-blazer.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import blazerBefore from "@/assets/blazer-before.jpg";
import ctaResult from "@/assets/cta-result.jpg";
import heroResult from "@/assets/hero-result.jpg";
import footerVisual from "@/assets/footer-visual.jpg";
import g1a from "@/assets/g1-after.jpg";
import g1b from "@/assets/g1-before.jpg";
import g2a from "@/assets/g2-after.jpg";
import g2b from "@/assets/g2-before.jpg";
import g2c from "@/assets/g2-catalog.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g6a from "@/assets/g6-after.jpg";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — TryVerse AI Clothing Gallery" },
      {
        name: "description",
        content:
          "Explore TryVerse: virtual try-on results, AI clothing photoshoots, ghost mannequin shots, pose variations, and short fashion videos.",
      },
      { property: "og:title", content: "Discover — TryVerse AI Clothing Gallery" },
      {
        property: "og:description",
        content:
          "A curated gallery of AI try-on and clothing visuals created with TryVerse.",
      },
      { property: "og:image", content: editorialHero },
    ],
  }),
  component: DiscoverPage,
});

type Category =
  | "Try-On"
  | "Photoshoot"
  | "Ghost Mannequin"
  | "Pose Studio"
  | "Videos"
  | "Catalog";

type Item = {
  src: string;
  category: Category;
  span?: "tall" | "wide" | "normal";
  isVideo?: boolean;
  duration?: string;
};

const FILTERS: Array<"All" | Category> = [
  "All",
  "Try-On",
  "Photoshoot",
  "Ghost Mannequin",
  "Pose Studio",
  "Videos",
];

const FEATURED: Item[] = [
  { src: g1a, category: "Try-On", span: "tall" },
  { src: editorialHero, category: "Photoshoot" },
  { src: g2c, category: "Catalog" },
  { src: blazerAfter, category: "Photoshoot", span: "tall" },
  { src: g3a, category: "Pose Studio" },
  { src: garmentFlat, category: "Ghost Mannequin" },
  { src: g4a, category: "Try-On", span: "tall" },
  { src: heroResult, category: "Photoshoot" },
  { src: footerVisual, category: "Videos", isVideo: true, duration: "0:12" },
  { src: g5a, category: "Pose Studio", span: "tall" },
  { src: clothingBlazer, category: "Ghost Mannequin" },
  { src: g6a, category: "Try-On" },
  { src: g2a, category: "Photoshoot", span: "tall" },
  { src: blazerBefore, category: "Ghost Mannequin" },
  { src: ctaResult, category: "Videos", isVideo: true, duration: "0:08" },
  { src: g1b, category: "Catalog" },
  { src: g2b, category: "Catalog" },
  { src: editorialHero, category: "Videos", isVideo: true, duration: "0:15" },
];

function DiscoverPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Header />
      <main className="pt-24 sm:pt-28 overflow-x-hidden">
        <Hero />
        <GalleryWithFilters />
        <CuratedRow
          eyebrow="Section A"
          title="Virtual Try-On"
          sub="See how clothing looks on real shopper photos before checkout."
          images={[g1a, g4a, g6a, g3a, g5a, g2a]}
          label="Virtual Try-On"
        />
        <CuratedRow
          eyebrow="Section B"
          title="AI Photoshoot"
          sub="Turn clothing product photos into clean model visuals for ecommerce and campaigns."
          images={[editorialHero, blazerAfter, heroResult, g2a, g5a, g4a]}
          label="AI Photoshoot"
        />
        <CuratedRow
          eyebrow="Section C"
          title="Ghost Mannequin"
          sub="Create clean apparel product shots without models or studio setup."
          images={[garmentFlat, clothingBlazer, blazerBefore, g1b, g2b]}
          label="Ghost Mannequin"
        />
        <CuratedRow
          eyebrow="Section D"
          title="Pose & Video"
          sub="Generate pose variations and short showcase videos for social, ads, and product pages."
          images={[g3a, g5a, g4a, footerVisual, ctaResult]}
          label="Pose Studio"
          videoIndices={[3, 4]}
        />
        <VideoShowcase />
        <FinalCTA />
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const mosaic = [
    g1a, editorialHero, blazerAfter, g4a,
    g3a, g2c, g5a, garmentFlat,
    g6a, heroResult, clothingBlazer, g2a,
  ];
  return (
    <section className="relative px-6 sm:px-10 pt-6 pb-16 sm:pb-20">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="mx-auto max-w-[1280px] grid lg:grid-cols-[1.05fr_1fr] items-center gap-12 lg:gap-16">
        <div>
          <Reveal>
            <div className="eyebrow">Discover</div>
          </Reveal>
          <h1 className="mt-4 font-display text-[44px] sm:text-[56px] lg:text-[68px] leading-[1.02]">
            <RevealLines
              lines={["Explore What", "TryVerse Can Create"]}
              accentIndices={[1]}
            />
          </h1>
          <Reveal delay={220}>
            <p className="mt-6 text-[17px] leading-relaxed text-white/70 max-w-xl">
              Browse AI try-on results, clothing photoshoots, ghost mannequin
              visuals, pose variations, and short fashion videos created for
              shoppers and clothing brands.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/signup" className="btn-primary">
                Try It Free <ArrowRight size={16} />
              </Link>
              <Link to="/for-brands" className="btn-secondary">
                For Brands
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Mosaic */}
        <Reveal delay={150}>
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-[2rem] -z-10 opacity-70"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="grid grid-cols-3 gap-3">
              {mosaic.map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl border border-white/10 ${
                    i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-[4/5]"
                  }`}
                  style={{
                    animation: `float-y ${6 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FEATURED GRID + FILTERS ---------------- */
function GalleryWithFilters() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All");
  const items = useMemo(
    () => (active === "All" ? FEATURED : FEATURED.filter((i) => i.category === active)),
    [active],
  );

  return (
    <section className="px-6 sm:px-10 py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <div className="eyebrow">Featured Gallery</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              A glimpse of what's possible
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`chip cursor-pointer text-[13px] transition ${
                  active === f ? "chip-active" : "hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
          {items.map((item, i) => (
            <GalleryCard key={`${item.src}-${i}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, index }: { item: Item; index: number }) {
  const heightClass =
    item.span === "tall"
      ? "aspect-[3/4]"
      : item.span === "wide"
        ? "aspect-[4/3]"
        : index % 3 === 0
          ? "aspect-[4/5]"
          : "aspect-[3/4]";
  return (
    <div className="mb-4 break-inside-avoid">
      <div
        className={`group relative overflow-hidden rounded-2xl border border-white/10 ${heightClass}`}
      >
        <img
          src={item.src}
          alt={item.category}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute left-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="chip text-[11px] bg-black/60 border-white/15 text-white">
            {item.category}
          </span>
        </div>
        {item.isVideo && (
          <>
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/30">
                <Play size={18} className="text-white translate-x-[1px]" />
              </div>
            </div>
            {item.duration && (
              <div className="absolute right-3 top-3 rounded-md bg-black/65 border border-white/10 px-2 py-0.5 text-[11px] text-white">
                {item.duration}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- CURATED ROWS ---------------- */
function CuratedRow({
  eyebrow,
  title,
  sub,
  images,
  label,
  videoIndices,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  images: string[];
  label: Category;
  videoIndices?: number[];
}) {
  return (
    <section className="px-6 sm:px-10 py-14">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
            <div>
              <div className="eyebrow">{eyebrow}</div>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl">{title}</h3>
              <p className="mt-2 text-white/65 text-[15px] max-w-2xl">{sub}</p>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {images.map((src, i) => {
            const isVideo = videoIndices?.includes(i);
            return (
              <div
                key={`${src}-${i}`}
                className="group relative overflow-hidden rounded-xl border border-white/10 aspect-[3/4]"
              >
                <img
                  src={src}
                  alt={label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute left-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="chip text-[11px] bg-black/60 border-white/15 text-white">
                    {label}
                  </span>
                </div>
                {isVideo && (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/30">
                      <Play size={16} className="text-white translate-x-[1px]" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- VIDEO SHOWCASE ---------------- */
function VideoShowcase() {
  const videos = [
    { src: footerVisual, duration: "0:08" },
    { src: ctaResult, duration: "0:12" },
    { src: editorialHero, duration: "0:15" },
    { src: heroResult, duration: "0:10" },
  ];
  return (
    <section className="px-6 sm:px-10 py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="max-w-2xl">
            <div className="eyebrow">Video Showcase</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">
              Short Fashion Videos
            </h2>
            <p className="mt-3 text-white/65 text-[15px]">
              Preview clothing showcase videos for Reels, TikTok, ads, and
              product pages.
            </p>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((v, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 aspect-[9/14]"
            >
              <img
                src={v.src}
                alt="Showcase video"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/30 transition-transform group-hover:scale-110">
                  <Play size={20} className="text-white translate-x-[1px]" />
                </div>
              </div>
              <div className="absolute left-3 bottom-3 chip text-[11px] bg-black/60 border-white/15 text-white">
                Showcase Video
              </div>
              <div className="absolute right-3 top-3 rounded-md bg-black/65 border border-white/10 px-2 py-0.5 text-[11px] text-white">
                {v.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="px-6 sm:px-10 py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px] relative">
        <div
          className="pointer-events-none absolute -inset-10 -z-10 opacity-90"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="relative surface-card overflow-hidden p-10 sm:p-16 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="relative">
            <div className="eyebrow inline-flex items-center gap-2 justify-center">
              <Sparkles size={12} /> Ready To Create?
            </div>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Try It With Your <span className="text-gradient">Own Outfit</span>
            </h2>
            <p className="mt-5 text-white/70 text-[16px] sm:text-[17px] max-w-2xl mx-auto">
              Upload a photo, paste a clothing product link, or create AI
              visuals for your fashion brand.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/signup" className="btn-primary !px-7 !py-3.5 !text-[15px]">
                Try It Free <ArrowRight size={16} />
              </Link>
              <Link to="/for-brands" className="btn-secondary !px-7 !py-3.5 !text-[15px]">
                Explore For Brands
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
