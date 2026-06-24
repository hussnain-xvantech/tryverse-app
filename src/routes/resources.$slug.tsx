import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Clock, Sparkles } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

import heroResult from "@/assets/hero-result.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import garmentFlat from "@/assets/garment-flatlay.jpg";
import g1a from "@/assets/g1-after.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g2c from "@/assets/g2-catalog.jpg";

type Section = { heading: string; body: string[] };
type Post = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  intro: string;
  hero: string;
  sections: Section[];
};

const POSTS: Post[] = [
  {
    slug: "how-virtual-try-on-helps-shoppers-buy-with-more-confidence",
    title: "How Virtual Try-On Helps Shoppers Buy With More Confidence",
    category: "Virtual Try-On",
    readTime: "5 min read",
    date: "TryVerse Resources",
    intro:
      "Virtual try-on removes the guesswork from online clothing purchases — here's why it builds shopper confidence.",
    hero: heroResult,
    sections: [
      {
        heading: "Why shoppers hesitate before buying",
        body: [
          "Most online clothing purchases come with a quiet doubt: will it actually look good on me? Sizing charts, model photos, and reviews help, but none of them answer the real question.",
          "That hesitation slows checkout, fills wishlists that never convert, and drives up return rates for brands.",
        ],
      },
      {
        heading: "Seeing the outfit on yourself changes everything",
        body: [
          "When shoppers can see an item rendered on their own body, the decision gets faster and more honest. The garment stops being abstract and starts feeling personal.",
          "TryVerse takes a clothing product link and your photo, then generates a realistic preview in seconds — same lighting, same body, same vibe you'd get in a fitting room.",
        ],
      },
      {
        heading: "Confidence before checkout",
        body: [
          "Confidence is the missing ingredient in online fashion. With virtual try-on, shoppers stop second-guessing color choices, fits, and styling — and start buying pieces they actually love.",
          "Brands see fewer returns, higher average order value, and stronger post-purchase satisfaction.",
        ],
      },
      {
        heading: "Better outfit decisions",
        body: [
          "Try-on isn't only about a single item. Shoppers can preview multiple outfits side by side, mix tops and bottoms, and ask Stylo for ideas before they commit.",
          "It turns browsing into styling — a more creative, intentional way to shop.",
        ],
      },
      {
        heading: "A real example",
        body: [
          "A shopper finds a blazer on a brand's site, pastes the link into TryVerse, uploads a quick photo, and instantly sees it on themselves. They swap colors, try a matching skirt, and check out with the full look.",
          "That's the new default for confident online shopping.",
        ],
      },
      {
        heading: "Final thoughts",
        body: [
          "Virtual try-on doesn't just sell more clothes — it helps shoppers buy the right ones. That's better for people, for brands, and for the planet.",
        ],
      },
    ],
  },
  {
    slug: "what-is-ai-virtual-try-on-for-clothing",
    title: "What Is AI Virtual Try-On For Clothing?",
    category: "Virtual Try-On",
    readTime: "4 min read",
    date: "TryVerse Resources",
    intro:
      "A simple guide to how AI virtual try-on helps shoppers preview clothing on themselves before buying.",
    hero: g1a,
    sections: [
      {
        heading: "What is AI virtual try-on?",
        body: [
          "AI virtual try-on uses computer vision and generative models to place a clothing item onto a photo of a real person. Instead of guessing how a jacket, dress, or shirt will look, shoppers can see a realistic preview of the outfit on themselves in seconds.",
          "The technology has matured quickly. Modern try-on systems respect body shape, fabric drape, and lighting, producing images that feel natural rather than pasted.",
        ],
      },
      {
        heading: "Why shoppers use it",
        body: [
          "Online shopping is convenient, but returns are painful and the fit is always uncertain. Virtual try-on closes that gap. Shoppers can compare outfits side by side, screenshot their favorites, and feel confident before checkout.",
          "It also makes shopping more fun. Browsing turns into styling, and discovery feels personal instead of overwhelming.",
        ],
      },
      {
        heading: "How TryVerse works",
        body: [
          "Paste a product link from any supported clothing store. Upload a clear photo of yourself. TryVerse generates a high-quality preview of the outfit on you, ready to save or share.",
          "Behind the scenes, the system isolates the garment, maps it to your body, and renders the final image with realistic shading.",
        ],
      },
      {
        heading: "What makes a good try-on photo?",
        body: [
          "Use a full-body or upper-body photo with even lighting. Stand against a simple background, face the camera, and wear fitted clothing so the model can read your shape.",
          "Avoid heavy patterns, busy backgrounds, or extreme poses. The cleaner the input, the more realistic the result.",
        ],
      },
      {
        heading: "How brands benefit too",
        body: [
          "Try-on is not just for shoppers. Clothing brands see higher conversion, fewer returns, and longer session times when buyers can preview outfits before purchase.",
          "It also opens new content opportunities, from styled lookbooks to user-generated try-on shares.",
        ],
      },
      {
        heading: "Final thoughts",
        body: [
          "Virtual try-on is becoming a normal part of online fashion. It removes guesswork, builds confidence, and makes shopping feel personal again.",
        ],
      },
    ],
  },
  {
    slug: "how-ai-photoshoots-help-clothing-brands-save-time",
    title: "How AI Photoshoots Help Clothing Brands Save Time",
    category: "AI Photoshoot",
    readTime: "5 min read",
    date: "TryVerse Resources",
    intro:
      "Turn product photos into model visuals without booking a studio, models, or post-production teams.",
    hero: blazerAfter,
    sections: [
      {
        heading: "The problem with traditional shoots",
        body: [
          "Traditional fashion photoshoots are slow and expensive. Booking studios, models, stylists, and retouching teams can take weeks for a single drop.",
          "Smaller brands often skip lifestyle imagery entirely, which makes their product pages feel flat compared to larger competitors.",
        ],
      },
      {
        heading: "What AI photoshoots replace",
        body: [
          "AI photoshoots generate on-model imagery from a flat product photo. You choose the model, the pose, the background, and the mood. The result is a polished image ready for ecommerce, ads, or social.",
        ],
      },
      {
        heading: "Where AI shines",
        body: [
          "Use AI for catalog scale: many SKUs, many angles, and consistent styling. Use it for seasonal refreshes when budgets are tight. Use it for international campaigns when you need diverse models without flying anyone.",
        ],
      },
      {
        heading: "When to still book a real shoot",
        body: [
          "Hero campaigns, brand storytelling, and editorial moments still benefit from human direction. Think of AI as your high-volume content engine and traditional shoots as your premium narrative pieces.",
        ],
      },
      {
        heading: "Getting started",
        body: [
          "Most brands start by replacing ghost mannequin shots with on-model variants, then expand into pose and background variations. TryVerse handles the full pipeline so your team can focus on merchandising.",
        ],
      },
      {
        heading: "Final thoughts",
        body: [
          "AI photoshoots free clothing brands from production bottlenecks. Faster drops, more variety, lower cost — without sacrificing visual quality.",
        ],
      },
    ],
  },
  {
    slug: "ghost-mannequin-vs-model-photos",
    title: "Ghost Mannequin vs Model Photos: When To Use Each",
    category: "Ghost Mannequin",
    readTime: "6 min read",
    date: "TryVerse Resources",
    intro:
      "A practical breakdown of two essential ecommerce visuals and how to decide which one your product page needs.",
    hero: garmentFlat,
    sections: [
      {
        heading: "Ghost mannequin, explained",
        body: [
          "Ghost mannequin imagery shows a garment with shape and structure but no visible model or mannequin. It is the clearest way to communicate the actual product.",
        ],
      },
      {
        heading: "Model photos, explained",
        body: [
          "Model photos show the garment on a person. They communicate fit, styling, and lifestyle. Shoppers often need both to feel confident.",
        ],
      },
      {
        heading: "When to use ghost mannequin",
        body: [
          "Use ghost mannequin on the primary product image, in catalog grids, and for technical detail callouts. It keeps the focus on the garment.",
        ],
      },
      {
        heading: "When to use model photos",
        body: [
          "Use model photos for hero shots, lifestyle storytelling, and to communicate fit on different body types. Pair them with ghost mannequin for context.",
        ],
      },
      {
        heading: "The hybrid approach",
        body: [
          "Most high-performing product pages combine both. Lead with a hero model shot, then show ghost mannequin and detail shots below.",
        ],
      },
      {
        heading: "Final thoughts",
        body: [
          "It is not ghost vs model. It is ghost and model, in the right order. TryVerse helps you produce both at scale.",
        ],
      },
    ],
  },
  {
    slug: "better-product-images-for-fashion-stores",
    title: "How To Create Better Product Images For Fashion Stores",
    category: "Ecommerce",
    readTime: "5 min read",
    date: "TryVerse Resources",
    intro:
      "Practical tips for clothing visuals that improve buyer confidence and reduce returns.",
    hero: g2c,
    sections: [
      {
        heading: "Lead with clarity",
        body: [
          "The primary image should communicate the garment instantly. Clean background, even lighting, and accurate color.",
        ],
      },
      {
        heading: "Show fit on real bodies",
        body: [
          "Include model imagery across a few body types and heights. Buyers want to imagine themselves in the piece.",
        ],
      },
      {
        heading: "Use consistent angles",
        body: [
          "Front, back, side, and detail shots in a predictable order make browsing easier and look more professional.",
        ],
      },
      {
        heading: "Don't forget the fabric",
        body: [
          "Texture close-ups, fabric movement, and a short loop showing drape help shoppers understand quality.",
        ],
      },
      {
        heading: "Test and iterate",
        body: [
          "Track which hero images drive add-to-cart. Refresh underperforming SKUs first. AI tools make iteration much cheaper.",
        ],
      },
      {
        heading: "Final thoughts",
        body: [
          "Better imagery is the highest-leverage upgrade most fashion stores can make. Start with your top sellers.",
        ],
      },
    ],
  },
  {
    slug: "meet-stylo-ai-fashion-stylist",
    title: "Meet Stylo: Your AI Fashion Stylist",
    category: "AI Stylist",
    readTime: "3 min read",
    date: "TryVerse Resources",
    intro:
      "Stylo helps shoppers discover outfit ideas, match pieces, and try them on instantly.",
    hero: g4a,
    sections: [
      {
        heading: "What Stylo does",
        body: [
          "Stylo is a conversational stylist built into TryVerse. Tell it the occasion, vibe, or weather and it suggests outfits from supported stores.",
        ],
      },
      {
        heading: "How it helps shoppers",
        body: [
          "No more endless scrolling. Stylo narrows thousands of items into a few smart picks, then lets you try them on right away.",
        ],
      },
      {
        heading: "How it learns your taste",
        body: [
          "Stylo remembers what you save, what you skip, and what you try on. Recommendations get sharper every session.",
        ],
      },
      {
        heading: "Try it",
        body: [
          "Open TryVerse, ask Stylo for an outfit, and tap any look to preview it on yourself. Styling that finally feels personal.",
        ],
      },
      {
        heading: "Final thoughts",
        body: [
          "Stylo turns shopping into a creative conversation. Less guessing, more outfits you actually love.",
        ],
      },
    ],
  },
  {
    slug: "tryverse-product-updates",
    title: "TryVerse Product Updates",
    category: "Product Updates",
    readTime: "3 min read",
    date: "TryVerse Resources",
    intro:
      "New features, supported stores, and platform improvements across TryVerse.",
    hero: g5a,
    sections: [
      {
        heading: "Faster try-on engine",
        body: [
          "Our latest model cuts generation time by 40% while improving fabric realism and pose handling.",
        ],
      },
      {
        heading: "More supported stores",
        body: [
          "We expanded coverage across major fashion retailers so you can try almost anything you find online.",
        ],
      },
      {
        heading: "Brand Studio upgrades",
        body: [
          "New pose presets, background library, and batch export make AI photoshoots faster than ever.",
        ],
      },
      {
        heading: "Stylo improvements",
        body: [
          "Stylo now remembers context across sessions and supports outfit boards you can share.",
        ],
      },
      {
        heading: "What's next",
        body: [
          "Coming soon: video try-on, brand try-on widgets, and deeper outfit personalization.",
        ],
      },
      {
        heading: "Final thoughts",
        body: [
          "Thank you for building with us. Keep the feedback coming — most updates start as a user request.",
        ],
      },
    ],
  },
];

const RELATED_FALLBACK = [
  "how-ai-photoshoots-help-clothing-brands-save-time",
  "meet-stylo-ai-fashion-stylist",
  "ghost-mannequin-vs-model-photos",
];

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — TryVerse Resources` : "Article — TryVerse";
    const desc = post?.intro ?? "TryVerse fashion AI article.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(post ? [{ property: "og:image", content: post.hero }] : []),
      ],
    };
  },
  notFoundComponent: NotFoundArticle,
  component: ArticlePage,
});

function NotFoundArticle() {
  return (
    <div className="min-h-screen text-white">
      <Header />
      <main className="pt-32 pb-24 px-6 text-center">
        <div className="eyebrow inline-flex justify-center">Article Not Found</div>
        <h1 className="mt-4 font-display text-4xl">We couldn't find that article</h1>
        <p className="mt-4 text-white/65">Browse all TryVerse resources instead.</p>
        <Link to="/resources" className="btn-primary mt-8 inline-flex">
          <ArrowLeft size={16} /> Back to Resources
        </Link>
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const related = POSTS.filter(
    (p) => p.slug !== post.slug && RELATED_FALLBACK.includes(p.slug),
  ).slice(0, 3);
  const relatedFinal = related.length
    ? related
    : POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <Header />
      <main className="pt-24 sm:pt-28 overflow-x-hidden">
        {/* HERO */}
        <section className="relative px-6 sm:px-10 pt-10 sm:pt-16 pb-10 sm:pb-14">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-80"
            style={{ background: "var(--gradient-glow)" }}
          />
          <div className="mx-auto max-w-[860px]">
            <Reveal>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition"
              >
                <ArrowLeft size={14} /> Back to Resources
              </Link>
            </Reveal>
            <Reveal delay={80}>
              <span className="chip text-[12px] mt-6 inline-flex">{post.category}</span>
            </Reveal>
            <Reveal delay={140}>
              <h1 className="mt-5 font-display text-[36px] sm:text-[48px] lg:text-[58px] leading-[1.05]">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-[17px] sm:text-[18px] leading-relaxed text-white/70">
                {post.intro}
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-white/55">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> {post.readTime}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{post.date}</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={320}>
            <div className="mx-auto max-w-[1100px] mt-10 sm:mt-14">
              <div className="surface-card overflow-hidden">
                <div className="relative aspect-[16/9]">
                  <img
                    src={post.hero}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ARTICLE BODY */}
        <section className="px-6 sm:px-10 pb-16">
          <div className="mx-auto max-w-[720px]">
            {post.sections.map((s: Section, i: number) => (
              <Reveal key={s.heading} delay={i * 60}>
                <div className="mt-10 first:mt-0">
                  <h2 className="font-display text-[26px] sm:text-[30px] leading-[1.15]">
                    {i + 1}. {s.heading}
                  </h2>
                  {s.body.map((p: string, j: number) => (
                    <p
                      key={j}
                      className="mt-4 text-[16px] sm:text-[17px] leading-[1.75] text-white/75"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            {/* CALLOUT */}
            <Reveal>
              <div className="relative mt-14 surface-card overflow-hidden p-8 sm:p-10">
                <div
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{ background: "var(--gradient-glow)" }}
                />
                <div className="relative">
                  <div className="eyebrow inline-flex items-center gap-2">
                    <Sparkles size={12} /> Try It Yourself
                  </div>
                  <h3 className="mt-3 font-display text-[24px] sm:text-[28px] leading-[1.15]">
                    Paste a clothing product link, upload your photo, and see the outfit on you before buying.
                  </h3>
                  <div className="mt-6">
                    <Link to="/signup" className="btn-primary">
                      Try It Free <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* RELATED */}
        <section className="px-6 sm:px-10 py-16 sm:py-20 border-t border-white/[0.06]">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <div className="eyebrow">Keep Reading</div>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Related Articles</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedFinal.map((r, i) => (
                <Reveal key={r.slug} delay={i * 80}>
                  <Link
                    to="/resources/$slug"
                    params={{ slug: r.slug }}
                    className="group block surface-card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(168,85,247,0.45)]"
                  >
                    <div className="relative aspect-[5/3] overflow-hidden">
                      <img
                        src={r.hero}
                        alt={r.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <span className="absolute left-3 top-3 chip text-[11px] bg-black/60 border-white/15 text-white">
                        {r.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h4 className="font-display text-[20px] leading-[1.2]">{r.title}</h4>
                      <p className="mt-3 text-white/65 text-[14px] leading-relaxed">
                        {r.intro}
                      </p>
                      <div className="mt-5 flex items-center justify-between text-[13px] text-white/55">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={13} /> {r.readTime}
                        </span>
                        <span className="inline-flex items-center gap-1 text-white/80 group-hover:text-white">
                          Read <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link to="/resources" className="btn-secondary">
                <ArrowLeft size={14} /> Back to Resources
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

// Export for resources page reuse
export const BLOG_POSTS = POSTS;
