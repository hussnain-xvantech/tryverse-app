import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, Sparkles, Mail } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

import editorialHero from "@/assets/editorial-hero.jpg";
import heroResult from "@/assets/hero-result.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import clothingBlazer from "@/assets/clothing-blazer.jpg";
import garmentFlat from "@/assets/garment-flatlay.jpg";
import g1a from "@/assets/g1-after.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g6a from "@/assets/g6-after.jpg";
import g2c from "@/assets/g2-catalog.jpg";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — TryVerse Fashion AI Insights" },
      {
        name: "description",
        content:
          "Guides, ideas, and updates for shoppers and clothing brands using virtual try-on, AI photoshoots, ghost mannequin visuals, and fashion AI tools.",
      },
      { property: "og:title", content: "Resources — TryVerse" },
      {
        property: "og:description",
        content:
          "Insights for smarter fashion AI: try-on, photoshoots, ghost mannequin, AI styling, and more.",
      },
    ],
  }),
  component: ResourcesPage,
});

type Category =
  | "All"
  | "Virtual Try-On"
  | "AI Photoshoot"
  | "Ghost Mannequin"
  | "AI Stylist"
  | "Ecommerce"
  | "Product Updates";

const CATEGORIES: Category[] = [
  "All",
  "Virtual Try-On",
  "AI Photoshoot",
  "Ghost Mannequin",
  "AI Stylist",
  "Ecommerce",
  "Product Updates",
];

type Article = {
  title: string;
  slug: string;
  category: Exclude<Category, "All">;
  description: string;
  readTime: string;
  image: string;
};

const ARTICLES: Article[] = [
  {
    title: "What Is AI Virtual Try-On For Clothing?",
    slug: "what-is-ai-virtual-try-on-for-clothing",
    category: "Virtual Try-On",
    description:
      "A simple guide to how shoppers can try outfits online before buying.",
    readTime: "4 min read",
    image: g1a,
  },
  {
    title: "How AI Photoshoots Help Clothing Brands Save Time",
    slug: "how-ai-photoshoots-help-clothing-brands-save-time",
    category: "AI Photoshoot",
    description:
      "Turn product photos into model visuals without a traditional studio shoot.",
    readTime: "5 min read",
    image: blazerAfter,
  },
  {
    title: "Ghost Mannequin vs Model Photos: When To Use Each",
    slug: "ghost-mannequin-vs-model-photos",
    category: "Ghost Mannequin",
    description:
      "Learn which visual style works best for ecommerce product pages.",
    readTime: "6 min read",
    image: garmentFlat,
  },
  {
    title: "How To Create Better Product Images For Fashion Stores",
    slug: "better-product-images-for-fashion-stores",
    category: "Ecommerce",
    description:
      "Practical tips for clothing visuals that improve buyer confidence.",
    readTime: "5 min read",
    image: g2c,
  },
  {
    title: "Meet Stylo: Your AI Fashion Stylist",
    slug: "meet-stylo-ai-fashion-stylist",
    category: "AI Stylist",
    description:
      "See how AI styling can help shoppers discover outfit ideas faster.",
    readTime: "3 min read",
    image: g4a,
  },
  {
    title: "TryVerse Product Updates",
    slug: "tryverse-product-updates",
    category: "Product Updates",
    description:
      "New features, supported stores, and platform improvements.",
    readTime: "3 min read",
    image: g5a,
  },
];

function ResourcesPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Header />
      <main className="pt-24 sm:pt-28 overflow-x-hidden">
        <Hero />
        <Featured />
        <CategoriesAndArticles />
        <QuickGuides />
        <Newsletter />
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative px-6 sm:px-10 pt-12 sm:pt-20 pb-16 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="mx-auto max-w-[920px] text-center">
        <Reveal>
          <div className="eyebrow justify-center inline-flex">Resources</div>
        </Reveal>
        <h1 className="mt-5 font-display text-[44px] sm:text-[60px] lg:text-[72px] leading-[1.04]">
          <RevealLines
            lines={["Insights For Smarter", "Fashion AI"]}
            accentIndices={[1]}
          />
        </h1>
        <Reveal delay={220}>
          <p className="mt-6 text-[17px] leading-relaxed text-white/70 max-w-2xl mx-auto">
            Guides, ideas, and updates for shoppers and clothing brands using
            virtual try-on, AI photoshoots, ghost mannequin visuals, and
            fashion content tools.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#latest" className="btn-primary">
              Start Reading <ArrowRight size={16} />
            </a>
            <Link to="/signup" className="btn-secondary">
              Try It Free
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FEATURED ---------- */
function Featured() {
  return (
    <section className="px-6 sm:px-10 py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="eyebrow">Featured</div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            Editor's pick
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <article className="mt-8 surface-card overflow-hidden grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              <img
                src={heroResult}
                alt="Virtual try-on preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <span className="chip text-[12px] w-fit">Virtual Try-On</span>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.1]">
                How Virtual Try-On Helps Shoppers Buy With{" "}
                <span className="text-gradient">More Confidence</span>
              </h3>
              <p className="mt-4 text-white/70 text-[15px] leading-relaxed">
                Learn how AI try-on lets shoppers preview clothing on
                themselves before checkout and helps reduce hesitation.
              </p>
              <div className="mt-5 flex items-center gap-4 text-white/55 text-[13px]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> 5 min read
                </span>
              </div>
              <div className="mt-7">
                <Link
                  to="/resources/$slug"
                  params={{ slug: "what-is-ai-virtual-try-on-for-clothing" }}
                  className="btn-primary"
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CATEGORIES + LATEST ---------- */
function CategoriesAndArticles() {
  const [active, setActive] = useState<Category>("All");
  const filtered = useMemo(
    () => (active === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === active)),
    [active],
  );
  return (
    <section id="latest" className="px-6 sm:px-10 py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="eyebrow">Explore By Topic</div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            Browse the categories
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-6 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`chip cursor-pointer text-[13px] transition-all ${
                  active === c ? "chip-active" : "hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12">
          <Reveal>
            <h3 className="font-display text-2xl sm:text-3xl">Latest Articles</h3>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <Reveal key={article.title} delay={i * 80}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="mt-8 text-white/60 text-[14px]">
              No articles yet for this topic. More coming soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/resources/$slug"
      params={{ slug: article.slug }}
      className="group block surface-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(168,85,247,0.45)]"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 chip text-[11px] bg-black/60 border-white/15 text-white">
          {article.category}
        </span>
      </div>
      <div className="p-6">
        <h4 className="font-display text-[20px] leading-[1.2]">
          {article.title}
        </h4>
        <p className="mt-3 text-white/65 text-[14px] leading-relaxed">
          {article.description}
        </p>
        <div className="mt-5 flex items-center justify-between text-[13px] text-white/55">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} /> {article.readTime}
          </span>
          <span className="inline-flex items-center gap-1 text-white/80 group-hover:text-white">
            Read <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------- QUICK GUIDES ---------- */
function QuickGuides() {
  const guides = [
    {
      title: "For Shoppers",
      desc: "Try outfits before buying, compare looks, and get style ideas.",
      cta: "Read Shopper Guide",
      to: "/for-shoppers" as const,
      image: g6a,
    },
    {
      title: "For Brands",
      desc: "Create AI photoshoots, ghost mannequin images, and try-on widgets.",
      cta: "Read Brand Guide",
      to: "/for-brands" as const,
      image: clothingBlazer,
    },
    {
      title: "Pricing & Credits",
      desc: "Understand credits, plans, and when to upgrade.",
      cta: "View Pricing",
      to: "/pricing" as const,
      image: g3a,
    },
  ];
  return (
    <section className="px-6 sm:px-10 py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px]">
        <Reveal>
          <div className="eyebrow">Quick Guides</div>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">
            Start where you are
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <div className="surface-card overflow-hidden h-full flex flex-col">
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={g.image}
                    alt={g.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-[22px]">{g.title}</h3>
                  <p className="mt-3 text-white/65 text-[14px] leading-relaxed flex-1">
                    {g.desc}
                  </p>
                  <div className="mt-6">
                    <Link to={g.to} className="btn-secondary !text-[14px]">
                      {g.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- NEWSLETTER ---------- */
function Newsletter() {
  return (
    <section className="px-6 sm:px-10 py-20 sm:py-28">
      <div className="mx-auto max-w-[1000px] relative">
        <div
          className="pointer-events-none absolute -inset-10 -z-10 opacity-90"
          style={{ background: "var(--gradient-glow)" }}
        />
        <Reveal>
          <div className="relative surface-card overflow-hidden p-10 sm:p-14 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="relative">
              <div className="eyebrow inline-flex items-center gap-2 justify-center">
                <Sparkles size={12} /> Stay In The Loop
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
                Get Fashion AI <span className="text-gradient">Updates</span>
              </h2>
              <p className="mt-4 text-white/70 text-[16px] max-w-xl mx-auto">
                Receive TryVerse tips, product updates, and new fashion AI
                ideas.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-7 mx-auto max-w-md flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full rounded-full bg-white/[0.06] border border-white/10 pl-11 pr-4 py-3 text-[14px] text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
