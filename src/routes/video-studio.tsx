import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Upload,
  Sparkles,
  Check,
  Wand2,
  Shirt,
  Video,
  Layers,
  Timer,
  Eye,
  Camera,
  Share2,
  ShoppingBag,
  Megaphone,
  Play,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

import clothingBlazer from "@/assets/clothing-blazer.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import editorialHero from "@/assets/editorial-hero.jpg";
import heroResult from "@/assets/hero-result.jpg";

export const Route = createFileRoute("/video-studio")({
  head: () => ({
    meta: [
      { title: "Video Studio — Turn Outfit Images Into Fashion Videos | TryVerse" },
      {
        name: "description",
        content:
          "Create short clothing videos from try-on results, product visuals, or AI photoshoots for social content, campaigns, and ecommerce pages.",
      },
      { property: "og:title", content: "Video Studio — TryVerse" },
      {
        property: "og:description",
        content:
          "Turn static outfit images into short fashion videos with TryVerse Video Studio.",
      },
    ],
  }),
  component: VideoStudioPage,
});

function VideoStudioPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Header />
      <main className="pt-24 sm:pt-28 overflow-x-hidden">
        <Hero />
        <HowItWorks />
        <WhyUse />
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
              Video Studio
            </div>
            <h1 className="font-display mt-6 text-[40px] sm:text-[48px] lg:text-[58px] leading-[1.05] text-balance">
              <RevealLines
                lines={["Turn Outfit Images", "Into Fashion Videos"]}
                accentIndices={[1]}
                step={130}
              />
            </h1>
            <Reveal
              as="p"
              delay={420}
              className="mt-6 text-base sm:text-[17px] text-muted-foreground max-w-xl leading-relaxed"
            >
              Create short clothing videos from try-on results, product
              visuals, or AI photoshoots for social content, campaigns, and
              ecommerce pages.
            </Reveal>
            <Reveal delay={560} className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup/shoppers" className="btn-primary !py-3.5 !px-7 !text-sm">
                Start Creating <ArrowRight size={16} />
              </Link>
              <Link to="/for-brands" className="btn-secondary !py-3.5 !px-7 !text-sm">
                For Brands
              </Link>
            </Reveal>
            <Reveal as="p" delay={680} className="mt-5 text-[12.5px] text-white/55">
              Static image to video · Clothing-only AI · Social-ready outputs
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

      {/* Video preview card */}
      <div className="relative rounded-2xl overflow-hidden ring-1 ring-violet/40 shadow-[0_40px_100px_-25px_rgba(168,85,247,0.5)] bg-[#1a1424]">
        <div className="relative aspect-video">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              title="TryVerse Video Studio Demo"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play Video Studio demo video"
              className="group absolute inset-0 h-full w-full"
            >
              <img
                src={heroResult}
                alt="Video Studio demo preview"
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
                <Sparkles size={10} /> Video Studio Demo
              </span>
              <span className="absolute bottom-3 left-3 text-[11px] text-white/85">
                Watch how a clothing image becomes a short fashion video.
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

      {/* Image → video story strip */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <StoryTile img={clothingBlazer} label="Image" icon={<Shirt size={10} />} />
        <StoryTile img={blazerAfter} label="Outfit" icon={<Upload size={10} />} />
        <StoryTile img={editorialHero} label="Video" icon={<Video size={10} />} accent video />
      </div>
    </div>
  );
}

function StoryTile({
  img,
  label,
  icon,
  accent = false,
  video = false,
}: {
  img: string;
  label: string;
  icon: React.ReactNode;
  accent?: boolean;
  video?: boolean;
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
      {video && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 backdrop-blur ring-1 ring-white/30">
            <Play size={14} className="text-white translate-x-[1px] fill-white" />
          </span>
        </span>
      )}
    </div>
  );
}

/* =================== HOW IT WORKS =================== */
function HowItWorks() {
  const steps = [
    {
      icon: <Upload size={18} />,
      title: "Upload a clothing visual",
      copy: "Start with a try-on image, product visual, or AI photoshoot result.",
    },
    {
      icon: <Video size={18} />,
      title: "Choose video style",
      copy: "Select showcase, social, product, or campaign-ready motion.",
    },
    {
      icon: <Wand2 size={18} />,
      title: "Generate short video",
      copy: "Create a polished clothing-focused video ready to share or publish.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">How it works</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["From Image", "To Fashion Video"]}
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

/* =================== WHY USE =================== */
function WhyUse() {
  const points = [
    {
      icon: <Layers size={16} />,
      title: "No video shoot needed",
      copy: "Create short fashion videos from existing clothing visuals.",
    },
    {
      icon: <Share2 size={16} />,
      title: "Better social engagement",
      copy: "Turn static outfit images into content made for feeds and reels.",
    },
    {
      icon: <Timer size={16} />,
      title: "Faster campaign assets",
      copy: "Create video variations for launches, ads, and product drops.",
    },
    {
      icon: <Eye size={16} />,
      title: "Consistent outfit presentation",
      copy: "Keep clothing details clear while adding natural movement.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">Why use it</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["Motion Content", "Without A Shoot"]}
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
  const styles = ["Showcase", "Social", "Product", "Campaign"];
  const steps = ["Upload", "Choose Style", "Generate Video", "Ready"];
  const frames = [blazerAfter, editorialHero, heroResult, blazerAfter];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">Feature preview</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["A Closer Look", "At Video Studio"]}
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

            {/* Settings row */}
            <div className="relative flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/45 mr-1">
                Tool
              </span>
              <span className="text-[12px] px-3 py-1.5 rounded-full border border-violet/60 bg-violet/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.12)] inline-flex items-center gap-1.5">
                <Video size={11} /> Video Studio
              </span>
              {styles.map((s, i) => (
                <span
                  key={s}
                  className={`text-[12px] px-3 py-1.5 rounded-full border ${
                    i === 0
                      ? "border-white/20 bg-white/[0.06] text-white"
                      : "border-white/10 bg-white/[0.03] text-white/70"
                  }`}
                >
                  {s}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] text-emerald-300/90">
                <Check size={10} /> Ready
              </span>
            </div>

            {/* Grid */}
            <div className="relative mt-4 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              <PreviewCard
                label="Uploaded"
                img={clothingBlazer}
                chip="Outfit Image"
                chipIcon={<Upload size={10} />}
              />
              <div className="col-span-2 lg:col-span-3 relative aspect-[16/9] rounded-xl overflow-hidden ring-1 ring-violet/50 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.55)] bg-[#1a1424]">
                <img
                  src={blazerAfter}
                  alt="Video preview"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30"
                />
                <span className="absolute top-2 left-2 chip backdrop-blur bg-black/55 text-white !text-[10px]">
                  <Video size={10} /> Video Preview
                </span>
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/30">
                    <span
                      aria-hidden
                      className="absolute h-14 w-14 rounded-full bg-gradient-to-br from-violet to-magenta opacity-70"
                    />
                    <Play size={22} className="relative text-white translate-x-[1px] fill-white" />
                  </span>
                </span>
                {/* Timeline */}
                <div className="absolute inset-x-3 bottom-3 rounded-md bg-black/55 backdrop-blur px-2 py-1.5 flex items-center gap-1.5">
                  <span className="text-[10px] text-white/70">00:00</span>
                  <div className="flex-1 h-1 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-violet to-magenta" />
                  </div>
                  <span className="text-[10px] text-white/70">00:08</span>
                </div>
              </div>
            </div>

            {/* Frame thumbs */}
            <div className="relative mt-4 grid grid-cols-4 gap-3">
              {frames.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-lg overflow-hidden ring-1 ring-white/[0.06] bg-[#1a1424]"
                >
                  <img
                    src={img}
                    alt={`Frame ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute bottom-1 left-1 text-[9px] text-white/80 bg-black/55 backdrop-blur px-1.5 py-0.5 rounded">
                    Frame {i + 1}
                  </span>
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
  const items = [
    {
      icon: <Share2 size={16} />,
      title: "Social Posts",
      copy: "Create short outfit videos for feeds, reels, and ads.",
    },
    {
      icon: <ShoppingBag size={16} />,
      title: "Product Pages",
      copy: "Add motion previews to ecommerce apparel listings.",
    },
    {
      icon: <Megaphone size={16} />,
      title: "Campaign Assets",
      copy: "Create launch-ready video visuals for clothing collections.",
    },
    {
      icon: <Camera size={16} />,
      title: "Shopper Showcases",
      copy: "Turn try-on results into short personal outfit videos.",
    },
  ];
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="mx-auto text-center max-w-3xl">
          <div className="eyebrow justify-center">Output types</div>
          <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
            <RevealLines
              lines={["Fashion Videos", "For Every Channel"]}
              accentIndices={[1]}
              step={120}
            />
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
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

/* =================== FINAL CTA =================== */
function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-10 text-center">
        <div className="eyebrow justify-center">Get started</div>
        <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.02]">
          <RevealLines lines={["Ready To Turn Images", "Into Videos?"]} accentIndices={[1]} step={120} />
        </h2>
        <Reveal as="p" delay={280} className="mt-5 text-base text-muted-foreground">
          Create short fashion videos from clothing visuals with TryVerse.
        </Reveal>
        <Reveal delay={420} className="mt-8 flex justify-center flex-wrap gap-3">
          <Link to="/signup/shoppers" className="btn-primary !py-3.5 !px-7 !text-sm">
            Start Creating <ArrowRight size={16} />
          </Link>
          <Link to="/for-brands" className="btn-secondary !py-3.5 !px-7 !text-sm">
            For Brands
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
