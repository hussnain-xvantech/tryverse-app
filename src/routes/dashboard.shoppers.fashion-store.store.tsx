import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Search, Shirt } from "lucide-react";
import { PRODUCTS, getSelectedStore, selectProduct, type Product, type Store } from "@/lib/shopper-store";

export const Route = createFileRoute("/dashboard/shoppers/fashion-store/store")({
  head: () => ({
    meta: [
      { title: "Store Products — TryVerse" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StorePage,
});

const GENDERS = ["All", "Women", "Men"] as const;

function StorePage() {
  const [store, setStore] = useState<Store | null>(null);
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState<(typeof GENDERS)[number]>("All");

  useEffect(() => {
    setStore(getSelectedStore());
  }, []);

  // Demo: always show 12th Tribe catalog regardless of selected store
  const products = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (gender !== "All" && p.gender !== gender) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, gender]);

  const displayName = store?.name ?? "12th Tribe";
  const displayDomain = store?.domain ?? "12thtribe.com";

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers/fashion-store" className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> All Stores
      </Link>

      <div className="mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white">{displayName}</h1>
          <p className="mt-2 text-[14.5px] text-white/55">
            {PRODUCTS.length} products available for virtual try-on
          </p>
        </div>
        <a
          href={`https://${displayDomain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-purple-300 hover:text-purple-200"
        >
          Visit Website <ExternalLink size={13} />
        </a>
      </div>

      {/* Filters */}
      <div className="mt-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur p-4">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-2.5 text-[14px] text-white placeholder-white/40 focus:outline-none focus:border-purple-400/50 focus:bg-white/[0.07] transition"
            />
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 p-1">
            {GENDERS.map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-3.5 py-1.5 rounded-lg text-[12.5px] font-medium transition ${
                  gender === g
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-[0_0_14px_rgba(168,85,247,0.4)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* CTA banner */}
      <div className="mt-10 relative overflow-hidden rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-700/40 via-fuchsia-700/30 to-indigo-700/30 backdrop-blur-xl p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="relative">
          <h3 className="font-display text-2xl text-white">Ready to try something on?</h3>
          <p className="mt-1.5 text-[14px] text-white/75 max-w-xl">
            Upload your photo and see how any item looks on you instantly.
          </p>
        </div>
        <Link
          to="/dashboard/shoppers/fashion-store/try-on"
          onClick={() => selectProduct("madonna-rust")}
          className="relative inline-flex items-center gap-2 rounded-full bg-white text-purple-700 px-5 py-2.5 text-[13.5px] font-semibold hover:scale-105 transition shadow-[0_0_24px_rgba(255,255,255,0.3)]"
        >
          Start Try-On <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export function ProductVisual({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: product.gradient }}
      aria-label={`${product.name} preview`}
    >
      <div className="absolute inset-0 grid place-items-center">
        <Shirt size={80} strokeWidth={1} className="text-white/75 drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/dashboard/shoppers/fashion-store/try-on"
      onClick={() => selectProduct(product.id)}
      className="group relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="relative">
        <ProductVisual product={product} className="aspect-[3/4]" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition flex items-end justify-center pb-4">
          <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 rounded-full bg-white text-purple-700 px-4 py-1.5 text-[12px] font-semibold shadow-lg">
            Try On <ArrowRight size={12} />
          </span>
        </div>
        <span className="absolute top-2 left-2 rounded-full bg-black/40 backdrop-blur text-[10px] font-semibold text-white px-2 py-0.5 uppercase tracking-wider">
          {product.gender}
        </span>
      </div>
      <div className="p-3.5 flex flex-col flex-1">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-purple-300/80">
          {product.store}
        </div>
        <div className="mt-1 font-display text-[14px] text-white leading-snug line-clamp-2">{product.name}</div>
        <div className="mt-auto pt-2 text-[14px] font-semibold text-white">${product.price}.00</div>
      </div>
    </Link>
  );
}
