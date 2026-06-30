import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShoppingBag, Shirt, Sparkles, Camera, Video, ShieldCheck, Sun, Palette, IdCard } from "lucide-react";
import { SHOPPER_USER, ShopperPageHeader } from "@/components/site/ShopperShell";

export const Route = createFileRoute("/dashboard/shoppers/")({
  component: ShopperHome,
});

const FEATURES = [
  {
    title: "AI Fashion Store",
    desc: "Browse curated items and virtually try them on your photo.",
    to: "/dashboard/shoppers/fashion-store",
    icon: ShoppingBag,
    gradient: "linear-gradient(135deg,#7c3aed 0%,#a855f7 45%,#ec4899 100%)",
    decor: "shop",
  },
  {
    title: "Virtual Try-On",
    desc: "Paste any product URL and see the outfit on yourself.",
    to: "/dashboard/shoppers/try-on",
    icon: Shirt,
    gradient: "linear-gradient(135deg,#4338ca 0%,#7c3aed 50%,#c026d3 100%)",
    decor: "tryon",
  },
  {
    title: "AI Fashion Stylist",
    desc: "Style advice, trip packing, product search — all in one AI assistant.",
    to: "/dashboard/shoppers/ai-stylist",
    icon: Sparkles,
    gradient: "linear-gradient(135deg,#be185d 0%,#9d174d 50%,#7c3aed 100%)",
    decor: "stylist",
  },
  {
    title: "Pose Studio",
    desc: "Transform outfit photos into professional fashion poses.",
    to: "/dashboard/shoppers/pose-studio",
    icon: Camera,
    gradient: "linear-gradient(135deg,#1e3a8a 0%,#4f46e5 50%,#a78bfa 100%)",
    decor: "pose",
  },
  {
    title: "Showcase Video",
    desc: "Turn any outfit into eye-catching short videos for Reels and TikTok.",
    to: "/dashboard/shoppers/video-studio",
    icon: Video,
    gradient: "linear-gradient(135deg,#581c87 0%,#a21caf 50%,#f0abfc 100%)",
    decor: "video",
  },
] as const;

const IDEAS = [
  {
    title: "Try a Summer Look",
    desc: "Upload your photo and paste any product URL to see how it looks on you.",
    to: "/dashboard/shoppers/try-on",
    icon: Sun,
    glow: "from-amber-500/15 to-pink-500/10",
  },
  {
    title: "Find Your Color Palette",
    desc: "Ask the AI Stylist which colors complement your skin tone best.",
    to: "/dashboard/shoppers/ai-stylist",
    icon: Palette,
    glow: "from-purple-500/15 to-fuchsia-500/10",
  },
  {
    title: "Generate a Headshot",
    desc: "Create professional poses perfect for LinkedIn or portfolios.",
    to: "/dashboard/shoppers/pose-studio",
    icon: IdCard,
    glow: "from-sky-500/15 to-indigo-500/10",
  },
] as const;

function FeatureDecor({ kind }: { kind: string }) {
  // Stylized clothing/apparel-only flourishes — no shoes/bags/accessories.
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      <svg className="absolute right-2 bottom-2 opacity-25" width="180" height="180" viewBox="0 0 200 200" fill="none">
        {kind === "shop" && (
          <g stroke="white" strokeWidth="1" opacity="0.85">
            <rect x="30" y="60" width="40" height="60" rx="4" />
            <rect x="80" y="60" width="40" height="60" rx="4" />
            <rect x="130" y="60" width="40" height="60" rx="4" />
            <line x1="20" y1="60" x2="180" y2="60" />
          </g>
        )}
        {kind === "tryon" && (
          <g stroke="white" strokeWidth="1" opacity="0.85">
            <path d="M70 40 L100 30 L130 40 L150 70 L130 80 L130 160 L70 160 L70 80 L50 70 Z" />
          </g>
        )}
        {kind === "stylist" && (
          <g stroke="white" strokeWidth="1" opacity="0.85">
            <circle cx="100" cy="80" r="22" />
            <path d="M55 170 C55 130 75 110 100 110 C125 110 145 130 145 170" />
            <path d="M40 60 L55 75 M160 60 L145 75" />
          </g>
        )}
        {kind === "pose" && (
          <g stroke="white" strokeWidth="1" opacity="0.85">
            <circle cx="80" cy="60" r="14" />
            <path d="M60 90 L80 80 L100 90 L110 130 L90 170 L80 170 L80 130 L70 130 L60 170 L50 170 L40 130 Z" />
            <circle cx="150" cy="60" r="14" />
            <path d="M130 90 L150 80 L170 90 L180 130 L160 170 L150 170 L150 130 L140 130 L130 170 L120 170 L110 130 Z" />
          </g>
        )}
        {kind === "video" && (
          <g stroke="white" strokeWidth="1" opacity="0.85">
            <rect x="40" y="40" width="120" height="120" rx="12" />
            <path d="M90 75 L130 100 L90 125 Z" fill="white" fillOpacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
}

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
              <div className="text-[12px] font-semibold text-purple-300 uppercase tracking-wider">
                {SHOPPER_USER.plan} Plan
              </div>
              <Sparkles size={14} className="text-purple-300" />
            </div>
            <div className="mt-1 text-[22px] font-display text-white">
              {SHOPPER_USER.credits} <span className="text-[13px] text-white/50 font-sans">credits</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.7)]" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 text-[12px] text-white/55">
              {SHOPPER_USER.monthly} monthly credits · No watermarks
            </div>
          </div>
        }
      />

      {/* Feature cards */}
      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.title}
              to={f.to}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:border-purple-400/40 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3]" style={{ background: f.gradient }}>
                <FeatureDecor kind={f.decor} />
                <span className="absolute top-3 left-3 grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur text-white border border-white/25">
                  <Icon size={16} />
                </span>
                <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur text-white border border-white/25 group-hover:bg-white group-hover:text-purple-700 transition">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className="p-5">
                <div className="font-display text-[18px] text-white">{f.title}</div>
                <p className="mt-1.5 text-[13.5px] text-white/60 leading-relaxed">{f.desc}</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Membership */}
      <section className="mt-10 relative overflow-hidden rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-700/40 via-fuchsia-700/30 to-indigo-700/30 backdrop-blur-xl p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[12px] font-medium text-white">
              <Sparkles size={12} /> Pro Member
            </div>
            <h2 className="font-display text-2xl sm:text-[28px] mt-3 text-white">You're a Pro Member</h2>
            <p className="mt-2 text-white/80 text-[14.5px] max-w-xl">
              {SHOPPER_USER.credits} of {SHOPPER_USER.monthly} credits remaining this month. Watermark-free, priority processing enabled.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["200/mo", "No Watermarks", "Priority AI"].map((b) => (
              <span key={b} className="rounded-full bg-white/12 border border-white/25 px-3 py-1.5 text-[12.5px] font-medium text-white">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 backdrop-blur px-5 py-4">
        <ShieldCheck size={20} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-[13.5px] text-emerald-100/90 leading-relaxed">
          <span className="font-semibold text-emerald-200">Your privacy is protected</span> — We do not store any of your uploaded photos or generated images. Everything is automatically deleted after your session.
        </p>
      </section>

      {/* Ideas */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-white">Ideas to try</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {IDEAS.map((i) => {
            const Icon = i.icon;
            return (
              <Link
                key={i.title}
                to={i.to}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${i.glow} backdrop-blur-xl p-5 hover:-translate-y-0.5 hover:border-purple-400/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition`}
              >
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
