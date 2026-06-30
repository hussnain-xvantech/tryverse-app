import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Search, Shirt } from "lucide-react";
import { ShopperPageHeader } from "@/components/site/ShopperShell";
import { PRODUCTS, selectProduct, type Product } from "@/lib/shopper-store";

export const Route = createFileRoute("/dashboard/shoppers/fashion-store/")({
  head: () => ({
    meta: [
      { title: "AI Fashion Store — TryVerse" },
      { name: "description", content: "Browse curated clothing and try it on your own photo." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FashionStorePage,
});

const STORES = ["All", "Macy's", "Nordstrom", "Zara", "H&M", "Revolve", "Free People", "Anthropologie", "Urban Outfitters"];
const CATEGORIES = ["All", "Dress", "Jacket", "Cardigan", "Shirt", "Hoodie"];
const SORTS = ["Featured", "Price: Low to High", "Price: High to Low"];

function FashionStorePage() {
  const [query, setQuery] = useState("");
  const [store, setStore] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");

  const products = useMemo(() => {
    let p = PRODUCTS.filter((x) => {
      if (store !== "All" && x.store !== store) return false;
      if (category !== "All" && x.category !== category) return false;
      if (query && !`${x.name} ${x.store} ${x.category}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === "Price: Low to High") p = [...p].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") p = [...p].sort((a, b) => b.price - a.price);
    return p;
  }, [query, store, category, sort]);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13.5px] text-slate-600 hover:text-slate-900">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      <div className="mt-5">
        <ShopperPageHeader
          eyebrow="AI Fashion Store"
          title="Shop curated looks. Try them on you."
          subtitle="Browse clothing from popular stores and try outfits on your own photo before buying."
        />
      </div>

      {/* Search + filters */}
      <div className="mt-8 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dresses, jackets, shirts, outfits..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-10 pr-3 py-2.5 text-[14px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:bg-white"
            />
          </div>
          <Select label="Store" value={store} onChange={setStore} options={STORES} />
          <Select label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
          <Select label="Sort" value={sort} onChange={setSort} options={SORTS} />
        </div>

        {/* Store chips */}
        <div className="mt-4 -mx-1 flex flex-wrap gap-2">
          {STORES.map((s) => (
            <button
              key={s}
              onClick={() => setStore(s)}
              className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-medium border transition ${
                store === s
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-slate-900"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {products.length === 0 && (
          <div className="col-span-full rounded-2xl bg-white border border-dashed border-slate-300 p-10 text-center text-slate-500 text-[14px]">
            No products match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 py-2.5 text-[13.5px] text-slate-700 focus:outline-none focus:border-purple-400 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {label}: {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</span>
    </label>
  );
}

export function ProductVisual({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: product.gradient }}
      aria-label={`${product.name} preview`}
    >
      {/* Soft garment silhouette */}
      <div className="absolute inset-0 grid place-items-center">
        <Shirt size={86} strokeWidth={1} className="text-white/70 drop-shadow-md" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <ProductVisual product={product} className="aspect-[4/5]" />
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-display text-[15.5px] text-slate-900 truncate">{product.name}</div>
            <div className="mt-0.5 text-[12px] text-slate-500">
              {product.store} · {product.category}
            </div>
          </div>
          <div className="text-[15px] font-semibold text-slate-900 shrink-0">${product.price}</div>
        </div>
        <Link
          to="/dashboard/shoppers/fashion-store/try-on"
          onClick={() => selectProduct(product.id)}
          className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[13px] font-medium hover:opacity-95 transition"
        >
          Try On <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
