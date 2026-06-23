import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Shirt,
  Camera,
  Ghost,
  Move3d,
  Wand2,
  Check,
  Play,
  Store,
  ShoppingBag,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TryOnDemo } from "@/components/site/TryOnDemo";

import heroResult from "@/assets/hero-result.jpg";
import userPhoto from "@/assets/user-photo.jpg";
import blazer from "@/assets/clothing-blazer.jpg";
import g1b from "@/assets/g1-before.jpg";
import g1a from "@/assets/g1-after.jpg";
import g2b from "@/assets/g2-before.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g6a from "@/assets/g6-after.jpg";
import ctaResult from "@/assets/cta-result.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TryVerse — Try Clothes On Before You Buy" },
      {
        name: "description",
        content:
          "TryVerse is the AI fashion platform built for clothing. Shoppers try outfits virtually, brands create AI photoshoots, ghost mannequin visuals and pose variations.",
      },
      { property: "og:title", content: "TryVerse — Try Clothes On Before You Buy" },
      {
        property: "og:description",
        content:
          "Upload a photo, choose an outfit, see how it looks on you instantly. AI visuals and virtual try-on for fashion brands.",
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
        <SectionAction />
        <ChoosePath />
        <Features />
        <Gallery />
        <Stores />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const chips = ["Clothing-only AI", "Virtual Try-On", "AI Photoshoots", "Brand Studio"];
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "var(--gradient-glow)", filter: "blur(20px)" }} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center">
          <div className="animate-fade-up">
            <span className="chip mb-5">
              <Sparkles size={12} className="text-violet" />
              AI fashion · built for clothing only
            </span>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight">
              Try clothes on <br className="hidden sm:block" />
              <span className="text-gradient">before</span> you buy.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Upload your photo, choose an outfit, and see how it looks on you instantly. For
              fashion brands, TryVerse creates AI clothing visuals and virtual try-on experiences
              that help products sell faster.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#try" className="btn-primary !py-3.5 !px-6">
                Try It Free <ArrowRight size={16} />
              </a>
              <a href="#brands" className="btn-secondary !py-3.5 !px-6">
                <Play size={14} /> Explore Brand Studio
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>

          <HeroStack />
        </div>
      </div>
    </section>
  );
}

function HeroStack() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] aspect-[4/5]">
      {/* glow */}
      <div className="absolute -inset-10 -z-10" style={{ background: "var(--gradient-glow)" }} />

      {/* result card */}
      <div className="absolute inset-0 surface-card overflow-hidden glow animate-float">
        <img
          src={heroResult}
          alt="Virtual try-on result"
          width={896}
          height={1152}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-3 left-3 chip chip-active backdrop-blur">
          <Sparkles size={11} /> AI Result
        </div>
        <div className="absolute bottom-3 left-3 right-3 glass rounded-xl px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-glow-pulse" />
            Try-on complete
          </div>
          <span className="text-[11px] text-muted-foreground">0.8s</span>
        </div>
      </div>

      {/* user card — top left */}
      <div className="absolute -left-4 sm:-left-8 top-6 w-32 sm:w-40 surface-card overflow-hidden animate-float"
        style={{ animationDelay: "-2s" }}>
        <img src={userPhoto} alt="You" width={640} height={800}
          className="w-full aspect-[4/5] object-cover" loading="lazy" />
        <div className="px-2.5 py-1.5 text-[11px] text-white/85 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-violet" />
          Your photo
        </div>
      </div>

      {/* garment card — bottom right */}
      <div className="absolute -right-3 sm:-right-6 bottom-10 w-32 sm:w-40 surface-card overflow-hidden animate-float"
        style={{ animationDelay: "-4s" }}>
        <div className="w-full aspect-[4/5] bg-white">
          <img src={blazer} alt="Garment" width={640} height={800}
            className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="px-2.5 py-1.5 text-[11px] text-white/85 flex items-center gap-1.5">
          <Shirt size={11} className="text-magenta" />
          Lavender Blazer
        </div>
      </div>

      {/* equation badges */}
      <div className="hidden sm:flex absolute -left-2 top-1/2 -translate-y-1/2 h-7 w-7 items-center justify-center rounded-full bg-white text-black text-sm font-bold shadow-lg">+</div>
      <div className="hidden sm:flex absolute -right-2 top-1/3 h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet to-magenta text-white text-sm font-bold shadow-lg">=</div>
    </div>
  );
}

/* ---------------- SECTION 2: IN ACTION ---------------- */
function SectionAction() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <SectionHead
        eyebrow="See it work"
        title={<>See TryVerse <span className="text-gradient">in action</span>.</>}
        subtitle="Upload a photo, choose a clothing item, and generate realistic try-on or product visuals in seconds."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12">
        <TryOnDemo />
      </div>
    </section>
  );
}

/* ---------------- SECTION 3: CHOOSE PATH ---------------- */
function ChoosePath() {
  return (
    <section id="shoppers" className="relative py-24 sm:py-32">
      <SectionHead
        eyebrow="Two audiences"
        title={<>One platform. <span className="text-gradient">Two ways</span> to use it.</>}
        subtitle="TryVerse works for shoppers who want to see clothes on themselves, and fashion brands that need better product visuals."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 grid gap-6 md:grid-cols-2">
        {/* Shoppers */}
        <PathCard
          title="For Shoppers"
          text="Try outfits from supported stores before checkout. Upload your photo and see how clothes look on you before buying."
          cta="Start Trying Outfits"
        >
          <div className="relative mx-auto w-[230px] sm:w-[260px]">
            <div className="relative aspect-[9/19] rounded-[2rem] bg-black border border-white/10 p-2 shadow-2xl">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-black z-10" />
              <div className="h-full w-full rounded-[1.6rem] overflow-hidden bg-surface relative">
                <img src={heroResult} alt="" className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-x-2 top-12 flex gap-2">
                  <div className="rounded-xl bg-black/50 backdrop-blur px-2.5 py-1.5 text-[10px] flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-md overflow-hidden">
                      <img src={userPhoto} className="h-full w-full object-cover" alt="" />
                    </span>
                    You
                  </div>
                  <div className="rounded-xl bg-black/50 backdrop-blur px-2.5 py-1.5 text-[10px] flex items-center gap-1.5">
                    <span className="h-5 w-5 rounded-md overflow-hidden bg-white">
                      <img src={blazer} className="h-full w-full object-cover" alt="" />
                    </span>
                    Blazer
                  </div>
                </div>
                <div className="absolute inset-x-3 bottom-3">
                  <div className="rounded-xl bg-gradient-to-r from-violet to-magenta text-white text-center py-2 text-xs font-semibold shadow-lg">
                    Try this look
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PathCard>

        {/* Brands */}
        <PathCard
          id="brands"
          title="For Brands"
          text="Create AI clothing photoshoots, ghost mannequin images, pose variations, and virtual try-on experiences for your ecommerce store."
          cta="Explore Brand Studio"
        >
          <div className="relative w-full surface-card !rounded-2xl p-3 bg-black/40">
            <div className="flex items-center gap-1.5 px-1 pb-2">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="ml-2 text-[10px] text-muted-foreground">studio.tryverse.ai</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1 rounded-xl overflow-hidden border border-white/10 bg-white">
                <img src={g2b} alt="" className="w-full aspect-[3/4] object-cover" loading="lazy" />
              </div>
              <div className="col-span-2 rounded-xl overflow-hidden border border-white/10 relative">
                <img src={g2a} alt="" className="w-full aspect-[3/4] object-cover" loading="lazy" />
                <div className="absolute top-2 left-2 chip chip-active backdrop-blur text-[10px]">AI Model</div>
              </div>
              <div className="col-span-3 grid grid-cols-3 gap-2">
                <ToolBtn icon={<Camera size={12} />} label="Photoshoot" active />
                <ToolBtn icon={<Ghost size={12} />} label="Mannequin" />
                <ToolBtn icon={<Move3d size={12} />} label="Poses" />
              </div>
            </div>
          </div>
        </PathCard>
      </div>
    </section>
  );
}

function ToolBtn({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] border ${
      active
        ? "bg-gradient-to-r from-violet/30 to-magenta/20 border-violet/40 text-white"
        : "border-white/10 text-muted-foreground"
    }`}>
      {icon} {label}
    </div>
  );
}

function PathCard({
  id,
  title,
  text,
  cta,
  children,
}: {
  id?: string;
  title: string;
  text: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="group surface-card p-6 sm:p-8 transition-all hover:-translate-y-1 hover:border-violet/30"
      style={{ transition: "transform .35s ease, border-color .35s ease, box-shadow .35s ease" }}
    >
      <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
        <div className="min-w-0">
          <h3 className="font-display text-2xl sm:text-3xl font-bold">{title}</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">{text}</p>
          <a href="#try" className="btn-primary mt-6 !py-2.5 !px-5 !text-sm">
            {cta} <ArrowRight size={14} />
          </a>
        </div>
        <div className="w-full sm:w-[280px] shrink-0">{children}</div>
      </div>
    </div>
  );
}

/* ---------------- SECTION 4: FEATURES ---------------- */
function Features() {
  const items = [
    { icon: <Shirt size={18} />, title: "Virtual Try-On", text: "Let shoppers see clothing on themselves before buying." },
    { icon: <Camera size={18} />, title: "AI Photoshoot", text: "Turn clothing product photos into realistic model visuals." },
    { icon: <Ghost size={18} />, title: "Ghost Mannequin", text: "Create clean apparel product shots without models." },
    { icon: <Move3d size={18} />, title: "AI Pose Studio", text: "Generate multiple model poses and angles for the same outfit." },
    { icon: <Wand2 size={18} />, title: "Stylo AI Stylist", text: "Help shoppers discover outfits and styling ideas with an AI fashion assistant." },
  ];
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <SectionHead
        eyebrow="Toolkit"
        title={<>Everything clothing brands <br className="hidden sm:block" /> and shoppers <span className="text-gradient">need</span>.</>}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => (
          <div
            key={f.title}
            className={`surface-card p-6 group transition-all hover:-translate-y-1 hover:border-violet/30 ${
              i === 4 ? "lg:col-span-1" : ""
            }`}
            style={{ transition: "transform .3s ease, border-color .3s ease" }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet/20 to-magenta/10 border border-white/10 text-white group-hover:from-violet/35 group-hover:to-magenta/20">
              {f.icon}
            </span>
            <h4 className="mt-5 font-display text-lg font-semibold">{f.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.text}</p>
          </div>
        ))}
        <div className="surface-card p-6 flex flex-col justify-between bg-gradient-to-br from-violet/15 to-magenta/10 border-violet/30">
          <div>
            <h4 className="font-display text-lg font-semibold">Built for apparel only</h4>
            <p className="mt-2 text-sm text-white/80">
              We focus 100% on clothing. No shoes, bags, beauty — just fashion that actually fits.
            </p>
          </div>
          <a href="#try" className="btn-secondary mt-6 !py-2 !px-4 !text-sm w-fit">
            See how <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 5: GALLERY ---------------- */
function Gallery() {
  const items = [
    { src: g1b, alt: "Dress flat lay", label: "Before", tag: "Flat-lay" },
    { src: g1a, alt: "Dress on model", label: "After", tag: "AI Photoshoot" },
    { src: g2b, alt: "Hoodie", label: "Before", tag: "Product" },
    { src: g2a, alt: "Hoodie on model", label: "After", tag: "Photoshoot" },
    { src: g3a, alt: "Ghost mannequin shirt", label: "Ghost Mannequin", tag: "Apparel" },
    { src: g4a, alt: "Pose variations", label: "Pose Variation", tag: "Lookbook" },
    { src: g5a, alt: "Cardigan on model", label: "Try-On", tag: "Knitwear" },
    { src: g6a, alt: "Yellow tee model", label: "After", tag: "Tee" },
  ];
  // Duplicate for seamless marquee
  const loop = [...items, ...items];
  return (
    <section id="stores-intro" className="py-24 sm:py-32">
      <SectionHead
        eyebrow="Gallery"
        title={<>From product photos to <span className="text-gradient">fashion-ready</span> visuals.</>}
        subtitle="See how TryVerse turns simple clothing images into try-on results, model photos, and ecommerce-ready visuals."
      />
      <div className="mt-12 overflow-hidden">
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {loop.map((it, i) => (
            <figure key={i} className="relative shrink-0 w-[220px] sm:w-[260px] aspect-[3/4] rounded-2xl overflow-hidden surface-card !p-0">
              <img src={it.src} alt={it.alt} loading="lazy"
                className="h-full w-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                <span className="chip chip-active backdrop-blur text-[10px]">{it.label}</span>
                <span className="text-[10px] text-white/80">{it.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 6: STORES + WIDGET ---------------- */
function Stores() {
  const stores = ["LUXE", "ATELIER", "VESTA", "MAISON", "AURORA", "NOVA", "STELLA", "OPAL"];
  return (
    <section id="stores" className="py-24 sm:py-32">
      <SectionHead
        eyebrow="Stores"
        title={<>Try outfits from your <span className="text-gradient">favorite stores</span>.</>}
        subtitle="Shoppers can discover and try clothing from supported fashion stores. Brands can bring TryVerse virtual try-on directly to their own store."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 grid gap-6 lg:grid-cols-[1fr_1fr] items-stretch">
        {/* Store tiles */}
        <div className="surface-card p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Store size={16} className="text-violet" />
              <span className="text-sm font-medium">Supported stores</span>
            </div>
            <span className="chip">200+ growing</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            {stores.map((s) => (
              <div key={s} className="aspect-[5/3] rounded-xl border border-white/10 bg-white/[0.03] grid place-items-center hover:bg-white/[0.06] hover:border-violet/30 transition-colors">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-white/80">{s}</span>
              </div>
            ))}
          </div>
          <a href="#" className="btn-secondary mt-6 w-fit !py-2 !px-4 !text-sm">
            View supported stores <ArrowRight size={14} />
          </a>
        </div>

        {/* Brand widget mockup */}
        <div className="surface-card p-4 sm:p-5">
          <div className="flex items-center gap-1.5 px-1 pb-3">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <div className="ml-2 px-2 py-0.5 text-[10px] text-muted-foreground rounded bg-white/5 border border-white/10">
              yourstore.com / products / lavender-blazer
            </div>
          </div>
          <div className="grid grid-cols-[1fr_1.1fr] gap-4">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white">
              <img src={blazer} alt="" loading="lazy"
                className="w-full aspect-[3/4] object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="text-xs text-muted-foreground">Maison Studio</div>
              <h5 className="font-display text-lg font-semibold mt-0.5">Lavender Oversized Blazer</h5>
              <div className="mt-1 text-sm">
                <span className="font-semibold">$148</span>
                <span className="ml-2 text-muted-foreground line-through text-xs">$180</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {["XS", "S", "M", "L", "XL"].map((s, i) => (
                  <span key={s} className={`grid h-7 w-7 place-items-center rounded-md border text-[11px] ${
                    i === 1 ? "border-white text-white bg-white/10" : "border-white/15 text-muted-foreground"
                  }`}>{s}</span>
                ))}
              </div>
              <button className="mt-4 rounded-xl bg-white text-black text-sm font-semibold py-2.5 flex items-center justify-center gap-2">
                <ShoppingBag size={14} /> Add to bag
              </button>
              <button className="mt-2 btn-primary !py-2.5 !text-sm">
                <Sparkles size={14} /> Try it on with TryVerse
              </button>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Check size={12} className="text-emerald-400" /> Powered by TryVerse · 0.8s
              </div>
            </div>
          </div>
          <a href="#" className="btn-secondary mt-5 w-fit !py-2 !px-4 !text-sm">
            Add TryVerse to your store <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION 7: FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section id="try" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative surface-card overflow-hidden p-6 sm:p-10 lg:p-14">
          <div className="absolute -inset-32 -z-0 opacity-70" style={{ background: "var(--gradient-glow)" }} />
          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <span className="chip mb-5">
                <Sparkles size={12} className="text-violet" /> Free to start
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.03]">
                Ready to see it <span className="text-gradient">on you?</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                Try clothes before buying or create AI visuals for your fashion brand with TryVerse.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#" className="btn-primary !py-3.5 !px-6">
                  Try It Free <ArrowRight size={16} />
                </a>
                <a href="#" className="btn-secondary !py-3.5 !px-6">
                  Book Brand Demo
                </a>
              </div>
              <div className="mt-6 flex items-center gap-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400"/> No credit card</span>
                <span className="flex items-center gap-1.5"><Check size={12} className="text-emerald-400"/> Setup in minutes</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[420px] aspect-[4/5]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 glow">
                <img src={ctaResult} alt="Try-on result" className="h-full w-full object-cover"
                  loading="lazy" width={896} height={1152} />
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

/* ---------------- SHARED HEAD ---------------- */
function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
      <span className="chip mx-auto">{eyebrow}</span>
      <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
