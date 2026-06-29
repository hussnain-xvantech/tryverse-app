import { createFileRoute, Link } from "@tanstack/react-router";
import { Shirt, Sparkles, Camera, Video, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/dashboard/shoppers")({
  head: () => ({
    meta: [
      { title: "Shopper Dashboard — TryVerse" },
      { name: "description", content: "Your TryVerse shopper dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ShopperDashboard,
});

const CARDS = [
  { icon: Shirt, title: "Virtual Try-On", desc: "Try outfits on your own photo.", to: "/virtual-try-on" },
  { icon: Sparkles, title: "AI Stylist", desc: "Get outfit ideas from Stylo.", to: "/for-shoppers" },
  { icon: Camera, title: "Pose Studio", desc: "Generate fresh pose variations.", to: "/features/pose-studio" },
  { icon: Video, title: "Showcase Video", desc: "Turn looks into short videos.", to: "/features/video-studio" },
];

function ShopperDashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      <Header />
      <main className="relative pt-[120px] pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 -top-10 -z-10 h-[560px] w-[1000px] -translate-x-1/2 opacity-50"
          style={{ background: "var(--gradient-glow)", filter: "blur(60px)" }}
        />
        <section className="mx-auto max-w-[1100px] px-6 sm:px-10">
          <Reveal as="div" className="eyebrow">Shopper Dashboard</Reveal>
          <h1 className="font-display mt-5 text-3xl sm:text-4xl lg:text-[52px] leading-[1.05]">
            <RevealLines lines={["Welcome to your TryVerse", "Shopper Dashboard"]} accentIndices={[1]} step={130} />
          </h1>
          <Reveal as="p" delay={300} className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
            Try outfits, explore stores, use Stylo, and manage your fashion try-on results.
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 80}>
                  <Link
                    to={c.to}
                    className="group block h-full surface-card rounded-2xl p-6 transition-all hover:-translate-y-1"
                    style={{ boxShadow: "0 0 0 1px rgba(168,85,247,0.12)" }}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{ background: "linear-gradient(135deg, rgba(109,40,255,0.4), rgba(217,70,239,0.3))", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Icon size={18} className="text-white" />
                    </span>
                    <div className="mt-5 font-display text-lg">{c.title}</div>
                    <div className="mt-1.5 text-[13.5px] text-white/65 leading-relaxed">{c.desc}</div>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-white/80">
                      Open <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
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
