import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Link as LinkIcon,
  Upload,
  Wand2,
  Check,
  ShoppingBag,
  Shirt,
  Camera,
  Move3d,
  Video,
  MessageCircle,
  Send,
  Store,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";

import editorialHero from "@/assets/editorial-hero.jpg";
import heroResult from "@/assets/hero-result.jpg";
import userPhoto from "@/assets/user-photo.jpg";
import userReference from "@/assets/user-reference.jpg";
import clothingBlazer from "@/assets/clothing-blazer.jpg";
import blazerBefore from "@/assets/blazer-before.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import g1a from "@/assets/g1-after.jpg";
import g1b from "@/assets/g1-before.jpg";
import g2a from "@/assets/g2-after.jpg";
import g2b from "@/assets/g2-before.jpg";
import g2c from "@/assets/g2-catalog.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g6a from "@/assets/g6-after.jpg";
import ctaResult from "@/assets/cta-result.jpg";

export const Route = createFileRoute("/for-shoppers")({
  head: () => ({
    meta: [
      { title: "For Shoppers — Try Clothes On Before You Buy | TryVerse" },
      {
        name: "description",
        content:
          "Paste a clothing product link, upload your photo, and instantly see how the outfit looks on you. Try outfits before buying with TryVerse.",
      },
      { property: "og:title", content: "For Shoppers — TryVerse Virtual Try-On" },
      {
        property: "og:description",
        content:
          "Virtual try-on for clothing. Paste a product link, upload your photo, and shop with confidence.",
      },
    ],
  }),
  component: ShoppersPage,
});

function ShoppersPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Header />
      <main className="pt-24 sm:pt-28 overflow-x-hidden">
        <ShopperHero />
        <HowItWorks />
        <ShopperFeatures />
        <LiveTryOnDemo />
        <StyloSection />
        <SupportedStores />
        <ShopperGallery />
        <FinalCTA />
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
        <Reveal as="p" delay={280} className={`mt-5 text-base text-muted-foreground leading-relaxed ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {sub}
        </Reveal>
      )}
    </div>
  );
}

/* =================== 1. HERO =================== */
function ShopperHero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20 lg:pb-24">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute left-1/2 top-[-260px] h-[900px] w-[1200px] -translate-x-1/2 rounded-full opacity-70"
          style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="animate-fade-up">
            <div className="eyebrow flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-violet" />
              For Shoppers
            </div>
            <h1 className="font-display mt-6 text-[40px] sm:text-[48px] lg:text-[58px] leading-[1.05] text-balance">
              <RevealLines
                lines={["Try Clothes On", "Before You Buy"]}
                accentIndices={[1]}
                step={130}
              />
            </h1>

            <Reveal
              as="p"
              delay={440}
              className="mt-6 text-base sm:text-[17px] text-muted-foreground max-w-xl leading-relaxed"
            >
              Paste a clothing product link, upload your photo, and instantly see how the
              outfit looks on you with TryVerse.
            </Reveal>

            <Reveal delay={580} className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
                Try It Free <ArrowRight size={16} />
              </Link>
              <Link to="/stores" className="btn-secondary !py-3.5 !px-7 !text-sm">
                Explore Stores
              </Link>
            </Reveal>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Virtual Try-On", "AI Stylist", "Pose Studio", "Showcase Video"].map(
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

          <div className="lg:pl-4 w-full max-w-[440px] mx-auto lg:max-w-[460px] lg:ml-auto lg:mr-0">
            <ShopperAppMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShopperAppMockup() {
  const steps = ["Link detected", "Photo uploaded", "Outfit matched", "Try-on ready"];
  const tabs = [
    { label: "Virtual Try-On", icon: <Shirt size={11} /> },
    { label: "Stylo Stylist", icon: <MessageCircle size={11} /> },
    { label: "Pose Studio", icon: <Move3d size={11} /> },
    { label: "Showcase Video", icon: <Video size={11} /> },
  ];

  return (
    <div className="relative animate-fade-up [animation-delay:120ms]">
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 opacity-90"
        style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
      />

      <div className="relative rounded-[2rem] border border-white/[0.1] bg-gradient-to-b from-[#14111d] to-[#0a0810] shadow-[0_50px_140px_-40px_rgba(0,0,0,0.95)] overflow-hidden ring-1 ring-violet/15">
        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet to-magenta shadow-[0_6px_20px_-6px_rgba(168,85,247,0.7)]">
              <Sparkles size={13} />
            </span>
            <span className="text-[13px] font-semibold tracking-tight">TryVerse App</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-300/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
            Ready
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </div>
        </div>

        {/* TABS */}
        <div className="flex items-center gap-1.5 px-4 sm:px-5 pt-3.5 overflow-x-auto">
          {tabs.map((t, i) => (
            <span
              key={t.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] whitespace-nowrap ${
                i === 0
                  ? "bg-gradient-to-br from-violet/30 to-magenta/15 border border-violet/45 text-white"
                  : "bg-white/[0.03] border border-white/[0.06] text-white/55"
              }`}
            >
              {t.icon}
              {t.label}
            </span>
          ))}
        </div>

        {/* PRODUCT URL INPUT */}
        <div className="px-4 sm:px-5 pt-3">
          <div className="flex items-center gap-2 rounded-xl border border-violet/35 bg-white/[0.03] px-3 py-2.5 shadow-[0_0_0_3px_rgba(168,85,247,0.08)]">
            <LinkIcon size={13} className="text-violet" />
            <span className="text-[11.5px] text-white/80 truncate">
              nordstrom.com/s/lavender-blazer
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-emerald-300/90">
              <Check size={10} /> Detected
            </span>
          </div>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-12 gap-3 sm:gap-4 p-4 sm:p-5">
          {/* Shopper photo */}
          <div className="col-span-4 animate-fade-up">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">
              Your Photo
            </div>
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/[0.06] bg-[#f3eee8]">
              <img
                src={userPhoto}
                alt="Shopper photo"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <span className="absolute top-1.5 left-1.5 chip backdrop-blur bg-black/55 text-white !text-[9.5px]">
                <Upload size={10} /> Uploaded
              </span>
            </div>
            {/* Clothing item */}
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1.5">
              <div className="h-9 w-9 rounded-md overflow-hidden bg-white/5">
                <img src={clothingBlazer} alt="Selected item" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="text-[10.5px] text-white/85 truncate">Lavender Blazer</div>
                <div className="text-[9.5px] text-white/45">Selected item</div>
              </div>
            </div>
          </div>

          {/* Try-on result */}
          <div className="col-span-8 animate-fade-up [animation-delay:160ms]">
            <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2 flex items-center justify-between">
              <span>Try-On Result</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-violet">
                <Wand2 size={10} /> Generated
              </span>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-violet/50 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.55)] bg-[#f3eee8]">
              <img
                src={heroResult}
                alt="Try-on result"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <span className="absolute top-1.5 left-1.5 chip backdrop-blur bg-black/55 text-white !text-[9.5px]">
                <Sparkles size={10} /> On You
              </span>
              <div
                aria-hidden
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent animate-scan"
                style={{ top: "50%" }}
              />
            </div>
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

/* =================== 2. HOW IT WORKS =================== */
function HowItWorks() {
  const steps = [
    {
      icon: <LinkIcon size={18} />,
      title: "Paste a product link",
      text: "Choose clothing from any supported fashion store.",
    },
    {
      icon: <Upload size={18} />,
      title: "Upload your photo",
      text: "Use a clear photo so TryVerse can create your try-on result.",
    },
    {
      icon: <Sparkles size={18} />,
      title: "See the look",
      text: "View the outfit on you before buying.",
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="How it works"
          lines={["Try Any Outfit", "In Seconds"]}
          accentIndices={[1]}
          sub="Three simple steps — no styling skills, no studio, no waiting."
          align="center"
        />

        <div className="relative mt-14 grid gap-5 sm:grid-cols-3">
          <div
            aria-hidden
            className="hidden sm:block absolute top-[42px] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent"
          />
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 120}
              className="relative rounded-2xl p-7 sm:p-8 bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/[0.09] hover:border-violet/35 transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet/25 to-magenta/15 border border-violet/30 text-white shadow-[0_10px_30px_-10px_rgba(168,85,247,0.55)]">
                <span aria-hidden className="absolute -inset-2 rounded-2xl bg-violet/25 blur-xl opacity-70 -z-10" />
                {s.icon}
              </span>
              <div className="mt-4 text-[11px] uppercase tracking-[0.18em] text-violet/80">
                Step {i + 1}
              </div>
              <h4 className="font-display mt-2 text-xl leading-tight">{s.title}</h4>
              <p className="mt-3 text-[14.5px] text-muted-foreground leading-[1.7]">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== 3. SHOPPER FEATURES =================== */
function ShopperFeatures() {
  const features = [
    {
      icon: <ShoppingBag size={18} />,
      title: "AI Fashion Store",
      text: "Browse curated clothing and try items on your photo.",
      image: g3a,
    },
    {
      icon: <Shirt size={18} />,
      title: "Virtual Try-On",
      text: "See how clothing looks on you before checkout.",
      image: blazerAfter,
    },
    {
      icon: <MessageCircle size={18} />,
      title: "Stylo AI Stylist",
      text: "Get outfit advice, color ideas, and styling suggestions.",
      image: g1a,
    },
    {
      icon: <Camera size={18} />,
      title: "Pose Studio",
      text: "Turn selfies into clean fashion poses.",
      image: g4a,
    },
    {
      icon: <Video size={18} />,
      title: "Showcase Video",
      text: "Create short outfit videos for Reels, TikTok, or social sharing.",
      image: g5a,
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Shopper features"
          lines={["Everything You Need", "To Shop Smarter"]}
          accentIndices={[1]}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 80}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.015] border border-white/[0.09] hover:border-violet/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgba(168,85,247,0.55)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f3eee8]">
                <img
                  src={f.image}
                  alt={f.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0810]/85 via-[#0a0810]/10 to-transparent" />
                <span className="absolute top-3 left-3 grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet/35 to-magenta/20 border border-violet/40 text-white backdrop-blur-sm">
                  {f.icon}
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-display text-xl leading-tight">{f.title}</h4>
                <p className="mt-2 text-[14.5px] text-muted-foreground leading-[1.7]">
                  {f.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== 4. LIVE TRY-ON DEMO =================== */
function LiveTryOnDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Reading outfit",
    "Matching body pose",
    "Preserving fabric details",
    "Try-on ready",
  ];
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(() => {
            setActiveStep((s) => (s + 1) % (steps.length + 1));
          }, 1100);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [steps.length]);

  return (
    <section ref={rootRef} className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Live try-on"
          lines={["See Your Outfit", "Before Checkout"]}
          accentIndices={[1]}
          sub="TryVerse shows how clothing looks on you before you add it to cart."
        />

        <div className="mt-14 grid gap-8 lg:gap-12 lg:grid-cols-[1.15fr_1fr] items-stretch">
          {/* Before/After */}
          <Reveal className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 opacity-70"
              style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
            />
            <BeforeAfter
              before={blazerBefore}
              after={blazerAfter}
              beforeLabel="Before"
              afterLabel="Try-On Result"
              className="aspect-[4/5] ring-1 ring-white/[0.08] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
            />
          </Reveal>

          {/* Workflow panel */}
          <Reveal delay={120} className="rounded-[2rem] border border-white/[0.1] bg-gradient-to-b from-[#14111d] to-[#0a0810] p-5 sm:p-7 ring-1 ring-violet/10">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/45 mb-3">
              Workflow
            </div>

            {/* Detected link */}
            <div className="flex items-center gap-2 rounded-xl border border-violet/35 bg-white/[0.03] px-3 py-2.5">
              <LinkIcon size={13} className="text-violet" />
              <span className="text-[12px] text-white/80 truncate">
                Product link detected
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] text-emerald-300/90">
                <Check size={10} /> OK
              </span>
            </div>

            {/* Photo + item */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#f3eee8]">
                  <img src={userReference} alt="Your photo" className="h-full w-full object-cover" />
                </div>
                <div className="mt-1.5 text-[10.5px] text-white/70 px-0.5">Your photo</div>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#f3eee8]">
                  <img src={clothingBlazer} alt="Selected clothing" className="h-full w-full object-cover" />
                </div>
                <div className="mt-1.5 text-[10.5px] text-white/70 px-0.5">Selected item</div>
              </div>
            </div>

            {/* Feature pill */}
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] bg-gradient-to-br from-violet/30 to-magenta/15 border border-violet/45">
              <Shirt size={11} /> Virtual Try-On
            </div>

            {/* Prompt */}
            <div className="mt-3 rounded-xl border border-white/[0.06] bg-black/30 p-3.5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1.5">
                Prompt
              </div>
              <p className="text-[13px] leading-relaxed text-white/80">
                Apply this outfit to my photo while preserving fabric color, fit, and details.
              </p>
            </div>

            {/* Generate button */}
            <button
              type="button"
              className="btn-primary mt-4 w-full !py-3 !text-[13px] animate-glow-pulse"
              aria-label="Generate try-on"
            >
              <Wand2 size={14} /> Generate
            </button>

            {/* Progress steps */}
            <div className="mt-4 space-y-2">
              {steps.map((s, i) => {
                const done = i < activeStep;
                const active = i === activeStep;
                return (
                  <div
                    key={s}
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-[12px] transition-all duration-300 ${
                      done || active
                        ? "border-violet/40 bg-gradient-to-br from-violet/15 to-magenta/10 text-white"
                        : "border-white/[0.06] bg-white/[0.02] text-white/55"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${
                        done
                          ? "bg-gradient-to-br from-violet to-magenta text-white"
                          : active
                            ? "bg-violet/30 text-white animate-glow-pulse"
                            : "bg-white/[0.05] text-white/45"
                      }`}
                    >
                      {done ? <Check size={10} /> : i + 1}
                    </span>
                    {s}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =================== 5. STYLO AI STYLIST =================== */
function StyloSection() {
  const messages = [
    { from: "user", text: "What should I wear with this lavender blazer?" },
    {
      from: "stylo",
      text:
        "Try cream trousers for a clean look, or denim for a casual outfit. Want to see both?",
    },
    { from: "user", text: "Show me the casual option." },
    { from: "stylo", text: "Here's a relaxed look you can try on." },
  ];

  const outfits = [
    { label: "Casual look", image: g1a, tag: "Suggested" },
    { label: "Clean formal look", image: g6a, tag: "Curated" },
    { label: "Weekend look", image: g2a, tag: "Trending" },
  ];

  const [shown, setShown] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setInterval(() => {
            setShown((s) => (s >= messages.length ? 1 : s + 1));
          }, 900);
        } else if (!entry.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [messages.length]);

  return (
    <section ref={rootRef} className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Stylo AI stylist"
          lines={["Meet Stylo, Your", "AI Fashion Stylist"]}
          accentIndices={[1]}
          sub="Ask for outfit ideas, styling tips, color suggestions, and what to try next."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.05fr] items-stretch">
          {/* Chat panel */}
          <Reveal className="rounded-[2rem] border border-white/[0.1] bg-gradient-to-b from-[#14111d] to-[#0a0810] p-5 sm:p-6 ring-1 ring-violet/10 flex flex-col">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet to-magenta">
                <Sparkles size={15} />
              </span>
              <div>
                <div className="text-[14px] font-semibold">Stylo</div>
                <div className="text-[11px] text-white/55 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
                  Online
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3 py-5 min-h-[280px]">
              {messages.slice(0, shown).map((m, i) => (
                <div
                  key={i}
                  className={`flex animate-fade-up ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
                      m.from === "user"
                        ? "bg-gradient-to-br from-violet to-magenta text-white rounded-tr-md"
                        : "bg-white/[0.05] border border-white/[0.06] text-white/85 rounded-tl-md"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {shown < messages.length && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.05] border border-white/[0.06] rounded-2xl rounded-tl-md px-4 py-2.5 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet animate-glow-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-violet animate-glow-pulse [animation-delay:200ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-violet animate-glow-pulse [animation-delay:400ms]" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
              <input
                type="text"
                disabled
                placeholder="Ask Stylo for an outfit…"
                className="flex-1 bg-transparent text-[13px] text-white/70 placeholder-white/35 outline-none"
              />
              <button
                type="button"
                className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-magenta"
                aria-label="Send"
              >
                <Send size={13} />
              </button>
            </div>
          </Reveal>

          {/* Outfit suggestions */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:grid-rows-3">
            {outfits.map((o, i) => (
              <Reveal
                key={o.label}
                delay={200 + i * 120}
                className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] hover:border-violet/40 transition-all duration-300 ${
                  i === 0 ? "shadow-[0_24px_60px_-30px_rgba(168,85,247,0.55)] border-violet/35" : ""
                }`}
              >
                <div className="grid sm:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] items-stretch">
                  <div className="relative aspect-[3/4] sm:aspect-auto overflow-hidden bg-[#f3eee8]">
                    <img
                      src={o.image}
                      alt={o.label}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-5 flex flex-col justify-center">
                    <div className="text-[10.5px] uppercase tracking-[0.18em] text-violet/80">
                      {o.tag}
                    </div>
                    <h4 className="font-display mt-1.5 text-lg leading-tight">{o.label}</h4>
                    <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      Tap to try this look on your photo.
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== 6. SUPPORTED STORES =================== */
function SupportedStores() {
  const stores = [
    "Nordstrom",
    "Macy's",
    "Bloomingdale's",
    "Saks Fifth Avenue",
    "Revolve",
    "Urban Outfitters",
    "Anthropologie",
    "Free People",
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Supported stores"
          lines={["Try Outfits From", "Your Favorite Stores"]}
          accentIndices={[1]}
          sub="Discover clothing from supported fashion stores and see how it looks on you before buying."
          align="center"
        />

        <Reveal delay={120} className="mx-auto mt-10 max-w-2xl">
          <div className="flex items-center gap-2 rounded-2xl border border-violet/35 bg-white/[0.03] px-4 py-3 shadow-[0_0_0_4px_rgba(168,85,247,0.08)] hover:border-violet/55 transition-colors">
            <LinkIcon size={15} className="text-violet shrink-0" />
            <input
              type="text"
              disabled
              placeholder="Paste any clothing product link…"
              className="flex-1 bg-transparent text-[13.5px] text-white/80 placeholder-white/40 outline-none min-w-0"
            />
            <button
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-violet to-magenta px-3.5 py-2 text-[12.5px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(168,85,247,0.7)]"
            >
              <Wand2 size={12} /> Try On
            </button>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {stores.map((s, i) => (
            <Reveal
              key={s}
              delay={i * 50}
              className="group relative flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] px-5 py-6 hover:border-violet/40 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-20px_rgba(168,85,247,0.5)] transition-all duration-300"
            >
              <Store size={14} className="text-violet/80" />
              <span className="font-display text-[15px] tracking-tight">{s}</span>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/stores" className="btn-secondary !py-3 !px-6 !text-sm">
            View Supported Stores <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =================== 7. GALLERY =================== */
function ShopperGallery() {
  const row1 = [
    { image: blazerAfter, tag: "Blazer Try-On" },
    { image: g1a, tag: "Dress Try-On" },
    { image: g3a, tag: "Hoodie Try-On" },
    { image: g4a, tag: "Shirt Try-On" },
    { image: g5a, tag: "Casual Outfit Try-On" },
  ];
  const row2 = [
    { image: g6a, tag: "Stylo Outfit Suggestion" },
    { image: g4a, tag: "Pose Studio Result" },
    { image: editorialHero, tag: "Showcase Video Frame" },
    { image: heroResult, tag: "Link → Try-On" },
    { image: g2a, tag: "Store Outfit Preview" },
  ];

  return (
    <section className="py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Shopper gallery"
          lines={["Looks You Can", "Try Before Buying"]}
          accentIndices={[1]}
          align="center"
        />
      </div>

      <div className="mt-12 space-y-4">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: { image: string; tag: string }[];
  direction?: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, var(--color-background), transparent)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(-90deg, var(--color-background), transparent)",
        }}
      />
      <div
        className="flex gap-4 animate-marquee"
        style={{
          width: "max-content",
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {doubled.map((it, i) => (
          <div
            key={i}
            className="relative h-[280px] w-[210px] sm:h-[320px] sm:w-[240px] flex-none overflow-hidden rounded-2xl border border-white/[0.08] bg-[#f3eee8]"
          >
            <img
              src={it.image}
              alt={it.tag}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/75 to-transparent">
              <span className="inline-flex items-center gap-1.5 text-[11.5px] text-white/95">
                <Sparkles size={11} className="text-violet" /> {it.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================== 8. FINAL CTA =================== */
function FinalCTA() {
  return (
    <section className="relative py-32 sm:py-44 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.45), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div className="mx-auto max-w-3xl text-center px-6 sm:px-10">
        <Reveal>
          <div className="eyebrow justify-center">Free to start</div>
        </Reveal>
        <h2 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
          <RevealLines
            lines={["Ready To See It", "On You?"]}
            accentIndices={[1]}
            step={130}
          />
        </h2>
        <Reveal as="p" delay={280} className="mx-auto mt-6 max-w-xl text-[15.5px] sm:text-[16.5px] text-muted-foreground leading-relaxed">
          Try outfits before buying and shop with more confidence using TryVerse.
        </Reveal>
        <Reveal delay={420} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/signup"
            className="btn-primary !py-[18px] !px-10 !text-[15px] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-18px_rgba(168,85,247,0.75)]"
          >
            Try It Free <ArrowRight size={16} />
          </Link>
          <Link
            to="/stores"
            className="btn-secondary !py-[18px] !px-10 !text-[15px] hover:-translate-y-0.5"
          >
            Explore Stores
          </Link>
        </Reveal>
        <Reveal delay={560} className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-white/70">
          {["No credit card", "Setup in minutes", "Clothing-only try-on"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <Check size={13} className="text-violet" /> {t}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
