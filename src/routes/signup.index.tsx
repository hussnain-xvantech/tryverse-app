import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Building2 } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/signup/")({
  head: () => ({
    meta: [
      { title: "Sign up — TryVerse" },
      {
        name: "description",
        content: "Create your TryVerse account — start as a shopper or as a fashion brand.",
      },
    ],
  }),
  component: SignupSelector,
});

function SignupSelector() {
  const cards = [
    {
      to: "/signup/shoppers" as const,
      icon: ShoppingBag,
      eyebrow: "For Shoppers",
      title: "Start as Shopper",
      desc: "Try clothes on before buying.",
      cta: "Start as Shopper",
      tone: "violet" as const,
    },
    {
      to: "/signup/brands" as const,
      icon: Building2,
      eyebrow: "For Brands",
      title: "Start as Brand",
      desc: "Create AI photoshoots, videos, and store-ready visuals.",
      cta: "Start as Brand",
      tone: "magenta" as const,
    },
  ];
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      <Header />
      <main className="relative pt-[120px] pb-32">
        <section className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 -top-10 -z-10 h-[600px] w-[1000px] -translate-x-1/2 opacity-60"
            style={{ background: "var(--gradient-glow)", filter: "blur(60px)" }}
          />
          <div className="mx-auto max-w-[860px] px-6 sm:px-10 text-center">
            <Reveal as="div" className="eyebrow justify-center">Sign up</Reveal>
            <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[56px] leading-[1.05]">
              <RevealLines lines={["Start With TryVerse"]} step={130} />
            </h1>
            <Reveal as="p" delay={340} className="mt-6 text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Choose the account type that fits you best.
            </Reveal>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1100px] px-6 sm:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.to} delay={i * 120}>
                  <Link
                    to={c.to}
                    className="group relative block h-full rounded-3xl p-8 sm:p-10 surface-card transition-all duration-300 hover:-translate-y-1"
                    style={{
                      boxShadow:
                        "0 0 0 1px rgba(168,85,247,0.18), 0 30px 80px -40px rgba(168,85,247,0.45)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background:
                          c.tone === "magenta"
                            ? "radial-gradient(70% 50% at 50% 0%, rgba(217,70,239,0.18), transparent 75%)"
                            : "radial-gradient(70% 50% at 50% 0%, rgba(109,40,255,0.22), transparent 75%)",
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <span
                          className="grid h-12 w-12 place-items-center rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(109,40,255,0.4), rgba(217,70,239,0.35))",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <Icon size={20} className="text-white" />
                        </span>
                        <div className="eyebrow !m-0">{c.eyebrow}</div>
                      </div>
                      <h2 className="font-display mt-6 text-2xl sm:text-3xl leading-snug">{c.title}</h2>
                      <p className="mt-3 text-[15px] text-white/70 leading-relaxed">{c.desc}</p>
                      <div className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-white">
                        {c.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      </main>
      <Footer variant="minimal" />
    </div>
  );
}
