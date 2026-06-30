import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, Store as StoreIcon } from "lucide-react";
import { ShopperPageHeader } from "@/components/site/ShopperShell";
import { STORES, selectStore, type Store } from "@/lib/shopper-store";

export const Route = createFileRoute("/dashboard/shoppers/fashion-store/")({
  head: () => ({
    meta: [
      { title: "AI Fashion Store — TryVerse" },
      { name: "description", content: "Explore supported fashion stores and try outfits on your photo." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FashionStoreDirectory,
});

function FashionStoreDirectory() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return STORES;
    return STORES.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <ShopperPageHeader
        eyebrow="Virtual Try-On Marketplace"
        title="Explore Fashion Stores"
        subtitle="Browse clothing from supported brands and try outfits on your photo before you buy."
      />

      {/* Search */}
      <div className="mt-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur p-4 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stores by name..."
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-2.5 text-[14px] text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/[0.07] transition"
          />
        </div>
      </div>

      {/* Store grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <StoreCard key={s.id} store={s} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center text-white/50 text-[14px]">
            No stores match your search.
          </div>
        )}
      </div>
    </div>
  );
}

function StoreCard({ store }: { store: Store }) {
  return (
    <Link
      to="/dashboard/shoppers/fashion-store/store"
      onClick={() => selectStore(store.id)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur shadow-[0_8px_40px_rgba(0,0,0,0.35)] hover:border-purple-400/50 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-300"
    >
      <div className="p-5 flex items-center gap-4">
        <div
          className="grid h-14 w-14 place-items-center rounded-2xl text-white font-display text-[18px] shrink-0 shadow-[0_0_24px_rgba(168,85,247,0.25)]"
          style={{ background: store.gradient }}
        >
          {store.initial}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-display text-[17px] text-white truncate">{store.name}</div>
          <div className="text-[12.5px] text-white/50 truncate">{store.domain}</div>
          <div className="mt-1 text-[12px] text-purple-300/90 font-medium">
            {store.products} products available
          </div>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 border border-white/10 text-white/70 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-fuchsia-500 group-hover:text-white group-hover:border-transparent transition">
          <ArrowUpRight size={15} />
        </span>
      </div>
      {/* Preview garment swatches */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-4 gap-2">
          {store.swatches.map((c, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg border border-white/10 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${c}, ${c}cc)` }}
            >
              <StoreIcon size={20} className="absolute inset-0 m-auto text-white/35" strokeWidth={1} />
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
