import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X as XIcon, Shield, Sparkles, Crown, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — TryVerse" },
      {
        name: "description",
        content:
          "Simple TryVerse pricing. Start free with 5 daily credits. Upgrade to Plus or Pro for more power, HD downloads and watermark-free results.",
      },
      { property: "og:title", content: "Pricing — TryVerse" },
      {
        property: "og:description",
        content: "Free, Plus and Pro plans for AI fashion creators. One-time credit packs available.",
      },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

type Billing = "monthly" | "yearly";

function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      <Header />
      <main className="relative pt-[120px] pb-32">
        <PricingHero billing={billing} setBilling={setBilling} />
        <MainPricingCards billing={billing} />
        <PrivacyNotice />
        <CreditPacks />
        <ComparePlans />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer variant="minimal" />
    </div>
  );
}

/* ============ HERO ============ */
function PricingHero({ billing, setBilling }: { billing: Billing; setBilling: (b: Billing) => void }) {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -top-10 -z-10 h-[640px] w-[1100px] -translate-x-1/2 opacity-60"
        style={{ background: "var(--gradient-glow)", filter: "blur(60px)" }}
      />
      <div className="mx-auto max-w-[900px] px-6 sm:px-10 text-center">
        <Reveal as="div" className="eyebrow justify-center">Pricing</Reveal>
        <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[64px] leading-[1.05]">
          <RevealLines
            lines={["One Tool Packed With AI", "Free To Try"]}
            accentIndices={[1]}
            step={130}
          />
        </h1>
        <Reveal as="p" delay={340} className="mt-6 text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
          Start creating with 5 free credits every day. Upgrade for more power.
        </Reveal>

        <Reveal delay={520} className="mt-10 flex justify-center">
          <BillingToggle billing={billing} setBilling={setBilling} />
        </Reveal>
      </div>
    </section>
  );
}

function BillingToggle({ billing, setBilling }: { billing: Billing; setBilling: (b: Billing) => void }) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
      <button
        type="button"
        onClick={() => setBilling("yearly")}
        className={`relative z-10 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors flex items-center gap-2 ${
          billing === "yearly" ? "text-white" : "text-white/60 hover:text-white"
        }`}
      >
        Yearly
        <span className={`text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded-full ${
          billing === "yearly" ? "bg-white/15" : "bg-violet/20 text-violet"
        }`}>-17%</span>
      </button>
      <button
        type="button"
        onClick={() => setBilling("monthly")}
        className={`relative z-10 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors ${
          billing === "monthly" ? "text-white" : "text-white/60 hover:text-white"
        }`}
      >
        Monthly
      </button>
      <span
        aria-hidden
        className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
        style={{
          left: billing === "yearly" ? "0.25rem" : "calc(50% + 0.125rem)",
          right: billing === "yearly" ? "calc(50% + 0.125rem)" : "0.25rem",
          background: "linear-gradient(135deg, rgba(109,40,255,0.7), rgba(217,70,239,0.55))",
          boxShadow: "0 6px 20px -6px rgba(168,85,247,0.6), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      />
    </div>
  );
}

/* ============ PRICING CARDS ============ */
function MainPricingCards({ billing }: { billing: Billing }) {
  const factor = billing === "yearly" ? 0.83 : 1;
  const fmt = (n: number) => (n === 0 ? "$0" : `$${(n * factor).toFixed(2).replace(/\.00$/, "")}`);
  const period = billing === "yearly" ? "/mo billed yearly" : "/month";

  const plans = [
    {
      name: "Free",
      desc: "Explore every AI feature",
      price: fmt(0),
      sub: "Free forever",
      icon: Sparkles,
      features: [
        "5 credits per day",
        "Virtual Try-On",
        "AI Fashion Stylist",
        "AI Pose Studio",
        "AI Fashion Store",
        "Watermarked results",
      ],
      cta: "Start Free",
      highlight: false,
      badge: null as string | null,
    },
    {
      name: "Plus",
      desc: "For regular creators",
      price: fmt(9.99),
      sub: billing === "yearly" ? "Billed yearly" : "Billed monthly",
      icon: Zap,
      features: [
        "50 credits per month",
        "Virtual Try-On",
        "AI Fashion Stylist",
        "AI Pose Studio",
        "AI Fashion Store",
        "Watermark-free results",
        "Priority processing",
        "HD downloads",
      ],
      cta: "Upgrade to Plus",
      highlight: true,
      badge: "POPULAR",
    },
    {
      name: "Pro",
      desc: "For power users & professionals",
      price: fmt(24.99),
      sub: billing === "yearly" ? "Billed yearly" : "Billed monthly",
      icon: Crown,
      features: [
        "200 credits per month",
        "Everything in Plus",
        "4x more credits",
        "Priority processing",
        "HD downloads",
        "Watermark-free results",
      ],
      cta: "Upgrade to Pro",
      highlight: false,
      badge: "BEST VALUE",
    },
  ];

  return (
    <section className="relative mt-20 sm:mt-24">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="grid gap-6 lg:gap-7 md:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <PricingCard plan={p} period={period} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  period,
}: {
  plan: {
    name: string;
    desc: string;
    price: string;
    sub: string;
    icon: typeof Sparkles;
    features: string[];
    cta: string;
    highlight: boolean;
    badge: string | null;
  };
  period: string;
}) {
  const Icon = plan.icon;
  const isPlus = plan.name === "Plus";
  const isPro = plan.name === "Pro";

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
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.18em]"
            style={{
              background: isPro
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

      <div className="mt-7 flex items-baseline gap-1">
        <span className="font-display text-5xl tracking-tight">{plan.price}</span>
        <span className="text-sm text-white/55">{plan.price === "$0" ? "" : period}</span>
      </div>
      <div className="mt-1 text-[12.5px] text-white/45">{plan.sub}</div>

      <Link
        to="/signup"
        className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-semibold transition-all ${
          plan.highlight ? "btn-primary" : "btn-secondary"
        }`}
      >
        {plan.cta} <ArrowRight size={15} />
      </Link>

      <div className="mt-7 h-px bg-white/[0.06]" />

      <ul className="mt-6 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[14px] text-white/75 leading-relaxed">
            <span
              className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full shrink-0 ${
                isPro ? "bg-amber-400/15 text-amber-300" : isPlus ? "bg-violet/20 text-violet" : "bg-white/5 text-white/60"
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

/* ============ PRIVACY NOTICE ============ */
function PrivacyNotice() {
  return (
    <section className="relative mt-20">
      <div className="mx-auto max-w-[1080px] px-6 sm:px-10">
        <Reveal>
          <div
            className="relative rounded-3xl p-7 sm:p-8 border overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(52, 211, 153, 0.08), rgba(16, 185, 129, 0.03))",
              borderColor: "rgba(52, 211, 153, 0.22)",
            }}
          >
            <div className="flex items-start gap-5">
              <span
                className="grid h-12 w-12 place-items-center rounded-2xl shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(52,211,153,0.35), rgba(16,185,129,0.2))",
                  boxShadow: "0 8px 24px -8px rgba(16,185,129,0.5)",
                }}
              >
                <Shield size={20} className="text-emerald-200" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl sm:text-2xl leading-snug text-white">
                  Your Privacy is Our Priority —{" "}
                  <span className="text-emerald-300">We Do Not Store Any of Your Images</span>
                </h3>
                <p className="mt-3 text-[14.5px] sm:text-[15px] text-white/70 leading-relaxed">
                  All uploaded photos and AI-generated results are automatically deleted after your
                  session. We never store, sell, or share your images. Try freely with complete
                  peace of mind.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ CREDIT PACKS ============ */
function CreditPacks() {
  const packs = [
    { credits: 250, price: 50, perCredit: "0.20", best: false },
    { credits: 500, price: 85, perCredit: "0.17", best: true },
    { credits: 1000, price: 150, perCredit: "0.15", best: false },
  ];
  return (
    <section className="relative mt-28">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal as="div" className="eyebrow justify-center">Top-Ups</Reveal>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
            <RevealLines lines={["Need More Credits?"]} step={120} />
          </h2>
          <Reveal as="p" delay={260} className="mt-5 text-[15px] sm:text-base text-white/65">
            One-time credit packs — never expire.
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-3">
          {packs.map((p, i) => (
            <Reveal key={p.credits} delay={i * 100}>
              <div
                className={`group relative h-full rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 ${
                  p.best
                    ? "bg-gradient-to-b from-violet/[0.12] to-transparent border border-violet/40"
                    : "surface-card"
                }`}
                style={
                  p.best
                    ? { boxShadow: "0 0 0 1px rgba(168,85,247,0.35), 0 25px 60px -25px rgba(168,85,247,0.5)" }
                    : undefined
                }
              >
                {p.best && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white"
                      style={{ background: "linear-gradient(135deg, #6D28FF, #D946EF)" }}
                    >
                      BEST VALUE
                    </span>
                  </div>
                )}
                <div className="text-[13px] uppercase tracking-[0.18em] text-white/50">Credit Pack</div>
                <div className="mt-3 font-display text-3xl">{p.credits.toLocaleString()} credits</div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl">${p.price}</span>
                  <span className="text-[13px] text-white/50">one-time</span>
                </div>
                <div className="mt-1 text-[13px] text-white/55">${p.perCredit} per credit</div>
                <Link
                  to="/signup"
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-[13.5px] font-semibold transition-all ${
                    p.best ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  Buy Pack <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ COMPARE PLANS ============ */
type Row = { label: string; free: string | boolean; plus: string | boolean; pro: string | boolean };
const ROWS: Row[] = [
  { label: "Virtual Try-On", free: true, plus: true, pro: true },
  { label: "AI Fashion Stylist", free: true, plus: true, pro: true },
  { label: "AI Pose Studio", free: true, plus: true, pro: true },
  { label: "AI Fashion Store", free: true, plus: true, pro: true },
  { label: "Credits", free: "5 / day", plus: "50 / month", pro: "200 / month" },
  { label: "Watermark-free results", free: false, plus: true, pro: true },
  { label: "Priority processing", free: false, plus: true, pro: true },
  { label: "HD downloads", free: false, plus: true, pro: true },
];

function Cell({ value, tone }: { value: string | boolean; tone?: "plus" | "pro" }) {
  if (typeof value === "string") {
    return <span className="text-[14px] text-white/80">{value}</span>;
  }
  if (value) {
    const cls =
      tone === "pro"
        ? "bg-amber-400/15 text-amber-300"
        : tone === "plus"
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

function ComparePlans() {
  return (
    <section className="relative mt-28">
      <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal as="div" className="eyebrow justify-center">Compare</Reveal>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            <RevealLines lines={["Compare Plans"]} step={120} />
          </h2>
        </div>

        <Reveal delay={200}>
          <div className="mt-12 surface-card overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center px-6 py-5 border-b border-white/[0.06] text-[12px] uppercase tracking-[0.18em] text-white/50">
                <div>Feature</div>
                <div className="text-center">Free</div>
                <div className="text-center text-violet">Plus</div>
                <div className="text-center text-amber-300">Pro</div>
              </div>
              {ROWS.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center px-6 py-4 text-[14.5px] ${
                    i !== ROWS.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  <div className="text-white/85">{r.label}</div>
                  <div className="flex justify-center"><Cell value={r.free} /></div>
                  <div className="flex justify-center"><Cell value={r.plus} tone="plus" /></div>
                  <div className="flex justify-center"><Cell value={r.pro} tone="pro" /></div>
                </div>
              ))}
            </div>
            {/* Mobile stacked */}
            <div className="md:hidden divide-y divide-white/[0.06]">
              {(["free", "plus", "pro"] as const).map((plan) => (
                <div key={plan} className="p-5">
                  <div
                    className={`text-[11px] uppercase tracking-[0.2em] font-semibold mb-4 ${
                      plan === "plus" ? "text-violet" : plan === "pro" ? "text-amber-300" : "text-white/55"
                    }`}
                  >
                    {plan}
                  </div>
                  <ul className="space-y-3">
                    {ROWS.map((r) => (
                      <li key={r.label} className="flex items-center justify-between gap-4">
                        <span className="text-[14px] text-white/80">{r.label}</span>
                        <Cell value={r[plan]} tone={plan === "free" ? undefined : plan} />
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
    q: "What is the right plan for me?",
    a: "Free is best for trying TryVerse. Plus is best for regular use. Pro is best for power users and professionals who need maximum credits and HD outputs.",
  },
  {
    q: "What are my payment options?",
    a: "We accept all major credit and debit cards. Yearly and monthly billing options are available, plus one-time credit packs for top-ups.",
  },
  {
    q: "How does credit-based pricing work?",
    a: "Credits are used when generating AI outputs like try-ons, poses, photoshoots and stylist suggestions. Each plan includes a monthly or daily credit allowance.",
  },
  {
    q: "Do credits roll over?",
    a: "Plan credits reset every cycle. One-time credit packs do not expire and stay in your account until you use them.",
  },
  {
    q: "Are my photos stored?",
    a: "No. Uploaded photos and generated images are automatically deleted after the session. We never store, sell, or share your images.",
  },
  {
    q: "Can I get credits back for failed results?",
    a: "Yes. If a generation fails, credits are not consumed or are automatically returned to your account.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative mt-28">
      <div className="mx-auto max-w-[860px] px-6 sm:px-10">
        <div className="text-center">
          <Reveal as="div" className="eyebrow justify-center">FAQ</Reveal>
          <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-5xl">
            <RevealLines lines={["Questions & Answers"]} step={120} />
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
            background:
              "linear-gradient(180deg, rgba(27,24,36,0.95), rgba(15,13,22,0.95))",
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
                lines={["Ready To Transform Your Style?"]}
                accentIndices={[0]}
                step={120}
              />
            </h2>
            <Reveal as="p" delay={280} className="mt-5 text-[15px] sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
              Start creating stunning AI fashion visuals today. Free to start.
            </Reveal>
            <Reveal delay={460} className="mt-9 flex flex-wrap justify-center gap-3">
              <Link to="/signup" className="btn-primary !py-4 !px-7 !text-[14px]">
                Get Started Free <ArrowRight size={16} />
              </Link>
              <Link to="/for-brands" className="btn-secondary !py-4 !px-7 !text-[14px]">
                For Brands
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
