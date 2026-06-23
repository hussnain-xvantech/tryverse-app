import { createFileRoute } from "@tanstack/react-router";
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
  Play,
  Image as ImageIcon,
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
          style={{ background: "var(--gradient-glow)", filter: "blur(50px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* LEFT — copy */}
          <div className="animate-fade-up">
            <div className="eyebrow flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-violet" />
              AI Fashion Try-On Studio
            </div>
            <h1 className="font-display mt-6 text-[44px] sm:text-[64px] lg:text-[80px] leading-[1.02]">
              Try Clothes On<br />Before You Buy
            </h1>
            <p className="mt-6 text-base sm:text-[17px] text-muted-foreground max-w-xl leading-relaxed">
              Paste a product link, upload your photo, and see the outfit on you
              instantly. For brands, TryVerse turns clothing photos into model shots,
              videos, poses, and store-ready visuals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#try" className="btn-primary !py-3.5 !px-7 !text-sm">
                Try It Free <ArrowRight size={16} />
              </a>
              <a href="#brands" className="btn-secondary !py-3.5 !px-7 !text-sm">
                Explore Brand Studio
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Virtual Try-On", "AI Stylist", "Photoshoot", "Brand Widget"].map(
                (c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* RIGHT — studio mockup */}
          <HeroStudio />
        </div>
      </div>
    </section>
  );
}

function HeroStudio() {
  return (
    <div className="relative animate-fade-up [animation-delay:120ms]">
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 opacity-80"
        style={{ background: "var(--gradient-glow)", filter: "blur(50px)" }}
      />

      {/* app window */}
      <div className="relative rounded-[1.8rem] border border-white/[0.08] bg-gradient-to-b from-[#14111d] to-[#0a0810] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-violet to-magenta">
              <Sparkles size={12} />
            </span>
            <span className="text-[12.5px] font-semibold tracking-tight">
              TryVerse Studio
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-white/55">
            <span className="px-2.5 py-1 rounded-md bg-white/[0.05] text-white">Try-On</span>
            <span className="px-2.5 py-1 rounded-md">Studio</span>
            <span className="px-2.5 py-1 rounded-md">Stores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
        </div>

        {/* URL input */}
        <div className="px-5 pt-4">
          <div className="relative flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
            <Link2 size={14} className="text-violet shrink-0" />
            <span className="text-[12.5px] text-white/75 truncate">
              maisonstudio.com/lavender-oversized-blazer
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] text-emerald-300/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
              detected
            </span>
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 rounded-xl pointer-events-none animate-progress"
              style={{
                background:
                  "linear-gradient(90deg, rgba(168,85,247,0.18), rgba(217,70,239,0.18))",
              }}
            />
          </div>

          {/* tool pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[
              { l: "Try-On", a: true },
              { l: "AI Stylist" },
              { l: "Pose Studio" },
              { l: "Photoshoot" },
              { l: "Ghost Mannequin" },
            ].map((p) => (
              <span
                key={p.l}
                className={`text-[10.5px] px-2.5 py-1.5 rounded-full ${
                  p.a
                    ? "chip-active text-white"
                    : "bg-white/[0.04] border border-white/[0.08] text-white/65"
                }`}
              >
                {p.l}
              </span>
            ))}
          </div>
        </div>

        {/* canvas */}
        <div className="p-5 pt-4 grid grid-cols-[1fr_auto_1fr_auto_1.2fr] gap-3 items-stretch">
          <StudioCard label="Your photo" img={userRef} icon={<Upload size={11} />} />
          <Connector />
          <StudioCard label="Clothing" img={garmentFlat} icon={<Shirt size={11} />} />
          <Connector active />
          <StudioCard
            label="Try-on result"
            img={editorialHero}
            icon={<Sparkles size={11} />}
            result
          />
        </div>

        {/* generation bar */}
        <div className="mx-5 mb-4 rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11.5px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-violet animate-glow-pulse" />
              Generating · photoreal fabric & fit
            </div>
            <span className="text-[10.5px] text-white/45">0.8s avg</span>
          </div>
          <div className="mt-2.5 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full animate-progress rounded-full"
              style={{ background: "var(--gradient-brand)" }}
            />
          </div>
        </div>
      </div>

      {/* Floating mobile preview */}
      <div className="hidden md:block absolute -right-6 -bottom-10 w-[170px] rotate-[6deg]">
        <div className="rounded-[1.5rem] border border-white/15 bg-[#08070d] p-1.5 shadow-[0_20px_60px_-20px_rgba(168,85,247,0.4)]">
          <div className="rounded-[1.2rem] overflow-hidden aspect-[9/16] bg-[#f3eee8] relative">
            <img
              src={editorialHero}
              alt="Mobile preview"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-2 bottom-2 glass rounded-lg px-2 py-1.5 flex items-center justify-between">
              <span className="text-[9px] text-white/85">Try-on ready</span>
              <Sparkles size={9} className="text-magenta" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating chip */}
      <div className="hidden md:flex absolute -left-5 top-10 glass rounded-full px-3 py-1.5 items-center gap-1.5 text-[11px]">
        <Sparkles size={11} className="text-magenta" /> Powered by TryVerse AI
      </div>
    </div>
  );
}

function StudioCard({
  label,
  img,
  icon,
  result,
}: {
  label: string;
  img: string;
  icon: React.ReactNode;
  result?: boolean;
}) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden aspect-[3/4] bg-[#f3eee8] ${
        result ? "ring-1 ring-violet/40 shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)]" : ""
      }`}
    >
      <img
        src={img}
        alt={label}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute top-1.5 left-1.5">
        <span className="inline-flex items-center gap-1 rounded-md bg-black/55 backdrop-blur px-1.5 py-0.5 text-[9.5px] text-white">
          {icon}
          {label}
        </span>
      </div>
      {result && (
        <div
          aria-hidden
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent animate-scan"
          style={{ top: "50%" }}
        />
      )}
    </div>
  );
}

function Connector({ active }: { active?: boolean }) {
  return (
    <div className="hidden md:flex flex-col items-center justify-center w-5">
      <div
        className={`h-px w-full ${
          active
            ? "bg-gradient-to-r from-violet to-magenta"
            : "bg-white/15"
        }`}
      />
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
          style={{ background: "var(--gradient-glow)", filter: "blur(60px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="eyebrow">The product</div>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
              See TryVerse In Action
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
    icon: <Camera size={18} />,
    title: "Photoshoot",
    text: "Create AI product photography with multiple angles, styles, and lighting.",
  },
  {
    icon: <Palette size={18} />,
    title: "AI Studio",
    text: "Edit clothing visuals, apply styles, and create product-ready images.",
  },
  {
    icon: <Ghost size={18} />,
    title: "Ghost Mannequin",
    text: "Transform flat-lay and mannequin photos into clean apparel visuals.",
  },
  {
    icon: <Layers size={18} />,
    title: "Fabric Studio",
    text: "Upload fabric swatches and generate realistic outfit images.",
  },
  {
    icon: <Move3d size={18} />,
    title: "Pose Studio",
    text: "Generate premium poses across catalog, editorial, and campaign looks.",
  },
  {
    icon: <Video size={18} />,
    title: "Video Studio",
    text: "Generate cinematic clothing showcase videos.",
  },
  {
    icon: <Code2 size={18} />,
    title: "Widget",
    text: "Add virtual try-on to an online clothing store.",
  },
  {
    icon: <LayoutGrid size={18} />,
    title: "Stores",
    text: "Manage product catalogs, collaborators, and store settings.",
  },
  {
    icon: <BarChart3 size={18} />,
    title: "Analytics",
    text: "Track traffic, conversions, engagement, and store performance.",
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
              Built For Shoppers<br />And Fashion Brands
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

        <div className="mt-12 grid gap-px bg-white/[0.06] rounded-[2rem] overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="p-7 sm:p-8 bg-background/95 hover:bg-white/[0.03] transition-colors"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/10 text-white">
                {f.icon}
              </span>
              <h4 className="font-display mt-6 text-xl leading-tight">{f.title}</h4>
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
    <div className="overflow-hidden">
      <div
        className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] px-6"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {items.map((it, i) => (
          <figure
            key={i}
            className="relative shrink-0 w-[240px] sm:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden bg-[#f3eee8]"
          >
            <img
              src={it.src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
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
              Supported Clothing Stores
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
              <a href="#" className="btn-secondary !py-2.5 !px-5 !text-sm">
                View All Stores
              </a>
              <a href="#" className="btn-primary !py-2.5 !px-5 !text-sm">
                Add TryVerse To Your Store <ArrowRight size={14} />
              </a>
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
    <section id="try" className="py-28 sm:py-40">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="relative rounded-[2.5rem] overflow-hidden p-10 sm:p-16 lg:p-20 bg-gradient-to-b from-[#15131c] to-[#0c0a14] border border-white/10">
          <div
            className="absolute -inset-32 -z-0 opacity-70"
            style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
          />
          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div>
              <div className="eyebrow">Free to start</div>
              <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
                Ready To See It On You?
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-lg">
                Try clothes before buying or create AI visuals for your fashion brand with TryVerse.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#" className="btn-primary !py-3.5 !px-7 !text-sm">
                  Try It Free <ArrowRight size={16} />
                </a>
                <a href="#" className="btn-secondary !py-3.5 !px-7 !text-sm">
                  Book Brand Demo
                </a>
              </div>
              <div className="mt-7 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check size={12} className="text-emerald-400" /> No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={12} className="text-emerald-400" /> Setup in minutes
                </span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[460px] aspect-[4/5]">
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden glow bg-[#f3eee8]">
                <img
                  src={editorialHero}
                  alt="Try-on result"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 text-xs flex items-center gap-2">
                <Sparkles size={12} className="text-magenta" /> Generated in 0.8s
              </div>
            </div>
          </div>
        </div>
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
  return (
    <div className="max-w-3xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 text-base text-muted-foreground max-w-2xl leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}
