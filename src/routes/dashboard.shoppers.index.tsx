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
    image: "linear-gradient(135deg,#A78BFA 0%,#D8B4FE 45%,#FBCFE8 100%)",
  },
  {
    title: "Virtual Try-On",
    desc: "Paste any product URL and see the outfit on yourself.",
    to: "/dashboard/shoppers/try-on",
    icon: Shirt,
    image: "linear-gradient(135deg,#818CF8 0%,#C4B5FD 50%,#FDE68A 100%)",
  },
  {
    title: "AI Fashion Stylist",
    desc: "Style advice, trip packing, product search — all in one AI assistant.",
    to: "/dashboard/shoppers/ai-stylist",
    icon: Sparkles,
    image: "linear-gradient(135deg,#F472B6 0%,#FBCFE8 50%,#FBBF24 100%)",
  },
  {
    title: "Pose Studio",
    desc: "Transform outfit photos into professional fashion poses.",
    to: "/dashboard/shoppers/pose-studio",
    icon: Camera,
    image: "linear-gradient(135deg,#60A5FA 0%,#A5B4FC 50%,#E9D5FF 100%)",
  },
  {
    title: "Showcase Video",
    desc: "Turn any outfit into eye-catching short videos for Reels and TikTok.",
    to: "/dashboard/shoppers/video-studio",
    icon: Video,
    image: "linear-gradient(135deg,#F0ABFC 0%,#C084FC 50%,#7C3AED 100%)",
  },
];

const IDEAS = [
  {
    title: "Try a Summer Look",
    desc: "Upload your photo and paste any product URL to see how it looks on you.",
    to: "/dashboard/shoppers/try-on",
    icon: Sun,
    tone: "from-amber-100 to-pink-100",
  },
  {
    title: "Find Your Color Palette",
    desc: "Ask the AI Stylist which colors complement your skin tone best.",
    to: "/dashboard/shoppers/ai-stylist",
    icon: Palette,
    tone: "from-purple-100 to-fuchsia-100",
  },
  {
    title: "Generate a Headshot",
    desc: "Create professional poses perfect for LinkedIn or portfolios.",
    to: "/dashboard/shoppers/pose-studio",
    icon: IdCard,
    tone: "from-sky-100 to-indigo-100",
  },
] as const;

function ShopperHome() {
  const date = "TUESDAY, JUNE 30";
  const pct = Math.round((SHOPPER_USER.credits / SHOPPER_USER.monthly) * 100);
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <ShopperPageHeader
        eyebrow={date}
        title={`Welcome back, ${SHOPPER_USER.name.split(" ")[0]}`}
        subtitle="What would you like to create today?"
        right={
          <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm w-full md:w-[280px]">
            <div className="flex items-center justify-between">
              <div className="text-[12px] font-semibold text-purple-700 uppercase tracking-wider">
                {SHOPPER_USER.plan} Plan
              </div>
              <Sparkles size={14} className="text-purple-600" />
            </div>
            <div className="mt-1 text-[22px] font-display text-slate-900">
              {SHOPPER_USER.credits} <span className="text-[13px] text-slate-500 font-sans">credits</span>
            </div>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 text-[12px] text-slate-500">
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
              className="group relative block overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3]" style={{ background: f.image }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 grid h-9 w-9 place-items-center rounded-xl bg-white/85 backdrop-blur text-purple-700 border border-white/60">
                  <Icon size={16} />
                </span>
                <span className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-xl bg-white/85 backdrop-blur text-slate-700 border border-white/60 group-hover:bg-purple-600 group-hover:text-white transition">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className="p-5">
                <div className="font-display text-[18px] text-slate-900">{f.title}</div>
                <p className="mt-1.5 text-[13.5px] text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Membership */}
      <section className="mt-10 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[12px] font-medium">
              <Sparkles size={12} /> Pro Member
            </div>
            <h2 className="font-display text-2xl sm:text-[28px] mt-3">You're a Pro Member</h2>
            <p className="mt-2 text-white/85 text-[14.5px] max-w-xl">
              {SHOPPER_USER.credits} of {SHOPPER_USER.monthly} credits remaining this month. Watermark-free, priority processing enabled.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["200/mo", "No Watermarks", "Priority AI"].map((b) => (
              <span key={b} className="rounded-full bg-white/15 border border-white/25 px-3 py-1.5 text-[12.5px] font-medium">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
        <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-[13.5px] text-emerald-900 leading-relaxed">
          <span className="font-semibold">Your privacy is protected</span> — We do not store any of your uploaded photos or generated images. Everything is automatically deleted after your session.
        </p>
      </section>

      {/* Ideas */}
      <section className="mt-10">
        <h2 className="font-display text-2xl text-slate-900">Ideas to try</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {IDEAS.map((i) => {
            const Icon = i.icon;
            return (
              <Link
                key={i.title}
                to={i.to}
                className={`group rounded-2xl bg-gradient-to-br ${i.tone} p-5 border border-white/60 hover:-translate-y-0.5 hover:shadow-md transition`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/80 text-purple-700">
                  <Icon size={16} />
                </span>
                <div className="mt-4 font-display text-[17px] text-slate-900">{i.title}</div>
                <p className="mt-1.5 text-[13px] text-slate-700 leading-relaxed">{i.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-purple-700">
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
