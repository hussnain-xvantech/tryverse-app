import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Link as LinkIcon,
  Upload,
  Sparkles,
  Check,
  Wand2,
  Shirt,
  Eye,
  Timer,
  Layers,
  Play,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

import clothingBlazer from "@/assets/clothing-blazer.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import userPhoto from "@/assets/user-photo.jpg";
import heroResult from "@/assets/hero-result.jpg";

export const Route = createFileRoute("/virtual-try-on")({
  head: () => ({
    meta: [
      { title: "Virtual Try-On — Try Clothes On Before You Buy | TryVerse" },
      {
        name: "description",
        content:
          "Paste a clothing product link, upload your photo, and see how the outfit looks on you with TryVerse Virtual Try-On.",
      },
      { property: "og:title", content: "Virtual Try-On — TryVerse" },
      {
        property: "og:description",
        content:
          "See any outfit on yourself before you buy. AI virtual try-on for clothing, built for shoppers.",
      },
    ],
  }),
  component: VirtualTryOnPage,
});

function VirtualTryOnPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Header />
      <main className="pt-24 sm:pt-28 overflow-x-hidden">
        <Hero />
        <HowItWorks />
        <WhyItHelps />
        <PreviewSection />
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
          {/* LEFT VISUAL */}
          <div className="order-2 lg:order-1 animate-fade-up">
            <HeroVisual />
          </div>

          {/* RIGHT COPY */}
          <div className="order-1 lg:order-2 animate-fade-up">
            <div className="eyebrow flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-violet" />
              Virtual Try-On
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
              delay={420}
              className="mt-6 text-base sm:text-[17px] text-muted-foreground max-w-xl leading-relaxed"
            >
              Paste a clothing product link, upload your photo, and see how the
              outfit looks on you before checkout.
            </Reveal>
            <Reveal delay={560} className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
                Try It Free <ArrowRight size={16} />
              </Link>
              <Link to="/for-shoppers" className="btn-secondary !py-3.5 !px-7 !text-sm">
                Explore Shoppers
              </Link>
            </Reveal>
            <Reveal
              as="p"
              delay={680}
              className="mt-5 text-[12.5px] text-white/55"
            >
              No credit card required · Clothing-only try-on · Ready in seconds
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Replace with your real YouTube video ID when available */
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

      {/* Video preview card */}
      <div className="relative rounded-2xl overflow-hidden ring-1 ring-violet/40 shadow-[0_40px_100px_-25px_rgba(168,85,247,0.5)] bg-[#1a1424]">
        <div className="relative aspect-video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="TryVerse Virtual Try-On Demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play Virtual Try-On demo video"
              className="group absolute inset-0 h-full w-full"
            >
              <img
                src={blazerAfter}
                alt="Virtual Try-On demo preview"
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
                <Sparkles size={10} /> Virtual Try-On Demo
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
                  <Play
                    size={26}
                    className="relative text-white translate-x-[2px] fill-white"
                  />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Story strip: product → you → result */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <StoryTile img={clothingBlazer} label="Product" icon={<Shirt size={10} />} />
        <StoryTile img={userPhoto} label="Your Photo" icon={<Upload size={10} />} />
        <StoryTile img={blazerAfter} label="On You" icon={<Sparkles size={10} />} accent />
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
      icon: <LinkIcon size={18} />,
      title: "Paste a clothing link",
      copy: "Add a product URL from a supported fashion store.",
    },
    {
      icon: <Upload size={18} />,
      title: "Upload your photo",
      copy: "Use a clear photo so TryVerse can understand your pose and fit.",
    },
    {
      icon: <Wand2 size={18} />,
      title: "See the outfit on you",
      copy: "Get a realistic try-on preview before you decide to buy.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">How it works</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["From Product Link", "To Try-On Result"]}
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

/* =================== WHY IT HELPS =================== */
function WhyItHelps() {
  const points = [
    {
      icon: <Eye size={16} />,
      title: "See the outfit before checkout",
      copy: "Preview how the piece looks on you, not on a stranger.",
    },
    {
      icon: <Layers size={16} />,
      title: "Compare styles faster",
      copy: "Try multiple options side-by-side without changing rooms.",
    },
    {
      icon: <Check size={16} />,
      title: "Reduce fit & color guesswork",
      copy: "Get a clearer read on cut, drape, and tone before you buy.",
    },
    {
      icon: <Timer size={16} />,
      title: "Save time shopping online",
      copy: "Skip the order-and-return loop. Decide with one preview.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">Why it helps</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["Shop With", "More Confidence"]}
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
function PreviewSection() {
  const steps = ["Link detected", "Photo uploaded", "Outfit matched"];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">Feature preview</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["A Closer Look", "At The Studio"]}
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

            {/* URL bar */}
            <div className="relative flex items-center gap-2 rounded-xl border border-violet/35 bg-white/[0.03] px-3 py-2.5 shadow-[0_0_0_3px_rgba(168,85,247,0.08)]">
              <LinkIcon size={13} className="text-violet" />
              <span className="text-[12px] text-white/80 truncate">
                store.com/s/lavender-blazer
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] text-emerald-300/90">
                <Check size={10} /> Detected
              </span>
            </div>

            {/* Grid */}
            <div className="relative mt-4 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <PreviewCard label="Your Photo" img={userPhoto} chip="Uploaded" chipIcon={<Upload size={10} />} />
              <PreviewCard label="Garment" img={clothingBlazer} chip="Matched" chipIcon={<Shirt size={10} />} />
              <div className="col-span-2 relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-violet/50 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.55)] bg-[#1a1424]">
                <img
                  src={blazerAfter}
                  alt="Try-on result"
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute top-2 left-2 chip backdrop-blur bg-black/55 text-white !text-[10px]">
                  <Sparkles size={10} /> Try-On Result
                </span>
                <div
                  aria-hidden
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet to-transparent animate-scan"
                  style={{ top: "50%" }}
                />
              </div>
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

/* =================== FINAL CTA =================== */
function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-10 text-center">
        <div className="eyebrow justify-center">Get started</div>
        <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
          <RevealLines lines={["Ready To See", "It On You?"]} accentIndices={[1]} step={120} />
        </h2>
        <Reveal as="p" delay={280} className="mt-5 text-base text-muted-foreground">
          Try your next outfit with TryVerse before you buy.
        </Reveal>
        <Reveal delay={420} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup" className="btn-primary !py-3.5 !px-7 !text-sm">
            Try It Free <ArrowRight size={16} />
          </Link>
          <Link to="/pricing" className="btn-secondary !py-3.5 !px-7 !text-sm">
            View Pricing
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
