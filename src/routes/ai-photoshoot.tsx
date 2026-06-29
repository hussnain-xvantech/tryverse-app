import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Upload,
  Sparkles,
  Check,
  Wand2,
  Shirt,
  Camera,
  Image as ImageIcon,
  Layers,
  Timer,
  DollarSign,
  Play,
  Palette,
  ShoppingBag,
  Megaphone,
  BookOpen,
  Share2,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

import clothingBlazer from "@/assets/clothing-blazer.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import garmentFlatlay from "@/assets/garment-flatlay.jpg";
import g1After from "@/assets/g1-after.jpg";
import g2Catalog from "@/assets/g2-catalog.jpg";
import editorialHero from "@/assets/editorial-hero.jpg";

export const Route = createFileRoute("/ai-photoshoot")({
  head: () => ({
    meta: [
      { title: "AI Photoshoot — Model Photos Without The Studio | TryVerse" },
      {
        name: "description",
        content:
          "Turn flat-lay clothing photos into clean, brand-ready model visuals for ecommerce, campaigns, catalogs, and social with TryVerse AI Photoshoot.",
      },
      { property: "og:title", content: "AI Photoshoot — TryVerse" },
      {
        property: "og:description",
        content:
          "Create professional model visuals from a single clothing product photo. Built for fashion brands.",
      },
    ],
  }),
  component: AiPhotoshootPage,
});

function AiPhotoshootPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Header />
      <main className="pt-24 sm:pt-28 overflow-x-hidden">
        <Hero />
        <HowItWorks />
        <WhyBrandsUseIt />
        <PreviewSection />
        <OutputTypes />
        <FinalCTA />
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

/* =================== HERO =================== */
function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20 lg:pb-24">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute left-1/2 top-[-240px] h-[800px] w-[1100px] -translate-x-1/2 rounded-full opacity-70"
          style={{ background: "var(--gradient-glow)", filter: "blur(30px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-2">
          <div className="order-2 lg:order-1 animate-fade-up">
            <HeroVisual />
          </div>

          <div className="order-1 lg:order-2 animate-fade-up">
            <div className="eyebrow flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-violet" />
              AI Photoshoot
            </div>
            <h1 className="font-display mt-6 text-[40px] sm:text-[48px] lg:text-[58px] leading-[1.05] text-balance">
              <RevealLines
                lines={["Create Model Photos", "Without The Studio"]}
                accentIndices={[1]}
                step={130}
              />
            </h1>
            <Reveal
              as="p"
              delay={420}
              className="mt-6 text-base sm:text-[17px] text-muted-foreground max-w-xl leading-relaxed"
            >
              Upload a clothing product photo and generate clean, brand-ready
              model visuals for ecommerce, campaigns, catalogs, and social
              content.
            </Reveal>
            <Reveal delay={560} className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
                Start Creating <ArrowRight size={16} />
              </Link>
              <Link to="/for-brands" className="btn-secondary !py-3.5 !px-7 !text-sm">
                For Brands
              </Link>
            </Reveal>
            <Reveal as="p" delay={680} className="mt-5 text-[12.5px] text-white/55">
              No studio needed · Clothing-only AI · Store-ready visuals
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const DEMO_VIDEO_ID = "ScMzIvxBSi4";

function HeroVisual() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div
        aria-hidden
        className="absolute -inset-10 -z-10 opacity-80"
        style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
      />

      <div className="relative rounded-2xl overflow-hidden ring-1 ring-violet/40 shadow-[0_40px_100px_-25px_rgba(168,85,247,0.5)] bg-[#1a1424]">
        <div className="relative aspect-video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="TryVerse AI Photoshoot Demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play AI Photoshoot demo video"
              className="group absolute inset-0 h-full w-full"
            >
              <img
                src={blazerAfter}
                alt="AI Photoshoot demo preview"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
                decoding="async"
                width={1280}
                height={720}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40"
              />
              <span className="absolute top-3 left-3 chip backdrop-blur bg-black/60 text-white !text-[10px] border border-white/10">
                <Camera size={10} /> AI Photoshoot Demo
              </span>
              <span className="absolute bottom-3 left-3 text-[11px] text-white/85">
                Watch Demo
              </span>
              <span className="absolute inset-0 grid place-items-center">
                <span className="relative grid h-16 w-16 sm:h-20 sm:w-20 place-items-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-violet to-magenta opacity-80"
                  />
                  <Play size={26} className="relative text-white translate-x-[2px] fill-white" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Story strip: product → style → model result */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <StoryTile img={clothingBlazer} label="Product" icon={<Shirt size={10} />} />
        <StoryTile img={garmentFlatlay} label="Flat-Lay" icon={<ImageIcon size={10} />} />
        <StoryTile img={blazerAfter} label="Model Result" icon={<Sparkles size={10} />} accent />
      </div>
    </div>
  );
}

function StoryTile({
  img,
  label,
  icon,
  accent = false,
}: {
  img: string;
  label: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[4/5] rounded-xl overflow-hidden bg-[#1a1424] ${
        accent ? "ring-1 ring-violet/50" : "ring-1 ring-white/[0.08]"
      }`}
    >
      <img
        src={img}
        alt={label}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <span className="absolute top-1.5 left-1.5 chip backdrop-blur bg-black/55 text-white !text-[9.5px]">
        {icon} {label}
      </span>
    </div>
  );
}

/* =================== HOW IT WORKS =================== */
function HowItWorks() {
  const steps = [
    {
      icon: <Upload size={18} />,
      title: "Upload clothing photo",
      copy: "Add a flat-lay, mannequin, or product image.",
    },
    {
      icon: <Palette size={18} />,
      title: "Choose a style",
      copy: "Pick a studio, catalog, editorial, or social look.",
    },
    {
      icon: <Wand2 size={18} />,
      title: "Generate model visuals",
      copy: "Create professional clothing photos while preserving garment details.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">How it works</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["From Product Photo", "To Photoshoot Result"]}
              accentIndices={[1]}
              step={120}
            />
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.title}
              delay={120 + i * 100}
              className="group relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#14111d] to-[#0c0a14] p-6 hover:border-violet/40 transition-colors"
            >
              <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet to-magenta shadow-[0_10px_30px_-10px_rgba(168,85,247,0.7)] text-white">
                {s.icon}
              </div>
              <div className="mt-5 text-[11px] uppercase tracking-[0.18em] text-white/45">
                Step {i + 1}
              </div>
              <h3 className="mt-1.5 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== WHY BRANDS USE IT =================== */
function WhyBrandsUseIt() {
  const points = [
    {
      icon: <DollarSign size={16} />,
      title: "Reduce photoshoot costs",
      copy: "Create visuals without booking a full studio team.",
    },
    {
      icon: <Timer size={16} />,
      title: "Launch products faster",
      copy: "Generate content for new clothing drops in minutes.",
    },
    {
      icon: <Layers size={16} />,
      title: "Preserve product details",
      copy: "Keep fabric color, texture, fit, and garment shape clear.",
    },
    {
      icon: <Share2 size={16} />,
      title: "Create for every channel",
      copy: "Use outputs for ecommerce, ads, catalogs, and social media.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">Why brands use it</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["Launch Better", "Visuals Faster"]}
              accentIndices={[1]}
              step={120}
            />
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <Reveal
              key={p.title}
              delay={100 + i * 80}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:border-violet/40 transition-colors"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet/15 text-violet ring-1 ring-violet/30">
                {p.icon}
              </div>
              <h3 className="mt-4 font-display text-lg leading-snug">{p.title}</h3>
              <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
                {p.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== PREVIEW =================== */
const STYLES = ["Studio", "Editorial", "Catalog", "Social"] as const;

function PreviewSection() {
  const [active, setActive] = useState<(typeof STYLES)[number]>("Studio");
  const steps = ["Upload", "Style selected", "Generate", "Ready"];
  const variations = [blazerAfter, editorialHero, g2Catalog, g1After];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">Feature preview</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["A Closer Look", "At Brand Studio"]}
              accentIndices={[1]}
              step={120}
            />
          </h2>
        </div>

        <Reveal delay={200} className="mt-12">
          <div className="relative rounded-[2rem] border border-white/[0.1] bg-gradient-to-b from-[#14111d] to-[#0a0810] p-5 sm:p-7 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.95)] overflow-hidden">
            <div
              aria-hidden
              className="absolute -inset-x-20 -top-32 h-72 opacity-50 pointer-events-none"
              style={{ background: "var(--gradient-glow)", filter: "blur(50px)" }}
            />

            {/* Style selector */}
            <div className="relative flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/45 mr-1">
                Style
              </span>
              {STYLES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActive(s)}
                  className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
                    active === s
                      ? "border-violet/60 bg-violet/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.12)]"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] text-emerald-300/90">
                <Check size={10} /> {active} ready
              </span>
            </div>

            {/* Grid */}
            <div className="relative mt-4 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <PreviewCard
                label="Product"
                img={clothingBlazer}
                chip="Uploaded"
                chipIcon={<Upload size={10} />}
              />
              <PreviewCard
                label="Flat-Lay"
                img={garmentFlatlay}
                chip="Detected"
                chipIcon={<Shirt size={10} />}
              />
              <div className="col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-violet/50 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.55)] bg-[#1a1424]">
                <img
                  src={blazerAfter}
                  alt="AI Photoshoot result"
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-2 left-2 chip backdrop-blur bg-black/55 text-white !text-[10px]">
                  <Sparkles size={10} /> Photoshoot Result · {active}
                </span>
                <div
                  aria-hidden
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent animate-scan"
                  style={{ top: "50%" }}
                />
              </div>
            </div>

            {/* Variation thumbs */}
            <div className="relative mt-4 grid grid-cols-4 gap-3">
              {variations.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden ring-1 ring-white/[0.06] bg-[#1a1424]"
                >
                  <img
                    src={img}
                    alt={`Variation ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            {/* Progress row */}
            <div className="relative mt-5 rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3">
              <div className="flex flex-wrap items-center gap-3">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold bg-gradient-to-br from-violet to-magenta text-white shadow-[0_0_0_3px_rgba(168,85,247,0.15)]">
                      <Check size={10} />
                    </span>
                    <span className="text-[12px] text-white/85">{s}</span>
                    {i < steps.length - 1 && (
                      <span className="mx-1 hidden sm:block h-px w-10 bg-gradient-to-r from-violet to-magenta" />
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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PreviewCard({
  label,
  img,
  chip,
  chipIcon,
}: {
  label: string;
  img: string;
  chip: string;
  chipIcon: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-white/45 mb-2">{label}</div>
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-white/[0.06] bg-[#1a1424]">
        <img src={img} alt={label} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        <span className="absolute top-1.5 left-1.5 chip backdrop-blur bg-black/55 text-white !text-[9.5px]">
          {chipIcon} {chip}
        </span>
      </div>
    </div>
  );
}

/* =================== OUTPUT TYPES =================== */
function OutputTypes() {
  const outputs = [
    {
      icon: <ShoppingBag size={16} />,
      title: "Ecommerce Product Photos",
      copy: "Clean model visuals for product pages.",
    },
    {
      icon: <Megaphone size={16} />,
      title: "Campaign Looks",
      copy: "Polished fashion images for launches and ads.",
    },
    {
      icon: <BookOpen size={16} />,
      title: "Catalog Shots",
      copy: "Consistent visuals for collections.",
    },
    {
      icon: <Share2 size={16} />,
      title: "Social Content",
      copy: "Fashion visuals for Reels, TikTok, and posts.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">Output types</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["Create Visuals For", "Every Fashion Workflow"]}
              accentIndices={[1]}
              step={120}
            />
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outputs.map((o, i) => (
            <Reveal
              key={o.title}
              delay={100 + i * 80}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:border-violet/40 transition-colors"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-violet/15 text-violet ring-1 ring-violet/30">
                {o.icon}
              </div>
              <h3 className="mt-4 font-display text-lg leading-snug">{o.title}</h3>
              <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
                {o.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== FINAL CTA =================== */
function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-10 text-center">
        <div className="eyebrow justify-center">Get started</div>
        <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
          <RevealLines
            lines={["Ready To Create Your", "First AI Photoshoot?"]}
            accentIndices={[1]}
            step={120}
          />
        </h2>
        <Reveal as="p" delay={280} className="mt-5 text-base text-muted-foreground">
          Turn one clothing product photo into professional model visuals with TryVerse.
        </Reveal>
        <Reveal delay={420} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
            Start Creating <ArrowRight size={16} />
          </Link>
          <Link to="/for-brands" className="btn-secondary !py-3.5 !px-7 !text-sm">
            Book Brand Demo
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
