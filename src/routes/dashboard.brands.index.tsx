import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Camera, Shirt, Layers, Video, Wand2, LayoutGrid, FolderKanban, BarChart3,
  Palette, ArrowUpRight, Sparkles,
} from "lucide-react";
import { BrandShell, BrandPageHeader, BRAND_USER } from "@/components/site/BrandShell";
import editorialHero from "@/assets/editorial-hero.jpg";
import g1a from "@/assets/g1-after.jpg";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";
import g5a from "@/assets/g5-after.jpg";
import g6a from "@/assets/g6-after.jpg";
import ghost from "@/assets/ghost-mannequin-result.jpg";
import ctaResult from "@/assets/cta-result.jpg";

export const Route = createFileRoute("/dashboard/brands/")({
  component: BrandHome,
});

type Badge = "NEW" | "PREMIUM";
type Card = {
  title: string;
  desc: string;
  to: string;
  icon: React.ElementType;
  image: string;
  badge?: Badge;
};

const CARDS: Card[] = [
  { title: "AI Photoshoot", desc: "Create model-ready product photos from flat-lay, mannequin, or garment images.", to: "/dashboard/brands/photoshoot", icon: Camera, image: editorialHero },
  { title: "Product Design", desc: "Remove backgrounds, add text, apply styles, and create polished clothing product visuals.", to: "/dashboard/brands/product-design", icon: Palette, image: g6a },
  { title: "Ghost Mannequin", desc: "Transform flat-lay and mannequin photos into clean ghost mannequin product images.", to: "/dashboard/brands/ghost-mannequin", icon: Shirt, image: ghost, badge: "NEW" },
  { title: "Fabric Studio", desc: "Upload fabric swatches and create realistic clothing visuals from textile references.", to: "/dashboard/brands/fabric-studio", icon: Layers, image: g2a, badge: "NEW" },
  { title: "Pose Studio", desc: "Upload one photo and generate premium pose variations for catalog, editorial, and ecommerce.", to: "/dashboard/brands/pose-studio", icon: Wand2, image: g4a, badge: "PREMIUM" },
  { title: "Video Studio", desc: "Generate short fashion videos for product pages, Reels, TikTok, and ads.", to: "/dashboard/brands/video-studio", icon: Video, image: g5a, badge: "PREMIUM" },
  { title: "Widget", desc: "Add virtual try-on to your online store and let shoppers preview clothing before buying.", to: "/dashboard/brands/widget", icon: LayoutGrid, image: g1a },
  { title: "Catalog", desc: "Manage products, collections, brand assets, and generated visuals.", to: "/dashboard/brands/catalog", icon: FolderKanban, image: g3a },
  { title: "Analytics", desc: "Track engagement, try-ons, conversions, and top-performing clothing visuals.", to: "/dashboard/brands/analytics", icon: BarChart3, image: ctaResult },
];

function BadgePill({ kind }: { kind: Badge }) {
  const map: Record<Badge, string> = {
    NEW: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    PREMIUM: "bg-gradient-to-r from-amber-400/25 to-fuchsia-500/20 text-amber-200 border-amber-300/30",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold tracking-wider ${map[kind]}`}>
      {kind}
    </span>
  );
}

function BrandHome() {
  return (
    <BrandShell title="Dashboard">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10">
        <BrandPageHeader
          eyebrow="Brand Studio"
          title={`Welcome back, ${BRAND_USER.name}`}
          subtitle={`Here's your creative studio overview for ${BRAND_USER.brand}.`}
        />

        <div className="mt-8 rounded-2xl border border-purple-400/25 bg-gradient-to-r from-purple-600/15 via-fuchsia-500/10 to-transparent backdrop-blur-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <div className="flex items-center gap-4 min-w-0">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] shrink-0">
              <Sparkles size={20} />
            </span>
            <div className="min-w-0">
              <div className="text-[12px] uppercase tracking-widest text-purple-300/80">Your AI Credits</div>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="font-display text-2xl text-white">Unlimited</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-2 py-0.5 text-[10.5px] font-semibold tracking-wider text-white/90">
                  SUITE
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/dashboard/brands/billing"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 px-5 py-2.5 text-[13.5px] font-medium text-white transition"
          >
            Manage <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                to={c.to}
                className="group relative block h-72 rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(168,85,247,0.35)]"
              >
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070210] via-[#070210]/70 to-[#070210]/30" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent" />
                <div className="relative h-full flex flex-col justify-between p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-purple-600/60 to-fuchsia-500/40 border border-white/15 shadow-[0_0_18px_rgba(168,85,247,0.35)]">
                      <Icon size={17} className="text-white" />
                    </span>
                    {c.badge && <BadgePill kind={c.badge} />}
                  </div>
                  <div>
                    <div className="font-display text-lg text-white flex items-center gap-1.5">
                      {c.title}
                      <ArrowUpRight size={15} className="text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-1.5 text-[13px] text-white/70 leading-relaxed line-clamp-2">{c.desc}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </BrandShell>
  );
}
