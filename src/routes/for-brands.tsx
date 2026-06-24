import { createFileRoute } from "@tanstack/react-router";
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
  Upload,
  Store,
  BarChart3,
  Palette,
  Video,
  LayoutGrid,
  Code2,
  Layers,
  Image as ImageIcon,
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
        <HowItWorks />
        <UseCases />
        <BusinessBenefits />
        <BrandWidget />
        <ResultsGallery />
        <BrandFinalCTA />
      </main>
      <Footer />
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
              Turn flat-lay, mannequin, fabric, and product photos into AI model shots, ghost
              mannequin images, pose variations, videos, and virtual try-on experiences for your
              online store.
            </Reveal>
            <Reveal delay={580} className="mt-8 flex flex-wrap gap-3">
              <a href="#try" className="btn-primary !py-3.5 !px-7 !text-sm">
                Start Creating <ArrowRight size={16} />
              </a>
              <a href="#demo" className="btn-secondary !py-3.5 !px-7 !text-sm">
                Book Brand Demo
              </a>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-2">
              {["AI Photoshoot", "Ghost Mannequin", "Brand Widget", "Store Analytics"].map(
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
  const steps = ["Upload", "Generate", "Review", "Publish"];
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    let visible = false;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => setActive((a) => (a + 1) % tools.length), 1500);
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
  }, [tools.length]);

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
          <div className="hidden sm:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
            {["Studio", "Catalog", "Widget", "Analytics"].map((t, i) => (
              <span
                key={t}
                className={`px-3 py-1.5 text-[11.5px] rounded-full transition-colors ${
                  i === 0
                    ? "bg-gradient-to-br from-violet/30 to-magenta/20 text-white border border-violet/40 shadow-[0_0_0_3px_rgba(168,85,247,0.08)]"
                    : "text-white/55"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
        </div>

        {/* BODY: product / result / tools */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 p-4 sm:p-5">
          {/* product */}
          <div className="col-span-4 animate-fade-up">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
              Product
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/[0.06] bg-[#f3eee8]">
              <img
                src={clothingBlazer}
                alt="Clothing product"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <span className="absolute top-1.5 left-1.5 chip backdrop-blur bg-black/55 text-white !text-[9.5px]">
                <Shirt size={10} /> Upload
              </span>
            </div>
          </div>

          {/* AI result */}
          <div className="col-span-4 animate-fade-up [animation-delay:160ms]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
              AI Model
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-violet/50 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.55)] bg-[#f3eee8]">
              <img
                src={editorialHero}
                alt="AI model result"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <span className="absolute top-1.5 left-1.5 chip backdrop-blur bg-black/55 text-white !text-[9.5px]">
                <Sparkles size={10} /> Generated
              </span>
              <div
                aria-hidden
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent animate-scan"
                style={{ top: "50%" }}
              />
            </div>
          </div>

          {/* tools list */}
          <div className="col-span-4 flex flex-col gap-2 animate-fade-up [animation-delay:300ms]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-1">Tools</div>
            {tools.map((t, i) => (
              <div
                key={t.label}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11.5px] transition-all duration-300 ${
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
          <div className="rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3.5">
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
            <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full animate-progress rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[10.5px] text-emerald-300/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
              Ready to publish
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================== 2. PROBLEM / SOLUTION =================== */
function ProblemSolution() {
  const problems = [
    {
      icon: <DollarSign size={18} />,
      title: "Photoshoots cost too much",
      text: "Studio, models, photographers, styling, and editing make every launch expensive.",
    },
    {
      icon: <Rocket size={18} />,
      title: "Product visuals take too long",
      text: "New clothing drops need fast content for ecommerce, ads, social, and catalogs.",
    },
    {
      icon: <Eye size={18} />,
      title: "Shoppers want more confidence",
      text: "Customers want to see how clothes look before they buy.",
    },
  ];

  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="The challenge"
          lines={["Traditional Product Shoots", "Slow Fashion Brands Down"]}
          accentIndices={[1]}
          sub="Every new collection needs clean visuals, model shots, campaign content, and store-ready product images. TryVerse helps create them faster with AI."
        />

        <div className="mt-14 grid gap-px bg-white/[0.06] rounded-[2rem] overflow-hidden sm:grid-cols-3">
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
          className="mt-12 mx-auto max-w-3xl text-center soft-card p-7 sm:p-9 relative overflow-hidden"
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
    text: "Create realistic model photos from clothing product images with different angles, lighting, and backgrounds.",
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
    text: "Turn clothing visuals into short showcase videos for Reels, TikTok, ads, and product pages.",
  },
  {
    icon: <Code2 size={18} />,
    title: "Brand Widget",
    text: "Add virtual try-on to your ecommerce store so shoppers can see clothes on themselves.",
  },
  {
    icon: <LayoutGrid size={18} />,
    title: "Stores",
    text: "Manage clothing catalogs, product images, store settings, and brand assets.",
  },
  {
    icon: <BarChart3 size={18} />,
    title: "Analytics",
    text: "Track engagement, try-on usage, product interest, conversions, and shopper behavior.",
  },
];

function BrandToolsGrid() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="The toolkit"
          lines={["One AI Studio For", "Clothing Brands"]}
          accentIndices={[1]}
          sub="Every tool your team needs to plan, produce, and publish clothing visuals — built specifically for apparel."
        />

        <div className="mt-14 grid gap-px bg-white/[0.06] rounded-[2rem] overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
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

/* =================== 4. BRAND STUDIO DEMO =================== */
function BrandStudioDemo() {
  const styles = ["Studio", "Editorial", "Catalog", "Social"];
  const [styleIdx, setStyleIdx] = useState(0);
  const steps = [
    "Reading garment",
    "Building model pose",
    "Preserving fabric details",
    "Final image ready",
  ];
  const [stepIdx, setStepIdx] = useState(0);
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
        setStyleIdx((s) => (s + 1) % styles.length);
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
  }, [steps.length, styles.length]);

  return (
    <section id="demo" className="relative py-28 sm:py-36">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute right-[-200px] top-1/3 h-[600px] w-[600px] rounded-full opacity-50"
          style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
        />
      </div>

      <div ref={rootRef} className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="eyebrow">Live demo</div>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
              <RevealLines lines={["See Brand Studio", "In Action"]} accentIndices={[1]} step={120} />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed">
            Upload a clothing product photo and generate brand-ready content in seconds — fabric,
            color, and fit preserved.
          </p>
        </div>

        <div className="relative rounded-[2.25rem] border border-white/[0.08] bg-gradient-to-b from-[#0e0c16] to-[#08070d] p-4 sm:p-6 lg:p-8">
          <div className="grid gap-5 lg:gap-6 lg:grid-cols-[1.15fr_1fr]">
            {/* LEFT — before/after */}
            <div>
              <BeforeAfter
                before={blazerBefore}
                after={blazerAfter}
                beforeLabel="Before"
                afterLabel="AI Photoshoot Result"
                className="aspect-[4/5]"
              />
            </div>

            {/* RIGHT — workflow panel */}
            <div className="rounded-[2rem] border border-white/[0.08] bg-[#0c0a14] p-5 sm:p-6 flex flex-col gap-5">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
                  Uploaded product
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5">
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-[#f3eee8] shrink-0">
                    <img
                      src={clothingBlazer}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium truncate">Lavender Oversized Blazer</div>
                    <div className="text-[11px] text-white/50">Apparel · Outerwear · 1 image</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
                  Output
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-violet/40 bg-gradient-to-br from-violet/15 to-magenta/10 px-3 py-2 text-[12.5px]">
                  <Camera size={13} /> AI Photoshoot
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2 flex items-center gap-1.5">
                  <Sliders size={11} /> Style
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {styles.map((s, i) => (
                    <span
                      key={s}
                      className={`px-3 py-1.5 rounded-full text-[11.5px] border transition-all ${
                        i === styleIdx
                          ? "border-violet/50 bg-gradient-to-br from-violet/25 to-magenta/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.08)]"
                          : "border-white/10 bg-white/[0.02] text-white/60"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
                  Prompt
                </div>
                <div className="rounded-xl border border-white/[0.06] bg-black/30 p-3 text-[12.5px] text-white/75 leading-relaxed">
                  “Create a clean ecommerce model photo while preserving fabric color, texture,
                  fit, and garment details.”
                </div>
              </div>

              <button className="btn-primary !py-3 !text-sm animate-glow-pulse">
                <Wand2 size={14} /> Generate
              </button>

              <div className="space-y-2 pt-1">
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
                          done
                            ? "text-white/80"
                            : active
                              ? "text-white"
                              : "text-white/45"
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

/* =================== 5. HOW IT WORKS =================== */
function HowItWorks() {
  const steps = [
    {
      icon: <Upload size={16} />,
      title: "Upload",
      text: "Add a flat-lay, mannequin, fabric, or product photo.",
    },
    {
      icon: <Sliders size={16} />,
      title: "Choose",
      text: "Pick a tool: Photoshoot, Ghost Mannequin, Pose Studio, Video, or Widget.",
    },
    {
      icon: <Wand2 size={16} />,
      title: "Generate",
      text: "TryVerse creates polished clothing visuals while preserving product details.",
    },
    {
      icon: <Rocket size={16} />,
      title: "Publish",
      text: "Use visuals on your store, ads, catalogs, social, or product pages.",
    },
  ];
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Workflow"
          lines={["From Product Photo", "To Published Visual"]}
          accentIndices={[1]}
        />

        <div className="mt-14 relative">
          {/* desktop timeline line */}
          <div
            aria-hidden
            className="hidden md:block absolute left-0 right-0 top-[34px] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(168,85,247,0.6) 15%, rgba(217,70,239,0.6) 85%, transparent)",
            }}
          />
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 110}
                className="relative soft-card p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-[#0a0810] border border-violet/40 text-white shadow-[0_10px_30px_-12px_rgba(168,85,247,0.6)]">
                    <span className="absolute -inset-1 rounded-full border border-violet/20" />
                    {s.icon}
                    <span className="absolute -top-1 -right-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gradient-to-br from-violet to-magenta">
                      {i + 1}
                    </span>
                  </span>
                </div>
                <h4 className="font-display mt-5 text-xl leading-tight">{s.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== 6. USE CASES =================== */
function UseCases() {
  const cases = [
    { icon: <ShoppingBag size={16} />, label: "Ecommerce product pages" },
    { icon: <ImageIcon size={16} />, label: "Catalog photoshoots" },
    { icon: <Sparkles size={16} />, label: "Social media campaigns" },
    { icon: <Rocket size={16} />, label: "New collection launches" },
    { icon: <Store size={16} />, label: "Boutique product listings" },
    { icon: <LayoutGrid size={16} />, label: "Marketplace sellers" },
    { icon: <Video size={16} />, label: "Brand ads" },
    { icon: <Shirt size={16} />, label: "Virtual try-on experiences" },
  ];
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Use cases"
          lines={["Built For Every", "Clothing Workflow"]}
          accentIndices={[1]}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, i) => (
            <Reveal
              key={c.label}
              delay={i * 60}
              className="soft-card p-5 flex items-center gap-3 hover:border-violet/30 transition-colors"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/10 text-white">
                {c.icon}
              </span>
              <span className="text-[14px] font-medium text-white/85">{c.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== 7. BUSINESS BENEFITS =================== */
function BusinessBenefits() {
  const items = [
    {
      icon: <DollarSign size={18} />,
      title: "Reduce photoshoot cost",
      text: "Create visuals without booking a full studio team.",
    },
    {
      icon: <Rocket size={18} />,
      title: "Launch products faster",
      text: "Generate content for new clothing drops in minutes.",
    },
    {
      icon: <Palette size={18} />,
      title: "Improve product presentation",
      text: "Show apparel in model, mannequin, catalog, and campaign formats.",
    },
    {
      icon: <Eye size={18} />,
      title: "Increase shopper confidence",
      text: "Let customers see clothing on themselves before buying.",
    },
  ];
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Why brands choose TryVerse"
          lines={["Launch Faster. Spend Less.", "Sell With Better Visuals."]}
          accentIndices={[1]}
        />

        <div className="mt-14 grid gap-px bg-white/[0.06] rounded-[2rem] overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal
              key={it.title}
              delay={i * 80}
              className="group p-7 sm:p-8 bg-background/95 hover:bg-white/[0.03] transition-all duration-300"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet/25 to-magenta/15 border border-violet/30 text-white shadow-[0_8px_24px_-10px_rgba(168,85,247,0.5)]">
                {it.icon}
              </span>
              <h4 className="font-display mt-6 text-xl leading-tight">{it.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== 8. BRAND WIDGET =================== */
function BrandWidget() {
  return (
    <section className="py-28 sm:py-36">
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
              <a href="#try" className="btn-primary !py-3 !px-6 !text-sm">
                Add TryVerse To Your Store <ArrowRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== 9. RESULTS GALLERY =================== */
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
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Gallery"
          lines={["Brand-Ready", "Clothing Visuals"]}
          accentIndices={[1]}
          sub="A glimpse of what brands ship with TryVerse — flat-lays turned into model photos, mannequins into ghost mannequin shots, and product images into campaign visuals."
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

/* =================== 10. FINAL CTA =================== */
function BrandFinalCTA() {
  return (
    <section id="try" className="relative overflow-hidden py-32 sm:py-44">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-60"
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
          <a href="#" className="btn-primary !py-3.5 !px-7 !text-sm">
            Start Creating <ArrowRight size={16} />
          </a>
          <a href="#" className="btn-secondary !py-3.5 !px-7 !text-sm">
            Book Brand Demo
          </a>
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
