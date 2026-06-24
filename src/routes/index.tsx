import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Shirt,
  Camera,
  Ghost,
  Move3d,
  Check,
  ShoppingBag,
  Wand2,
  Link2,
  Upload,
  Store,
  BarChart3,
  Palette,
  Video,
  LayoutGrid,
  Code2,
  Layers,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TryOnDemo } from "@/components/site/TryOnDemo";
import { Reveal, RevealLines } from "@/components/site/Reveal";


import editorialHero from "@/assets/editorial-hero.jpg";
import userRef from "@/assets/user-reference.jpg";
import garmentFlat from "@/assets/garment-flatlay.jpg";
import g1a from "@/assets/g1-after.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g6a from "@/assets/g6-after.jpg";
import g1b from "@/assets/g1-before.jpg";
import g2b from "@/assets/g2-before.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TryVerse — Try Clothes On Before You Buy" },
      {
        name: "description",
        content:
          "TryVerse is the AI fashion platform built for clothing. Shoppers try outfits virtually. Brands create AI photoshoots, ghost mannequin visuals, and pose variations.",
      },
      { property: "og:title", content: "TryVerse — Try Clothes On Before You Buy" },
      {
        property: "og:description",
        content:
          "Paste a product link, upload your photo, and see the outfit on you instantly.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="pt-24 sm:pt-28">
        <Hero />
        <Workflow />
        <Features />
        <Gallery />
        <Storefront />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* =================== HERO =================== */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute left-1/2 top-[-260px] h-[900px] w-[1200px] -translate-x-1/2 rounded-full opacity-70"
          style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 pb-20 sm:pb-24">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <div className="eyebrow inline-flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-violet" />
            AI Fashion Try-On Studio
          </div>
          <h1 className="font-display mt-6 text-[44px] sm:text-[64px] lg:text-[80px] leading-[1.02]">
            <RevealLines
              lines={["Try Clothes On", "Before You Buy"]}
              accentIndices={[1]}
              step={130}
            />
          </h1>
          <Reveal as="p" delay={420} className="mx-auto mt-6 max-w-2xl text-base sm:text-[17px] text-muted-foreground leading-relaxed">
            Paste a product link, upload your photo, and instantly see how the
            outfit looks on you. For brands, TryVerse creates AI photoshoots,
            ghost mannequin visuals, videos, and store-ready content.
          </Reveal>
          <Reveal delay={560} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
              Try It Free <ArrowRight size={16} />
            </Link>
            <Link to="/for-brands" className="btn-secondary !py-3.5 !px-7 !text-sm">
              Book Brand Demo
            </Link>
          </Reveal>
        </div>

        {/* Centered carousel below the copy */}
        <div className="mt-8 sm:mt-10">
          <HeroCarousel />
        </div>
      </div>

    </section>
  );
}

/* =================== HERO CAROUSEL (curved floating arc) =================== */
const HERO_CARDS = [
  { label: "Your Photo", img: userRef, icon: <Upload size={11} /> },
  { label: "Garment", img: garmentFlat, icon: <Shirt size={11} /> },
  { label: "Try-On Result", img: editorialHero, icon: <Sparkles size={11} />, accent: true },
  { label: "AI Photoshoot", img: g1a, icon: <Camera size={11} /> },
  { label: "Ghost Mannequin", img: g2a, icon: <Ghost size={11} /> },
  { label: "Pose Studio", img: g3a, icon: <Move3d size={11} /> },
  { label: "Fashion Video", img: g4a, icon: <Video size={11} /> },
  { label: "Stylo AI Stylist", img: g5a, icon: <Wand2 size={11} /> },
];

function HeroCarousel() {
  // Duplicate for a seamless marquee loop
  const loop = [...HERO_CARDS, ...HERO_CARDS];

  return (
    <div className="relative animate-fade-up [animation-delay:120ms]">
      {/* ambient purple glow */}
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 opacity-60"
        style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
      />

      {/* DESKTOP / TABLET — curved arc. Outer clips horizontal overflow only; inner allows vertical/rotational overflow */}
      <div
        className="relative hidden sm:block overflow-x-clip"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="group relative h-[320px] lg:h-[360px]"
          style={{ perspective: "1400px", overflow: "visible" }}
        >
          <div
            className="absolute top-1/2 left-0 flex items-center gap-7 lg:gap-8 will-change-transform animate-marquee group-hover:[animation-play-state:paused]"
            style={{
              animationDirection: "reverse",
              animationDuration: "55s",
              transform: "translateY(-50%)",
              width: "max-content",
            }}
          >
            {loop.map((card, i) => {
              const phase = (i % HERO_CARDS.length) / HERO_CARDS.length;
              const angle = phase * Math.PI * 2;
              const y = Math.sin(angle) * 28;
              const tilt = Math.cos(angle) * 4;
              const depth = (Math.sin(angle) + 1) / 2; // 0..1
              const scale = 0.94 + depth * 0.10;
              const opacity = 0.78 + depth * 0.22;

              return (
                <HeroCard
                  key={`${card.label}-${i}`}
                  card={card}
                  style={{
                    transform: `translateY(${y}px) rotateZ(${tilt}deg) scale(${scale})`,
                    opacity,
                    zIndex: Math.round(depth * 10),
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE — compact horizontal scroll */}
      <div className="sm:hidden relative -mx-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, #0a0810 0%, transparent 8%, transparent 92%, #0a0810 100%)",
          }}
        />
        <div className="overflow-hidden">
          <div
            className="flex items-center gap-4 px-6 py-6 will-change-transform animate-marquee"
            style={{
              animationDirection: "reverse",
              animationDuration: "40s",
              width: "max-content",
            }}
          >
            {loop.map((card, i) => (
              <HeroCard
                key={`m-${card.label}-${i}`}
                card={card}
                style={{ transform: "scale(0.95)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroCard({
  card,
  style,
}: {
  card: { label: string; img: string; icon: React.ReactNode; accent?: boolean };
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="shrink-0 transition-transform duration-700 ease-out"
      style={style}
    >
      <div
        className={`relative w-[160px] sm:w-[170px] lg:w-[180px] aspect-[3/4] rounded-2xl overflow-hidden border backdrop-blur-sm ${
          card.accent
            ? "border-violet/50 shadow-[0_30px_60px_-20px_rgba(168,85,247,0.55)]"
            : "border-white/[0.08] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
        }`}
        style={{
          background:
            "linear-gradient(160deg, #1e1830 0%, #15101f 60%, #0e0a18 100%)",
        }}
      >
        <img
          src={card.img}
          alt={card.label}
          className="absolute inset-0 m-auto h-full w-full object-contain p-2"
          loading="lazy"
          decoding="async"
        />
        {/* very subtle top/bottom legibility gradient (no heavy dark overlay) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"
        />
        {/* label */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-black/55 backdrop-blur px-1.5 py-0.5 text-[10px] text-white border border-white/10">
            {card.icon}
            {card.label}
          </span>
        </div>
        {card.accent && (
          <div
            aria-hidden
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent animate-scan"
            style={{ top: "50%" }}
          />
        )}
      </div>
    </div>
  );
}


function HeroCard({
  card,
  style,
}: {
  card: { label: string; img: string; icon: React.ReactNode; accent?: boolean };
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="shrink-0 transition-transform duration-700 ease-out"
      style={style}
    >
      <div
        className={`relative w-[170px] sm:w-[185px] lg:w-[205px] aspect-[3/4] rounded-2xl overflow-hidden border bg-[#14111d] backdrop-blur-sm ${
          card.accent
            ? "border-violet/50 shadow-[0_30px_60px_-20px_rgba(168,85,247,0.65)]"
            : "border-white/[0.08] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
        }`}
      >
        <img
          src={card.img}
          alt={card.label}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* gradient overlay for legibility */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15"
        />
        {/* label */}
        <div className="absolute top-2 left-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-black/55 backdrop-blur px-1.5 py-0.5 text-[10px] text-white border border-white/10">
            {card.icon}
            {card.label}
          </span>
        </div>
        {card.accent && (
          <div
            aria-hidden
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent animate-scan"
            style={{ top: "50%" }}
          />
        )}
      </div>
    </div>
  );
}


/* =================== WORKFLOW DEMO =================== */
function Workflow() {
  return (
    <section id="workflow" className="relative py-28 sm:py-40">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute right-[-200px] top-1/3 h-[600px] w-[600px] rounded-full opacity-50"
          style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="eyebrow">The product</div>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
              <RevealLines lines={["See TryVerse", "In Action"]} accentIndices={[0]} step={120} />
            </h2>

          </div>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed">
            One photo. One garment. A photorealistic try-on in under a second — fabric,
            color, and fit preserved.
          </p>
        </div>

        <div className="relative rounded-[2.25rem] border border-white/[0.08] bg-gradient-to-b from-[#0e0c16] to-[#08070d] p-4 sm:p-6 lg:p-8">
          <TryOnDemo />
        </div>
      </div>
    </section>
  );
}

/* =================== FEATURES (TABS) =================== */
const SHOPPER_FEATURES = [
  {
    icon: <Store size={18} />,
    title: "AI Fashion Store",
    text: "Browse curated clothing and virtually try items on your photo.",
  },
  {
    icon: <Shirt size={18} />,
    title: "Virtual Try-On",
    text: "Paste any clothing product URL and see the outfit on yourself.",
  },
  {
    icon: <Wand2 size={18} />,
    title: "AI Fashion Stylist",
    text: "Get outfit advice, product search, and styling help.",
  },
  {
    icon: <Move3d size={18} />,
    title: "Pose Studio",
    text: "Turn selfies into professional fashion poses.",
  },
  {
    icon: <Video size={18} />,
    title: "Showcase Video",
    text: "Turn outfits into short fashion videos for Reels and TikTok.",
  },
];

const BRAND_FEATURES = [
  {
    icon: <Camera size={20} />,
    title: "AI Photoshoot",
    text: "Turn flat-lay and product photos into model-ready clothing visuals.",
  },
  {
    icon: <Ghost size={20} />,
    title: "Ghost Mannequin",
    text: "Create clean ghost mannequin images for product pages.",
  },
  {
    icon: <Move3d size={20} />,
    title: "Pose Studio",
    text: "Generate pose variations for campaigns, catalogs, and ecommerce.",
  },
  {
    icon: <Video size={20} />,
    title: "Video Studio",
    text: "Create short fashion videos from clothing visuals.",
  },
  {
    icon: <Code2 size={20} />,
    title: "Store Widget",
    text: "Let shoppers try clothing before buying directly from a brand store.",
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Analytics",
    text: "Track engagement, try-ons, and product performance.",
  },
];

function Features() {
  const [tab, setTab] = useState<"shoppers" | "brands">("shoppers");
  const items = tab === "shoppers" ? SHOPPER_FEATURES : BRAND_FEATURES;

  return (
    <section id="features" className="py-28 sm:py-40">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="eyebrow">The toolkit</div>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
              <RevealLines lines={["Built For Shoppers", "And Fashion Brands"]} accentIndices={[1]} step={120} />
            </h2>

          </div>
          <div
            id={tab === "shoppers" ? "shoppers" : "brands"}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1"
          >
            {(["shoppers", "brands"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-5 py-2 text-[13px] font-medium rounded-full transition-all ${
                  tab === t
                    ? "bg-gradient-to-br from-violet to-magenta text-white shadow-[0_8px_20px_-8px_rgba(168,85,247,0.6)]"
                    : "text-white/65 hover:text-white"
                }`}
              >
                For {t === "shoppers" ? "Shoppers" : "Brands"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:bg-white/[0.035] hover:shadow-[0_30px_80px_-30px_rgba(168,85,247,0.45)] animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="relative inline-flex">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl blur-xl bg-gradient-to-br from-violet/50 to-magenta/40 opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet/25 to-magenta/15 border border-violet/40 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  {f.icon}
                </span>
              </div>
              <h4 className="font-display mt-6 text-xl leading-tight transition-colors group-hover:text-white">{f.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* =================== GALLERY (TWO ROWS) =================== */
function Gallery() {
  const rowA = [
    { src: g1b, tag: "Product Link" },
    { src: editorialHero, tag: "Virtual Try-On" },
    { src: g2a, tag: "Outfit Result" },
    { src: g4a, tag: "Stylist Suggestion" },
    { src: g3a, tag: "Pose Studio" },
    { src: g5a, tag: "Showcase Video" },
  ];
  const rowB = [
    { src: garmentFlat, tag: "Flat-Lay" },
    { src: g2b, tag: "AI Photoshoot" },
    { src: g6a, tag: "Ghost Mannequin" },
    { src: g1a, tag: "Fabric → Outfit" },
    { src: g3a, tag: "Campaign Model" },
    { src: g5a, tag: "Catalog Visual" },
  ];
  const loopA = [...rowA, ...rowA];
  const loopB = [...rowB, ...rowB];

  return (
    <section className="py-28 sm:py-40">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Gallery"
          title="From Product Photos To Fashion-Ready Visuals"
          sub="See how TryVerse turns simple clothing images into try-on results, model photos, and ecommerce-ready visuals."
        />
      </div>

      <div className="mt-14 space-y-5">
        <MarqueeRow items={loopA} />
        <MarqueeRow items={loopB} reverse />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: { src: string; tag: string }[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] px-6"
        style={{
          animationDuration: "70s",
          ...(reverse ? { animationDirection: "reverse" } : {}),
        }}
      >
        {items.map((it, i) => (
          <figure
            key={i}
            className="group relative shrink-0 w-[240px] sm:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#f3eee8]"
          >
            <img
              src={it.src}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              loading="lazy"
          decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/15 to-transparent">
              <span className="chip backdrop-blur bg-black/40 text-white !text-[10px]">
                {it.tag}
              </span>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* =================== STOREFRONT =================== */
function Storefront() {
  const stores = ["Maison Studio", "Atelier Nord", "Linea", "Form & Co", "Verso", "House of Wren"];
  return (
    <section id="stores" className="py-28 sm:py-40">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="On your storefront"
          title="Try Outfits From Your Favorite Stores"
          sub="Shoppers discover and try clothing from supported fashion stores. Brands bring TryVerse virtual try-on directly to their own store."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
          {/* Left: store tiles */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl leading-tight">
              <RevealLines lines={["Supported Clothing Stores"]} step={100} />
            </h3>

            <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">
              Try outfits from the brands you already love — with more added every week.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-2">
              {stores.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-[13px] text-white/85 text-center"
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link to="/stores" className="btn-secondary !py-2.5 !px-5 !text-sm">
                View All Stores
              </Link>
              <Link to="/for-brands" className="btn-primary !py-2.5 !px-5 !text-sm">
                Add TryVerse To Your Store <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: product page mockup */}
          <div className="soft-card p-5 sm:p-7">
            <div className="flex items-center gap-1.5 pb-4">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <div className="ml-3 px-2.5 py-1 text-[10px] text-muted-foreground rounded-md bg-white/5 border border-white/10">
                maisonstudio.com / lavender-blazer
              </div>
            </div>
            <div className="grid grid-cols-[1fr_1.1fr] gap-5">
              <div className="rounded-2xl overflow-hidden bg-[#f6f3ee]">
                <img
                  src={garmentFlat}
                  alt=""
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
          decoding="async"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-muted-foreground">Maison Studio</div>
                <h5 className="font-display text-xl mt-1 leading-tight">
                  Lavender Oversized Blazer
                </h5>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">$148</span>
                  <span className="ml-2 text-muted-foreground line-through text-xs">
                    $180
                  </span>
                </div>
                <div className="mt-4 flex gap-1.5">
                  {["XS", "S", "M", "L", "XL"].map((s, i) => (
                    <span
                      key={s}
                      className={`grid h-8 w-8 place-items-center rounded-lg border text-[11px] ${
                        i === 1
                          ? "border-white text-white bg-white/10"
                          : "border-white/15 text-muted-foreground"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <button className="mt-5 rounded-xl bg-white text-black text-sm font-semibold py-3 flex items-center justify-center gap-2">
                  <ShoppingBag size={14} /> Add to bag
                </button>
                <button className="mt-2 btn-primary !py-3 !text-sm">
                  <Sparkles size={14} /> Try It On With TryVerse
                </button>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Check size={12} className="text-emerald-400" /> Powered by TryVerse · 0.8s
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== FINAL CTA =================== */
function FinalCTA() {
  return (
    <section id="try" className="relative overflow-hidden py-32 sm:py-44">
      {/* soft radial glow behind text */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
      />

      <div className="mx-auto max-w-[720px] px-6 sm:px-10 text-center">
        <Reveal as="div" className="eyebrow justify-center">
          Free to start
        </Reveal>

        <h2 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[64px] leading-[1.05]">
          <RevealLines
            lines={["Ready To See", "It On You?"]}
            accentIndices={[1]}
            step={130}
          />
        </h2>

        <Reveal as="p" delay={340} className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Try clothes before buying or create AI visuals for your fashion brand with TryVerse.
        </Reveal>

        <Reveal delay={500} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
            Try It Free <ArrowRight size={16} />
          </Link>
          <Link to="/book-demo" className="btn-secondary !py-3.5 !px-7 !text-sm">
            Book Brand Demo
          </Link>
        </Reveal>

        <Reveal delay={640} className="mt-7 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check size={12} className="text-emerald-400" /> No credit card
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={12} className="text-emerald-400" /> Setup in minutes
          </span>
        </Reveal>
      </div>
    </section>
  );
}

/* =================== SHARED =================== */
function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  const titleNode =
    typeof title === "string" ? (
      <RevealLines lines={[title]} step={100} />
    ) : (
      <Reveal as="span">{title}</Reveal>
    );
  return (
    <div className="max-w-3xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
        {titleNode}
      </h2>
      {sub && (
        <Reveal as="p" delay={260} className="mt-5 text-base text-muted-foreground max-w-2xl leading-relaxed">
          {sub}
        </Reveal>
      )}
    </div>
  );

}
