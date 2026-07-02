import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, LayoutGrid, BarChart3, Settings, Package, Activity } from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";

export const Route = createFileRoute("/dashboard/brands/stores/$slug")({
  head: () => ({ meta: [{ title: "Store — TryVerse Brand" }] }),
  component: StoreDetail,
});

function pretty(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).replace(" And ", " And ");
}

function StoreDetail() {
  const { slug } = Route.useParams();
  const name = pretty(slug);

  return (
    <BrandShell title={name}>
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10 py-10">
        <Link to="/dashboard/brands/stores" className="inline-flex items-center gap-1.5 text-[12.5px] text-white/60 hover:text-white transition mb-4">
          <ArrowLeft size={13} /> Back to Stores
        </Link>

        <BrandPageHeader eyebrow="Store" title={name} subtitle="Manage this store's connection, products, and widget." />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Tile icon={LayoutGrid} title="Overview" desc="Store health and connection status." to="#" />
          <Tile icon={Package} title="Products" desc="Sync catalog and manage try-on eligibility." to="/dashboard/brands/catalog" />
          <Tile icon={Activity} title="Traffic" desc="Live impressions and try-on activity." to="/dashboard/brands/analytics" />
          <Tile icon={LayoutGrid} title="Widget" desc="Manage embed and try-on quota." to="/dashboard/brands/widget" />
          <Tile icon={BarChart3} title="Analytics" desc="Store-level performance metrics." to="/dashboard/brands/analytics" />
          <Tile icon={Settings} title="Settings" desc="Rename, disconnect, or update credentials." to="/dashboard/brands/settings" />
        </div>
      </section>
    </BrandShell>
  );
}

function Tile({ icon: Icon, title, desc, to }: { icon: React.ElementType; title: string; desc: string; to: string }) {
  return (
    <Link to={to} className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:border-purple-400/40 hover:shadow-[0_0_24px_rgba(168,85,247,0.2)] p-5 transition">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-purple-600/40 to-fuchsia-500/30 border border-white/10">
        <Icon size={16} className="text-white" />
      </span>
      <div className="mt-4 font-display text-[15px] text-white">{title}</div>
      <div className="mt-1 text-[12.5px] text-white/60">{desc}</div>
    </Link>
  );
}
