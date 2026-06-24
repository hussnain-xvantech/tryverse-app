import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Shirt,
  Camera,
  Ghost,
  Move3d,
  Check,
  ShoppingBag,
  BarChart3,
  Palette,
  Video,
  LayoutGrid,
  Code2,
  Layers,
  DollarSign,
  Rocket,
  Eye,
  Sliders,
  Wand2,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Reveal, RevealLines } from "@/components/site/Reveal";

import editorialHero from "@/assets/editorial-hero.jpg";
import garmentFlat from "@/assets/garment-flatlay.jpg";
import clothingBlazer from "@/assets/clothing-blazer.jpg";
import blazerBefore from "@/assets/blazer-before.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import g1a from "@/assets/g1-after.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g6a from "@/assets/g6-after.jpg";
import g1b from "@/assets/g1-before.jpg";
import g2b from "@/assets/g2-before.jpg";

export const Route = createFileRoute("/for-brands")({
  head: () => ({
    meta: [
      { title: "For Brands — TryVerse AI Clothing Studio" },
      {
        name: "description",
        content:
          "TryVerse helps fashion brands create AI photoshoots, ghost mannequin visuals, pose variations, videos, and virtual try-on experiences for their online clothing store.",
      },
      { property: "og:title", content: "For Brands — TryVerse AI Clothing Studio" },
      {
        property: "og:description",
        content:
          "Turn flat-lay, mannequin, fabric, and product photos into store-ready clothing visuals and virtual try-on experiences.",
      },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="pt-24 sm:pt-28">
        <BrandHero />
        <ProblemSolution />
        <BrandToolsGrid />
        <BrandStudioDemo />
        <OutputTypes />
        <BrandWidget />
        <ResultsGallery />
        <BrandFinalCTA />
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

/* =================== SHARED HEAD =================== */
function SectionHead({
  eyebrow,
  lines,
  accentIndices,
  sub,
  align = "left",
}: {
  eyebrow: string;
  lines: string[];
  accentIndices?: number[];
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center max-w-3xl" : "max-w-3xl"}`}>
      <div className={`eyebrow ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</div>
      <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
        <RevealLines lines={lines} accentIndices={accentIndices} step={120} />
      </h2>
      {sub && (
        <Reveal as="p" delay={280} className="mt-5 text-base text-muted-foreground max-w-2xl leading-relaxed">
          {sub}
        </Reveal>
      )}
    </div>
  );
}

/* =================== 1. HERO =================== */
function BrandHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute left-1/2 top-[-260px] h-[900px] w-[1200px] -translate-x-1/2 rounded-full opacity-70"
          style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid items-center gap-14 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* LEFT */}
          <div className="animate-fade-up">
            <div className="eyebrow flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-violet" />
              For Fashion Brands
            </div>
            <h1 className="font-display mt-6 text-[44px] sm:text-[60px] lg:text-[76px] leading-[1.02]">
              <RevealLines
                lines={["Create Clothing", "Visuals That Sell"]}
                accentIndices={[1]}
                step={130}
              />
            </h1>
            <Reveal
              as="p"
              delay={440}
              className="mt-6 text-base sm:text-[17px] text-muted-foreground max-w-xl leading-relaxed"
            >
              Turn flat-lay, mannequin, fabric, and clothing product photos into AI model shots,
              ghost mannequin images, pose variations, videos, and virtual try-on experiences for
              your online store.
            </Reveal>
            <Reveal delay={580} className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
                Start Creating <ArrowRight size={16} />
              </Link>
              <Link to="/book-demo" className="btn-secondary !py-3.5 !px-7 !text-sm">
                Book Brand Demo
              </Link>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-2">
              {["AI Photoshoot", "Ghost Mannequin", "Video Studio", "Store Widget"].map(
                (c, i) => (
                  <span
                    key={c}
                    className="chip animate-fade-up"
                    style={{ animationDelay: `${320 + i * 90}ms` }}
                  >
                    {c}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* RIGHT — Brand Studio dashboard */}
          <BrandStudioMockup />
        </div>
      </div>
    </section>
  );
}

function BrandStudioMockup() {
  const tools = [
    { label: "Photoshoot", icon: <Camera size={11} /> },
    { label: "Ghost Mannequin", icon: <Ghost size={11} /> },
    { label: "Pose Studio", icon: <Move3d size={11} /> },
    { label: "Video Studio", icon: <Video size={11} /> },
    { label: "Widget", icon: <Code2 size={11} /> },
  ];
  const variations = ["Studio", "Editorial", "Catalog", "Social"];
  const steps = ["Upload", "Style", "Generate", "Publish"];
  const [active, setActive] = useState(0);
  const [variation, setVariation] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    let visible = false;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        setActive((a) => (a + 1) % tools.length);
        setVariation((v) => (v + 1) % variations.length);
      }, 1600);
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    const onVis = () => {
      if (document.visibilityState === "visible" && visible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, [tools.length, variations.length]);

  return (
    <div ref={rootRef} className="relative animate-fade-up [animation-delay:120ms]">
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 opacity-80"
        style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
      />

      <div className="relative rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-[#14111d] to-[#0a0810] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet to-magenta shadow-[0_6px_20px_-6px_rgba(168,85,247,0.7)]">
              <Sparkles size={13} />
            </span>
            <span className="text-[13px] font-semibold tracking-tight">Brand Studio</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-300/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
            Ready for store
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
        </div>

        {/* BODY: product / result + variations / tools */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 p-4 sm:p-5">
          {/* product */}
          <div className="col-span-3 animate-fade-up">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
              Input
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/[0.06] bg-[#f3eee8]">
              <img
                src={garmentFlat}
                alt="Flat-lay clothing"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <span className="absolute top-1.5 left-1.5 chip backdrop-blur bg-black/55 text-white !text-[9.5px]">
                <Shirt size={10} /> Flat-lay
              </span>
            </div>
          </div>

          {/* AI result + variations */}
          <div className="col-span-5 animate-fade-up [animation-delay:160ms]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
              AI Photoshoot
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-violet/50 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.55)] bg-[#f3eee8]">
              <img
                src={editorialHero}
                alt="AI model result"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <span className="absolute top-1.5 left-1.5 chip backdrop-blur bg-black/55 text-white !text-[9.5px]">
                <Sparkles size={10} /> {variations[variation]}
              </span>
              <div
                aria-hidden
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent animate-scan"
                style={{ top: "50%" }}
              />
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {variations.map((v, i) => (
                <div
                  key={v}
                  className={`text-[9.5px] text-center py-1 rounded-md border transition-all ${
                    i === variation
                      ? "border-violet/50 bg-gradient-to-br from-violet/25 to-magenta/15 text-white"
                      : "border-white/[0.06] bg-white/[0.02] text-white/55"
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>

          {/* tools list */}
          <div className="col-span-4 flex flex-col gap-1.5 animate-fade-up [animation-delay:300ms]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-1">Tools</div>
            {tools.map((t, i) => (
              <div
                key={t.label}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] transition-all duration-300 ${
                  i === active
                    ? "border-violet/45 bg-gradient-to-br from-violet/15 to-magenta/10 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.08)]"
                    : "border-white/[0.06] bg-white/[0.02] text-white/60"
                }`}
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-md ${
                    i === active ? "bg-violet/30 text-white" : "bg-white/[0.05] text-white/55"
                  }`}
                >
                  {t.icon}
                </span>
                {t.label}
                {i === active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div className="px-4 sm:px-5 pb-5">
          <div className="rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold ${
                      i < 3
                        ? "bg-gradient-to-br from-violet to-magenta text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                        : "bg-white/[0.06] text-white/45 border border-white/10"
                    }`}
                  >
                    {i < 3 ? <Check size={10} /> : i + 1}
                  </span>
                  <span className={`text-[11px] ${i < 3 ? "text-white/85" : "text-white/45"}`}>
                    {s}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      className={`mx-2 hidden sm:block h-px flex-1 ${
                        i < 2 ? "bg-gradient-to-r from-violet to-magenta" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2.5 h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full animate-progress rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================== 2. PROBLEM / SOLUTION (+ merged benefits) =================== */
function ProblemSolution() {
  const problems = [
    {
      icon: <DollarSign size={18} />,
      title: "Photoshoots cost too much",
      text: "Studio, models, photographers, and editing make every launch expensive.",
    },
    {
      icon: <Rocket size={18} />,
      title: "Product visuals take too long",
      text: "New clothing drops need fast content for ecommerce, ads, social, and catalogs.",
    },
    {
      icon: <Eye size={18} />,
      title: "Shoppers want more confidence",
      text: "Customers want to see how clothes look on themselves before they buy.",
    },
  ];

  const benefits = [
    "Reduce photoshoot cost",
    "Launch products faster",
    "Better product presentation",
    "Higher shopper confidence",
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="The challenge"
          lines={["Traditional Product Shoots", "Slow Fashion Brands Down"]}
          accentIndices={[1]}
          sub="Every new collection needs clean visuals, model shots, and store-ready product images. TryVerse helps create them faster with AI — and ships them straight to your store."
        />

        <div className="mt-12 grid gap-px bg-white/[0.06] rounded-[2rem] overflow-hidden sm:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 100}
              className="group p-7 sm:p-8 bg-background/95 hover:bg-white/[0.03] transition-all duration-300"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/10 text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-violet/40 group-hover:shadow-[0_8px_24px_-10px_rgba(168,85,247,0.5)]">
                {p.icon}
              </span>
              <h4 className="font-display mt-6 text-xl leading-tight">{p.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={300}
          className="mt-10 mx-auto max-w-3xl text-center soft-card p-7 sm:p-9 relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-50"
            style={{ background: "var(--gradient-glow)", filter: "blur(24px)" }}
          />
          <div className="eyebrow justify-center">The solution</div>
          <p className="font-display mt-3 text-2xl sm:text-3xl leading-snug">
            TryVerse gives fashion brands an AI studio for clothing visuals, virtual try-on, and
            store-ready content.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {benefits.map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 text-[12.5px] text-white/80">
                <Check size={13} className="text-emerald-400" /> {b}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =================== 3. BRAND TOOLS GRID =================== */
const BRAND_TOOLS = [
  {
    icon: <Camera size={18} />,
    title: "AI Photoshoot",
    text: "Realistic model photos from clothing product images, with different angles and lighting.",
  },
  {
    icon: <Ghost size={18} />,
    title: "Ghost Mannequin",
    text: "Turn flat-lay or mannequin apparel photos into clean ecommerce-ready visuals.",
  },
  {
    icon: <Layers size={18} />,
    title: "Fabric Studio",
    text: "Upload fabric swatches or unstitched clothing and generate realistic outfit visuals.",
  },
  {
    icon: <Move3d size={18} />,
    title: "Pose Studio",
    text: "Generate premium model poses for catalog, editorial, campaign, and social content.",
  },
  {
    icon: <Video size={18} />,
    title: "Video Studio",
    text: "Turn clothing visuals into short showcase videos for Reels, TikTok, ads, and PDPs.",
  },
  {
    icon: <Code2 size={18} />,
    title: "Brand Widget",
    text: "Add virtual try-on to your store so shoppers can see clothes on themselves.",
  },
  {
    icon: <LayoutGrid size={18} />,
    title: "Stores",
    text: "Manage clothing catalogs, product images, store settings, and brand assets.",
  },
  {
    icon: <BarChart3 size={18} />,
    title: "Analytics",
    text: "Track engagement, try-on usage, product interest, and conversions.",
  },
];

function BrandToolsGrid() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="The toolkit"
          lines={["One AI Studio For", "Clothing Brands"]}
          accentIndices={[1]}
          sub="Every tool your team needs to plan, produce, and publish clothing visuals — built specifically for apparel."
        />

        <div className="mt-12 grid gap-px bg-white/[0.06] rounded-[2rem] overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_TOOLS.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 60}
              className="group p-7 sm:p-8 bg-background/95 hover:bg-white/[0.03] transition-all duration-300"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/10 text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-violet/40 group-hover:shadow-[0_8px_24px_-10px_rgba(168,85,247,0.5)]">
                {f.icon}
              </span>
              <h4 className="font-display mt-6 text-xl leading-tight">{f.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== 4. AI PHOTOSHOOT DEMO =================== */
function BrandStudioDemo() {
  const variations = [
    { label: "Studio", img: editorialHero },
    { label: "Editorial", img: g1a },
    { label: "Catalog", img: g2a },
  ];
  const steps = [
    "Reading garment",
    "Preserving fabric details",
    "Creating model pose",
    "Final image ready",
  ];
  const [stepIdx, setStepIdx] = useState(0);
  const [variantIdx, setVariantIdx] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let t: ReturnType<typeof setInterval> | null = null;
    let visible = false;
    const start = () => {
      if (t) return;
      t = setInterval(() => {
        setStepIdx((s) => (s + 1) % steps.length);
        setVariantIdx((v) => (v + 1) % variations.length);
      }, 1800);
    };
    const stop = () => {
      if (t) {
        clearInterval(t);
        t = null;
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    const onVis = () => {
      if (document.visibilityState === "visible" && visible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, [steps.length, variations.length]);

  return (
    <section id="demo" className="relative py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute right-[-200px] top-1/3 h-[600px] w-[600px] rounded-full opacity-50"
          style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
        />
      </div>

      <div ref={rootRef} className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Live demo"
          lines={["AI Photoshoot", "In Action"]}
          accentIndices={[1]}
          align="center"
          sub="Upload one clothing product photo and generate model-ready ecommerce visuals in seconds."
        />

        <div className="mt-12 relative rounded-[2.25rem] border border-white/[0.08] bg-gradient-to-b from-[#0e0c16] to-[#08070d] p-5 sm:p-7 lg:p-9">
          <div className="grid gap-6 lg:gap-8 items-center lg:grid-cols-[0.9fr_auto_1.2fr]">
            {/* LEFT — Uploaded product */}
            <div className="animate-fade-up">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-3">
                Uploaded Product
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/[0.06] bg-[#f3eee8]">
                <img
                  src={clothingBlazer}
                  alt="Flat-lay lavender blazer"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-2 left-2 chip backdrop-blur bg-black/55 text-white !text-[10px]">
                  <Shirt size={10} /> Flat-lay
                </span>
              </div>
              <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <div className="text-[13px] font-medium">Lavender Blazer</div>
                <div className="text-[11px] text-white/55 mt-0.5">Apparel · Outerwear</div>
              </div>
            </div>

            {/* CENTER — processing line */}
            <div className="hidden lg:flex flex-col items-center gap-3 px-2">
              <div className="relative h-[260px] w-[2px] overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="absolute inset-x-0 h-[40%] animate-scan-y rounded-full"
                  style={{ background: "var(--gradient-brand)" }}
                />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-violet">
                <Wand2 size={12} /> Generating
              </div>
            </div>
            <div className="lg:hidden flex justify-center">
              <ArrowRight className="text-violet animate-pulse" size={22} />
            </div>

            {/* RIGHT — AI result + variations + workflow */}
            <div className="animate-fade-up [animation-delay:160ms] space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-3">
                  AI Photoshoot Result
                </div>
                <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-2xl overflow-hidden ring-1 ring-violet/50 shadow-[0_30px_70px_-25px_rgba(168,85,247,0.55)] bg-[#f3eee8]">
                  <img
                    src={variations[variantIdx].img}
                    alt="AI model photoshoot result"
                    className="h-full w-full object-cover transition-opacity duration-500"
                    loading="lazy"
                    decoding="async"
                    key={variantIdx}
                  />
                  <span className="absolute top-2.5 left-2.5 chip backdrop-blur bg-black/55 text-white !text-[10px]">
                    <Sparkles size={10} /> {variations[variantIdx].label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {variations.map((v, i) => (
                  <button
                    key={v.label}
                    type="button"
                    onClick={() => setVariantIdx(i)}
                    className={`relative aspect-[4/5] rounded-lg overflow-hidden ring-1 transition-all ${
                      i === variantIdx
                        ? "ring-violet/60 shadow-[0_0_0_3px_rgba(168,85,247,0.15)]"
                        : "ring-white/[0.06] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={v.img} alt={v.label} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    <span className="absolute bottom-1 left-1 chip backdrop-blur bg-black/55 text-white !text-[9px] !px-1.5 !py-0.5">
                      {v.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4 space-y-2">
                {steps.map((s, i) => {
                  const done = i < stepIdx;
                  const active = i === stepIdx;
                  return (
                    <div key={s} className="flex items-center gap-2 text-[12px]">
                      <span
                        className={`grid h-4 w-4 place-items-center rounded-full text-[9px] ${
                          done
                            ? "bg-gradient-to-br from-violet to-magenta text-white"
                            : active
                              ? "border border-violet/60 text-violet"
                              : "border border-white/10 text-white/35"
                        }`}
                      >
                        {done ? <Check size={9} /> : i + 1}
                      </span>
                      <span
                        className={
                          done ? "text-white/80" : active ? "text-white" : "text-white/45"
                        }
                      >
                        {s}
                      </span>
                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== 5. OUTPUT TYPES =================== */
function OutputTypes() {
  const outputs = [
    {
      icon: <Camera size={16} />,
      title: "AI Model Photos",
      text: "Turn product photos into realistic model shots for ecommerce and campaigns.",
      img: editorialHero,
    },
    {
      icon: <Ghost size={16} />,
      title: "Ghost Mannequin",
      text: "Create clean apparel visuals without models or studio setup.",
      img: g6a,
    },
    {
      icon: <Video size={16} />,
      title: "Pose & Video Variations",
      text: "Generate multiple poses and short videos for ads, Reels, and TikTok.",
      img: g3a,
    },
    {
      icon: <Code2 size={16} />,
      title: "Store Try-On Widget",
      text: "Let shoppers try clothing directly on your product pages.",
      img: blazerAfter,
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Outputs"
          lines={["Choose The Output", "Your Brand Needs"]}
          accentIndices={[1]}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {outputs.map((o, i) => (
            <Reveal
              key={o.title}
              delay={i * 90}
              className="group relative soft-card overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-[0_24px_60px_-30px_rgba(168,85,247,0.6)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f3eee8]">
                <img
                  src={o.img}
                  alt={o.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <span className="absolute top-3 left-3 chip backdrop-blur bg-black/55 text-white !text-[10px]">
                  {o.icon} {o.title}
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-display text-lg leading-tight">{o.title}</h4>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== 6. BRAND WIDGET =================== */
function BrandWidget() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="grid gap-12 lg:gap-16 items-center lg:grid-cols-[1.1fr_1fr]">
          {/* LEFT — mockup */}
          <div className="soft-card p-5 sm:p-7 order-2 lg:order-1">
            <div className="flex items-center gap-1.5 pb-4">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <div className="ml-3 px-2.5 py-1 text-[10px] text-muted-foreground rounded-md bg-white/5 border border-white/10">
                yourstore.com / lavender-blazer
              </div>
            </div>
            <div className="grid grid-cols-[1fr_1.05fr] gap-5">
              <div className="rounded-2xl overflow-hidden bg-[#f6f3ee]">
                <img
                  src={clothingBlazer}
                  alt=""
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-xs text-muted-foreground">Your Brand</div>
                <h5 className="font-display text-xl mt-1 leading-tight">
                  Lavender Oversized Blazer
                </h5>
                <div className="mt-2 text-sm">
                  <span className="font-semibold">$148</span>
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
                <div className="mt-3 rounded-lg overflow-hidden ring-1 ring-violet/30">
                  <img
                    src={editorialHero}
                    alt="Try-on preview"
                    className="w-full aspect-[16/9] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Check size={12} className="text-emerald-400" /> Powered by TryVerse · 0.8s
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — copy + benefits */}
          <div className="order-1 lg:order-2">
            <div className="eyebrow">Brand widget</div>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-[56px] leading-[1.04]">
              <RevealLines lines={["Bring TryVerse", "To Your Store"]} accentIndices={[1]} step={120} />
            </h2>
            <Reveal as="p" delay={300} className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md">
              Add a virtual try-on button to your clothing product pages and let shoppers see
              outfits on themselves before checkout.
            </Reveal>
            <ul className="mt-7 space-y-3">
              {[
                "Easy shopper try-on",
                "Better product confidence",
                "More engaging product pages",
                "Works across clothing catalogs",
              ].map((b, i) => (
                <Reveal as="li" delay={400 + i * 80} key={b} className="flex items-center gap-3 text-[14.5px] text-white/85">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet to-magenta text-white">
                    <Check size={12} />
                  </span>
                  {b}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={760} className="mt-8 flex flex-wrap gap-3">
              <Link to="/book-demo" className="btn-primary !py-3 !px-6 !text-sm">
                Add TryVerse To Your Store <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== 7. RESULTS GALLERY =================== */
function ResultsGallery() {
  const rowA = [
    { src: garmentFlat, tag: "Flat-lay → Model" },
    { src: editorialHero, tag: "AI Photoshoot" },
    { src: g6a, tag: "Ghost Mannequin" },
    { src: g1a, tag: "Fabric → Outfit" },
    { src: g2a, tag: "Catalog Visual" },
    { src: g5a, tag: "Campaign Image" },
  ];
  const rowB = [
    { src: g3a, tag: "Pose Variation" },
    { src: g4a, tag: "Campaign Image" },
    { src: g1b, tag: "Social Ad Visual" },
    { src: editorialHero, tag: "Try-On Widget" },
    { src: g2b, tag: "Catalog Frame" },
    { src: blazerAfter, tag: "Ecommerce Model" },
  ];
  const loopA = [...rowA, ...rowA];
  const loopB = [...rowB, ...rowB];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Gallery"
          lines={["Brand-Ready", "Clothing Visuals"]}
          accentIndices={[1]}
          sub="Flat-lays turned into model photos, mannequins into ghost mannequin shots, and product images into campaign visuals."
        />
      </div>
      <div className="mt-12 space-y-5">
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

/* =================== 8. FINAL CTA =================== */
function BrandFinalCTA() {
  return (
    <section id="try" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-50"
        style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
      />

      <div className="mx-auto max-w-[720px] px-6 sm:px-10 text-center">
        <Reveal as="div" className="eyebrow justify-center">
          For Clothing Brands
        </Reveal>

        <h2 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[60px] leading-[1.05]">
          <RevealLines
            lines={["Ready To Create", "Better Product Visuals?"]}
            accentIndices={[1]}
            step={130}
          />
        </h2>

        <Reveal as="p" delay={340} className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Build AI photoshoots, ghost mannequin images, videos, and virtual try-on experiences for
          your fashion store with TryVerse.
        </Reveal>

        <Reveal delay={500} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
            Start Creating <ArrowRight size={16} />
          </Link>
          <Link to="/book-demo" className="btn-secondary !py-3.5 !px-7 !text-sm">
            Book Brand Demo
          </Link>
        </Reveal>

        <Reveal delay={640} className="mt-7 flex flex-wrap justify-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check size={12} className="text-emerald-400" /> Clothing-only AI
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={12} className="text-emerald-400" /> Store-ready visuals
          </span>
          <span className="flex items-center gap-1.5">
            <Check size={12} className="text-emerald-400" /> Fast setup
          </span>
        </Reveal>
      </div>
    </section>
  );
}
