import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShoppingBag, Shirt, Sparkles, Camera, Video, ShieldCheck, Sun, Palette, IdCard } from "lucide-react";
import { SHOPPER_USER, ShopperPageHeader } from "@/components/site/ShopperShell";
import editorialHero from "@/assets/editorial-hero.jpg";
import g1a from "@/assets/g1-after.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";

export const Route = createFileRoute("/dashboard/shoppers/")({
  component: ShopperHome,
});

const FEATURES = [
  {
    title: "AI Fashion Store",
    desc: "Browse curated items and virtually try them on your photo.",
    to: "/dashboard/shoppers/fashion-store",
    icon: ShoppingBag,
    image: editorialHero,
  },
  {
    title: "Virtual Try-On",
    desc: "Paste any product URL and see the outfit on yourself.",
    to: "/dashboard/shoppers/try-on",
    icon: Shirt,
    image: g1a,
  },
  {
    title: "AI Fashion Stylist",
    desc: "Style advice, trip packing, product search — all in one AI assistant.",
    to: "/dashboard/shoppers/ai-stylist",
    icon: Sparkles,
    image: g3a,
  },
  {
    title: "Pose Studio",
    desc: "Transform outfit photos into professional fashion poses.",
    to: "/dashboard/shoppers/pose-studio",
    icon: Camera,
    image: g4a,
  },
  {
    title: "Showcase Video",
    desc: "Turn any outfit into eye-catching short videos for Reels and TikTok.",
    to: "/dashboard/shoppers/video-studio",
    icon: Video,
    image: g5a,
    video: true,
  },
] as const;

const IDEAS = [
  { title: "Try a Summer Look", desc: "Upload your photo and paste any product URL to see how it looks on you.", to: "/dashboard/shoppers/try-on", icon: Sun, glow: "from-amber-500/15 to-pink-500/10" },
  { title: "Find Your Color Palette", desc: "Ask the AI Stylist which colors complement your skin tone best.", to: "/dashboard/shoppers/ai-stylist", icon: Palette, glow: "from-purple-500/15 to-fuchsia-500/10" },
  { title: "Generate a Headshot", desc: "Create professional poses perfect for LinkedIn or portfolios.", to: "/dashboard/shoppers/pose-studio", icon: IdCard, glow: "from-sky-500/15 to-indigo-500/10" },
] as const;

function ShopperHome() {
  const date = "TUESDAY, JUNE 30";
  const pct = Math.round((SHOPPER_USER.credits / SHOPPER_USER.monthly) * 100);
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <ShopperPageHeader
        eyebrow={date}
        title={`Welcome back, ${SHOPPER_USER.name}`}
        subtitle="What would you like to create today?"
        right={
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(168,85,247,0.15)] w-full md:w-[280px]">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold text-purple-300 uppercase tracking-wider">{SHOPPER_USER.plan} Plan</div>
              <Sparkles size={14} className="text-purple-300" />
            </div>
            <div className="mt-1 text-[22px] font-display text-white">
              {SHOPPER_USER.credits} <span className="text-[13px] text-white/50 font-sans">credits</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.7)]" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 text-[12px] text-white/55">{SHOPPER_USER.monthly} monthly credits · No watermarks</div>
          </div>
        }
      />

      <section className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-500/[0.07] backdrop-blur px-4 py-3">
        <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-[13px] text-emerald-100/85 leading-relaxed">
          <span className="font-semibold text-emerald-200">Your privacy is protected</span> — We do not store uploaded photos or generated images. Everything is automatically deleted after your session.
        </p>
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.title}
              to={f.to}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:border-purple-400/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={f.image} alt={f.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
                <span className="absolute top-3 left-3 grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur text-white border border-white/25">
                  <Icon size={16} />
                </span>
                <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur text-white border border-white/25 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-fuchsia-500 group-hover:border-transparent transition">
                  <ArrowUpRight size={16} />
                </span>
                {("video" in f && f.video) && (
                  <span className="absolute inset-0 grid place-items-center pointer-events-none">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 backdrop-blur border border-white/30">
                      <span className="ml-0.5 h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white" />
                    </span>
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="font-display text-[18px] text-white">{f.title}</div>
                <p className="mt-1.5 text-[13.5px] text-white/60 leading-relaxed">{f.desc}</p>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-white">Ideas to try</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {IDEAS.map((i) => {
            const Icon = i.icon;
            return (
              <Link key={i.title} to={i.to} className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${i.glow} backdrop-blur-xl p-5 hover:-translate-y-0.5 hover:border-purple-400/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition`}>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 border border-white/15 text-purple-200">
                  <Icon size={16} />
                </span>
                <div className="mt-4 font-display text-[17px] text-white">{i.title}</div>
                <p className="mt-1.5 text-[13px] text-white/65 leading-relaxed">{i.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-purple-300">
                  Start <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
