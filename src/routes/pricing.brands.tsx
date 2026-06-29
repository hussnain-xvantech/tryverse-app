import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Check,
  X as XIcon,
  ArrowRight,
  ChevronDown,
  Camera,
  Ghost,
  Shirt,
  PersonStanding,
  Video,
  LayoutGrid,
  Store,
  BarChart3,
  Sparkles,
  Building2,
  Crown,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/pricing/brands")({
  head: () => ({
    meta: [
      { title: "Pricing for Brands — TryVerse" },
      {
        name: "description",
        content:
          "AI visuals pricing for clothing brands. AI photoshoots, ghost mannequin, videos and virtual try-on widget for your fashion store.",
      },
      { property: "og:title", content: "Pricing for Brands — TryVerse" },
      {
        property: "og:description",
        content: "Starter, Growth and Enterprise brand studio plans for fashion teams.",
      },
    ],
    links: [{ rel: "canonical", href: "/pricing/brands" }],
  }),
  component: BrandPricingPage,
});

type Billing = "monthly" | "annual";

function BrandPricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      <Header />
      <main className="relative pt-[120px] pb-32">
        <Hero billing={billing} setBilling={setBilling} />
        <BrandCards billing={billing} />
        <WhatBrandsGet />
        <CompareBrands />
        <BrandFAQ />
        <FinalCTA />
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

/* ============ HERO ============ */
function Hero({ billing, setBilling }: { billing: Billing; setBilling: (b: Billing) => void }) {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -top-10 -z-10 h-[640px] w-[1100px] -translate-x-1/2 opacity-60"
        style={{ background: "var(--gradient-glow)", filter: "blur(60px)" }}
      />
      <div className="mx-auto max-w-[900px] px-6 sm:px-10 text-center">
        <Reveal as="div" className="eyebrow justify-center">Pricing for Brands</Reveal>
        <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[64px] leading-[1.05]">
          <RevealLines
            lines={["AI Visuals For", "Clothing Brands"]}
            accentIndices={[1]}
            step={130}
          />
        </h1>
        <Reveal as="p" delay={340} className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          Create AI photoshoots, ghost mannequin visuals, videos, and virtual try-on experiences for your fashion store.
        </Reveal>
        <Reveal delay={520} className="mt-10 flex justify-center">
          <Toggle billing={billing} setBilling={setBilling} />
        </Reveal>
      </div>
    </section>
  );
}

function Toggle({ billing, setBilling }: { billing: Billing; setBilling: (b: Billing) => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
      <button
        type="button"
        onClick={() => setBilling("monthly")}
        className={`relative z-10 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors ${
          billing === "monthly" ? "text-white" : "text-white/60 hover:text-white"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => setBilling("annual")}
        className={`relative z-10 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors flex items-center gap-2 ${
          billing === "annual" ? "text-white" : "text-white/60 hover:text-white"
        }`}
      >
        Annual
        <span className={`text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full ${
          billing === "annual" ? "bg-white/15" : "bg-violet/20 text-violet"
        }`}>SAVE</span>
      </button>
      <span
        aria-hidden
        className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
        style={{
          left: billing === "monthly" ? "0.25rem" : "calc(50% + 0.125rem)",
          right: billing === "monthly" ? "calc(50% + 0.125rem)" : "0.25rem",
          background: "linear-gradient(135deg, rgba(109,40,255,0.7), rgba(217,70,239,0.55))",
          boxShadow: "0 6px 20px -6px rgba(168,85,247,0.6), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      />
    </div>
  );
}

/* ============ CARDS ============ */
function BrandCards({ billing }: { billing: Billing }) {
  const note = billing === "annual" ? "Billed annually" : "Billed monthly";
  const plans = [
    {
      name: "Starter",
      icon: Sparkles,
      desc: "For small clothing stores testing AI visuals",
      price: "Custom",
      sub: note,
      highlight: false,
      badge: null as string | null,
      features: [
        "AI Photoshoot access",
        "Ghost Mannequin access",
        "Limited monthly generations",
        "Basic product catalog support",
        "Standard processing",
        "Email support",
      ],
      cta: { label: "Book Demo", to: "/book-demo" as const },
    },
    {
      name: "Growth",
      icon: Building2,
      desc: "For growing fashion brands and ecommerce teams",
      price: "Custom",
      sub: note,
      highlight: true,
      badge: "POPULAR",
      features: [
        "Everything in Starter",
        "More monthly generations",
        "Brand Widget access",
        "Product catalog management",
        "Pose Studio",
        "Video Studio",
        "Priority processing",
        "Analytics access",
      ],
      cta: { label: "Book Brand Demo", to: "/book-demo" as const },
    },
    {
      name: "Enterprise",
      icon: Crown,
      desc: "For larger brands, marketplaces, and multi-store teams",
      price: "Custom",
      sub: "Talk to sales",
      highlight: false,
      badge: "BEST FOR SCALE",
      features: [
        "Everything in Growth",
        "Higher generation limits",
        "Multi-store support",
        "Team collaboration",
        "Advanced analytics",
        "Custom onboarding",
        "Dedicated support",
        "API / integration discussion",
      ],
      cta: { label: "Contact Sales", to: "/contact" as const },
    },
  ];

  return (
    <section className="relative mt-20 sm:mt-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="grid gap-6 lg:gap-7 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <Card plan={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  plan,
}: {
  plan: {
    name: string;
    icon: typeof Sparkles;
    desc: string;
    price: string;
    sub: string;
    highlight: boolean;
    badge: string | null;
    features: string[];
    cta: { label: string; to: "/book-demo" | "/contact" };
  };
}) {
  const Icon = plan.icon;
  const isEnterprise = plan.name === "Enterprise";
  return (
    <div
      className={`relative h-full rounded-3xl p-7 sm:p-8 transition-transform duration-300 hover:-translate-y-1 ${
        plan.highlight
          ? "bg-gradient-to-b from-violet/[0.12] to-magenta/[0.06] border border-violet/40"
          : "surface-card"
      }`}
      style={
        plan.highlight
          ? {
              boxShadow:
                "0 0 0 1px rgba(168,85,247,0.4), 0 30px 80px -30px rgba(168,85,247,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }
          : undefined
      }
    >
      {plan.highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl animate-glow-pulse -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgba(217,70,239,0.25), transparent 70%)",
          }}
        />
      )}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.18em] whitespace-nowrap"
            style={{
              background: isEnterprise
                ? "linear-gradient(135deg, #F59E0B, #D946EF)"
                : "linear-gradient(135deg, #6D28FF, #D946EF)",
              boxShadow: "0 8px 20px -8px rgba(168,85,247,0.7)",
            }}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <span
          className="grid h-10 w-10 place-items-center rounded-xl"
          style={{
            background: plan.highlight
              ? "linear-gradient(135deg, rgba(109,40,255,0.4), rgba(217,70,239,0.35))"
              : "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Icon size={18} className={plan.highlight ? "text-white" : "text-white/70"} />
        </span>
        <div>
          <div className="font-display text-xl">{plan.name}</div>
          <div className="text-[13px] text-white/55">{plan.desc}</div>
        </div>
      </div>

      <div className="mt-7 flex items-baseline gap-2">
        <span className="font-display text-5xl tracking-tight">{plan.price}</span>
        <span className="text-sm text-white/55">/ month</span>
      </div>
      <div className="mt-1 text-[12.5px] text-white/45">{plan.sub}</div>

      <Link
        to={plan.cta.to}
        className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-semibold transition-all ${
          plan.highlight ? "btn-primary" : "btn-secondary"
        }`}
      >
        {plan.cta.label} <ArrowRight size={15} />
      </Link>

      <div className="mt-7 h-px bg-white/[0.06]" />

      <ul className="mt-6 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[14px] text-white/75 leading-relaxed">
            <span
              className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full shrink-0 ${
                isEnterprise
                  ? "bg-amber-400/15 text-amber-300"
                  : plan.highlight
                  ? "bg-violet/20 text-violet"
                  : "bg-white/5 text-white/60"
              }`}
            >
              <Check size={12} strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============ WHAT BRANDS GET ============ */
function WhatBrandsGet() {
  const items = [
    { icon: Camera, title: "AI Photoshoot", desc: "Studio-quality model shots from flat product photos." },
    { icon: Ghost, title: "Ghost Mannequin", desc: "Invisible-mannequin product imagery in seconds." },
    { icon: Shirt, title: "Fabric Studio", desc: "Render fabric textures, colors and variations." },
    { icon: PersonStanding, title: "Pose Studio", desc: "Multiple poses for a single garment instantly." },
    { icon: Video, title: "Video Studio", desc: "Short product videos for social and PDPs." },
    { icon: LayoutGrid, title: "Store Widget", desc: "Embed virtual try-on into your storefront." },
    { icon: Store, title: "Stores", desc: "Sync products with your ecommerce catalog." },
    { icon: BarChart3, title: "Analytics", desc: "Engagement, try-on, and conversion insights." },
  ];
  return (
    <section className="relative mt-28">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal as="div" className="eyebrow justify-center">What's Included</Reveal>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
            <RevealLines lines={["Everything Your", "Clothing Brand Needs"]} accentIndices={[1]} step={120} />
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={i * 60}>
                <div className="surface-card h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(109,40,255,0.35), rgba(217,70,239,0.3))",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 8px 24px -8px rgba(168,85,247,0.5)",
                    }}
                  >
                    <Icon size={18} className="text-white" />
                  </span>
                  <h3 className="mt-5 font-display text-lg">{it.title}</h3>
                  <p className="mt-2 text-[13.5px] text-white/65 leading-relaxed">{it.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ COMPARE ============ */
type Row = {
  label: string;
  starter: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
};

const BROWS: Row[] = [
  { label: "AI Photoshoot", starter: true, growth: true, enterprise: true },
  { label: "Ghost Mannequin", starter: true, growth: true, enterprise: true },
  { label: "Pose Studio", starter: false, growth: true, enterprise: true },
  { label: "Video Studio", starter: false, growth: true, enterprise: true },
  { label: "Brand Widget", starter: false, growth: true, enterprise: true },
  { label: "Product Catalog", starter: "Basic", growth: "Advanced", enterprise: "Multi-store" },
  { label: "Analytics", starter: false, growth: true, enterprise: "Advanced" },
  { label: "Priority Processing", starter: false, growth: true, enterprise: true },
  { label: "Team Collaboration", starter: false, growth: false, enterprise: true },
  { label: "Custom Support", starter: "Email", growth: "Priority", enterprise: "Dedicated" },
];

function Cell({ value, tone }: { value: string | boolean; tone?: "growth" | "ent" }) {
  if (typeof value === "string") {
    return <span className="text-[14px] text-white/80">{value}</span>;
  }
  if (value) {
    const cls =
      tone === "ent"
        ? "bg-amber-400/15 text-amber-300"
        : tone === "growth"
        ? "bg-violet/20 text-violet"
        : "bg-white/5 text-white/70";
    return (
      <span className={`inline-grid place-items-center h-6 w-6 rounded-full ${cls}`}>
        <Check size={13} strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-white/[0.04] text-white/30">
      <XIcon size={13} strokeWidth={2.5} />
    </span>
  );
}

function CompareBrands() {
  return (
    <section className="relative mt-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal as="div" className="eyebrow justify-center">Compare</Reveal>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            <RevealLines lines={["Compare Brand Plans"]} step={120} />
          </h2>
        </div>
        <Reveal delay={200}>
          <div className="mt-12 surface-card overflow-hidden">
            <div className="hidden md:block">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center px-6 py-5 border-b border-white/[0.06] text-[12px] uppercase tracking-[0.18em] text-white/50">
                <div>Feature</div>
                <div className="text-center">Starter</div>
                <div className="text-center text-violet">Growth</div>
                <div className="text-center text-amber-300">Enterprise</div>
              </div>
              {BROWS.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center px-6 py-4 text-[14.5px] ${
                    i !== BROWS.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  <div className="text-white/85">{r.label}</div>
                  <div className="flex justify-center"><Cell value={r.starter} /></div>
                  <div className="flex justify-center"><Cell value={r.growth} tone="growth" /></div>
                  <div className="flex justify-center"><Cell value={r.enterprise} tone="ent" /></div>
                </div>
              ))}
            </div>
            <div className="md:hidden divide-y divide-white/[0.06]">
              {(["starter", "growth", "enterprise"] as const).map((plan) => (
                <div key={plan} className="p-5">
                  <div
                    className={`text-[11px] uppercase tracking-[0.2em] font-semibold mb-4 ${
                      plan === "growth"
                        ? "text-violet"
                        : plan === "enterprise"
                        ? "text-amber-300"
                        : "text-white/55"
                    }`}
                  >
                    {plan}
                  </div>
                  <ul className="space-y-3">
                    {BROWS.map((r) => (
                      <li key={r.label} className="flex items-center justify-between gap-4">
                        <span className="text-[14px] text-white/80">{r.label}</span>
                        <Cell
                          value={r[plan]}
                          tone={
                            plan === "growth"
                              ? "growth"
                              : plan === "enterprise"
                              ? "ent"
                              : undefined
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
const FAQS = [
  {
    q: "Which brand plan is right for me?",
    a: "Starter suits small clothing stores testing AI visuals. Growth is for ecommerce brands scaling content. Enterprise is for multi-store teams and marketplaces.",
  },
  {
    q: "Do you support clothing-only catalogs?",
    a: "Yes. TryVerse is built specifically for apparel — tops, bottoms, dresses, outerwear and more. We don't support shoes, bags, jewelry or beauty.",
  },
  {
    q: "Can TryVerse work with my ecommerce store?",
    a: "Yes. Connect your storefront and sync your product catalog. The widget embeds directly into product pages.",
  },
  {
    q: "Do brand plans include virtual try-on widget?",
    a: "Brand Widget is included in Growth and Enterprise plans, with full embedding and configuration.",
  },
  {
    q: "Can my team manage product catalogs?",
    a: "Yes. Growth offers catalog management. Enterprise adds team collaboration and roles across multiple stores.",
  },
  {
    q: "Do you offer custom onboarding?",
    a: "Enterprise plans include custom onboarding, dedicated support, and integration discussions tailored to your stack.",
  },
];

function BrandFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative mt-28">
      <div className="mx-auto max-w-[860px] px-6 sm:px-10">
        <div className="text-center">
          <Reveal as="div" className="eyebrow justify-center">FAQ</Reveal>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            <RevealLines lines={["Brand Pricing FAQ"]} step={120} />
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className="surface-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] sm:text-[16px] font-medium text-white">{f.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-white/55 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-violet" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-[14.5px] text-white/70 leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ FINAL CTA ============ */
function FinalCTA() {
  return (
    <section className="relative mt-28">
      <div className="mx-auto max-w-[1080px] px-6 sm:px-10">
        <div
          className="relative overflow-hidden rounded-[2rem] px-6 sm:px-10 py-16 sm:py-20 text-center"
          style={{
            background: "linear-gradient(180deg, rgba(27,24,36,0.95), rgba(15,13,22,0.95))",
            border: "1px solid rgba(168,85,247,0.25)",
            boxShadow: "0 30px 80px -30px rgba(168,85,247,0.5)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(217,70,239,0.22), rgba(109,40,255,0.12) 45%, transparent 75%)",
            }}
          />
          <div className="relative">
            <Reveal as="div" className="eyebrow justify-center">Get Started</Reveal>
            <h2 className="font-display mt-4 text-3xl sm:text-5xl lg:text-[56px] leading-[1.05]">
              <RevealLines
                lines={["Ready To Create", "Better Product Visuals?"]}
                accentIndices={[1]}
                step={120}
              />
            </h2>
            <Reveal as="p" delay={280} className="mt-5 text-[15px] sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
              Build AI photoshoots, ghost mannequin images, videos, and virtual try-on experiences for your fashion store.
            </Reveal>
            <Reveal delay={460} className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/book-demo" className="btn-primary !py-4 !px-7 !text-[14px]">
                Book Brand Demo <ArrowRight size={16} />
              </Link>
              <Link to="/pricing/shoppers" className="btn-secondary !py-4 !px-7 !text-[14px]">
                View Shopper Pricing
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
