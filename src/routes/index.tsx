import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Shirt,
  Camera,
  Ghost,
  Move3d,
  Check,
  Plus,
  Equal,
  ShoppingBag,
  Wand2,
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
          "Upload a photo, choose an outfit, see how it looks on you instantly. Premium AI try-on and fashion visuals.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="pt-28 sm:pt-32">
        <Hero />
        <Workflow />
        <ChoosePath />
        <Toolkit />
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
    <section className="relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute left-1/2 top-[-220px] h-[820px] w-[1100px] -translate-x-1/2 rounded-full opacity-70"
          style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-4xl animate-fade-up">
          <div className="eyebrow flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-violet" />
            AI fashion · clothing only
          </div>
          <h1 className="font-display mt-6 text-[44px] sm:text-[72px] lg:text-[92px] leading-[1.02]">
            Try Clothes On<br />Before You Buy
          </h1>
          <p className="mt-7 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Upload your photo, choose an outfit, and see how it looks on you instantly.
            For fashion brands, TryVerse creates AI clothing visuals and virtual try-on
            experiences that help products sell faster.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#workflow" className="btn-primary !py-3.5 !px-7 !text-sm">
              Try It Free <ArrowRight size={16} />
            </a>
            <a href="#brands" className="btn-secondary !py-3.5 !px-7 !text-sm">
              Explore Brand Studio
            </a>
          </div>
        </div>

        <HeroEquation />
      </div>
    </section>
  );
}

function HeroEquation() {
  return (
    <div className="mt-20 sm:mt-28">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1.35fr] items-center gap-5 md:gap-6">
        <EquationCard label="Your photo" img={userRef} />
        <Operator>
          <Plus size={18} strokeWidth={2.5} />
        </Operator>
        <EquationCard label="Clothing product" img={garmentFlat} />
        <Operator highlight>
          <Equal size={18} strokeWidth={2.5} />
        </Operator>
        <EquationCard label="AI try-on result" img={editorialHero} tall result />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
        Average generation time · 0.8s
      </div>
    </div>
  );
}

function EquationCard({
  label,
  img,
  tall,
  result,
}: {
  label: string;
  img: string;
  tall?: boolean;
  result?: boolean;
}) {
  return (
    <figure
      className={`relative rounded-[1.8rem] overflow-hidden bg-[#f3eee8] ${
        tall ? "aspect-[4/5.6]" : "aspect-[4/5]"
      } ${result ? "glow" : ""}`}
    >
      <img
        src={img}
        alt={label}
        className="h-full w-full object-cover"
        loading="lazy"
        width={1024}
        height={1280}
      />
      <div className="absolute top-3 left-3">
        <span className="chip backdrop-blur bg-black/40 text-white !py-1 !text-[10.5px]">
          {result ? <Sparkles size={10} className="text-magenta" /> : null}
          {label}
        </span>
      </div>
      {result && (
        <div className="absolute bottom-3 left-3 right-3 glass rounded-xl px-3 py-2 flex items-center justify-between">
          <span className="text-[11px] text-white/85 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
            Try-on complete
          </span>
          <span className="text-[10px] text-white/60">tryverse.ai</span>
        </div>
      )}
    </figure>
  );
}

function Operator({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`hidden md:grid h-12 w-12 place-items-center rounded-full ${
        highlight
          ? "bg-gradient-to-br from-violet to-magenta text-white shadow-[0_8px_30px_-5px_rgba(168,85,247,0.6)]"
          : "bg-white text-black"
      }`}
    >
      {children}
    </div>
  );
}

/* =================== WORKFLOW DEMO =================== */
function Workflow() {
  return (
    <section id="workflow" className="relative py-32 sm:py-44">
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

/* =================== CHOOSE PATH =================== */
function ChoosePath() {
  return (
    <section id="shoppers" className="py-32 sm:py-40">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Two audiences"
          title="One Platform, Two Ways To Use It"
        />

        <div className="mt-16 grid gap-6 md:gap-8 md:grid-cols-2">
          <PathColumn
            id="shoppers-card"
            tag="For shoppers"
            title="Try Outfits On Yourself In Seconds"
            text="Try outfits from supported stores before checkout. Upload your photo and see how clothes look on you before buying."
            cta="Start Trying Outfits"
            img={editorialHero}
          />
          <PathColumn
            id="brands"
            tag="For brands"
            title="AI Visuals That Sell More Clothes"
            text="Create AI clothing photoshoots, ghost mannequin images, pose variations, and virtual try-on experiences for your ecommerce store."
            cta="Explore Brand Studio"
            img={g2a}
            dark
          />
        </div>
      </div>
    </section>
  );
}

function PathColumn({
  id,
  tag,
  title,
  text,
  cta,
  img,
  dark,
}: {
  id?: string;
  tag: string;
  title: string;
  text: string;
  cta: string;
  img: string;
  dark?: boolean;
}) {
  return (
    <article id={id} className="group">
      <div
        className={`relative rounded-[2rem] overflow-hidden aspect-[4/5] ${
          dark ? "bg-black" : "bg-[#f3eee8]"
        }`}
      >
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
          width={1024}
          height={1280}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <span className="absolute top-5 left-5 chip backdrop-blur bg-black/40 text-white">
          {tag}
        </span>
      </div>

      <div className="mt-7 grid sm:grid-cols-[minmax(0,1fr)_auto] gap-6 items-end">
        <div className="min-w-0">
          <h3 className="font-display text-2xl sm:text-3xl leading-[1.1]">
            {title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md">
            {text}
          </p>
        </div>
        <a href="#workflow" className="btn-secondary !py-2.5 !px-5 !text-sm shrink-0">
          {cta} <ArrowRight size={14} />
        </a>
      </div>
    </article>
  );
}

/* =================== TOOLKIT =================== */
function Toolkit() {
  const items = [
    {
      icon: <Shirt size={18} />,
      title: "Virtual Try-On",
      text: "Let shoppers see clothing on themselves before buying.",
    },
    {
      icon: <Camera size={18} />,
      title: "AI Photoshoot",
      text: "Turn clothing product photos into realistic model visuals.",
    },
    {
      icon: <Ghost size={18} />,
      title: "Ghost Mannequin",
      text: "Create clean apparel product shots without models.",
    },
    {
      icon: <Move3d size={18} />,
      title: "AI Pose Studio",
      text: "Generate multiple model poses and angles for the same outfit.",
    },
    {
      icon: <Wand2 size={18} />,
      title: "Stylo AI Stylist",
      text: "Help shoppers discover outfits and styling ideas with an AI fashion assistant.",
    },
  ];
  return (
    <section id="features" className="py-32 sm:py-40">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="The toolkit"
          title="Everything Clothing Brands And Shoppers Need"
        />

        <div className="mt-14 grid gap-px bg-white/[0.06] rounded-[2rem] overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="p-8 sm:p-9 bg-background/95 hover:bg-white/[0.03] transition-colors"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/10 text-white">
                {f.icon}
              </span>
              <h4 className="font-display mt-7 text-xl leading-tight">{f.title}</h4>
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

/* =================== GALLERY =================== */
function Gallery() {
  const items = [
    { src: g1a, tag: "AI Photoshoot" },
    { src: g2a, tag: "Virtual Try-On" },
    { src: editorialHero, tag: "Model Visual" },
    { src: g3a, tag: "Ghost Mannequin" },
    { src: g4a, tag: "Pose Variation" },
    { src: g5a, tag: "Catalog Shot" },
    { src: g6a, tag: "Lookbook" },
  ];
  const loop = [...items, ...items];
  return (
    <section className="py-32 sm:py-40">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="Gallery"
          title="From Product Photos To Fashion-Ready Visuals"
          sub="See how TryVerse turns simple clothing images into try-on results, model photos, and ecommerce-ready visuals."
        />
      </div>

      <div className="mt-14 overflow-hidden">
        <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused] px-6">
          {loop.map((it, i) => (
            <figure
              key={i}
              className="relative shrink-0 w-[280px] sm:w-[340px] aspect-[3/4] rounded-[1.5rem] overflow-hidden bg-[#f3eee8]"
            >
              <img
                src={it.src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <span className="chip backdrop-blur bg-black/40 text-white !text-[10px]">
                  {it.tag}
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== STOREFRONT =================== */
function Storefront() {
  const stores = ["Maison Studio", "Atelier Nord", "Linea", "Form & Co", "Verso", "House of Wren"];
  return (
    <section id="stores" className="py-32 sm:py-40">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <SectionHead
          eyebrow="On your storefront"
          title="Try Outfits From Your Favorite Stores"
          sub="Shoppers can discover and try clothing from supported fashion stores. Brands can bring TryVerse virtual try-on directly to their own store."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          {/* Product page mockup */}
          <div className="soft-card p-6 sm:p-8">
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

          {/* Copy + store tiles */}
          <div className="max-w-md">
            <h3 className="font-display text-3xl sm:text-4xl leading-[1.05]">
              A Try-On Button Worth Tapping
            </h3>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              A single line of code adds a virtual try-on to any clothing product — works
              with the platforms your store already runs on.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-2">
              {stores.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/85 text-center"
                >
                  {s}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <a href="#" className="btn-secondary !py-2.5 !px-5 !text-sm">
                View Supported Stores
              </a>
              <a href="#" className="btn-primary !py-2.5 !px-5 !text-sm">
                Add TryVerse To Your Store <ArrowRight size={14} />
              </a>
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
    <section id="try" className="py-32 sm:py-40">
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
                  width={1152}
                  height={1440}
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
