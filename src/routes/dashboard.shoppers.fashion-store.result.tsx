import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, RotateCcw, ExternalLink, ShieldCheck, Sparkles, Shirt } from "lucide-react";
import { getSelectedProduct, getUserPhoto, type Product } from "@/lib/shopper-store";
import { ProductVisual } from "./dashboard.shoppers.fashion-store.store";

export const Route = createFileRoute("/dashboard/shoppers/fashion-store/result")({
  head: () => ({ meta: [{ title: "Your Try-On Result — TryVerse" }, { name: "robots", content: "noindex" }] }),
  component: ResultPage,
});

function ResultPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    setProduct(getSelectedProduct());
    setPhoto(getUserPhoto());
  }, []);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers/fashion-store/store" className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Store
      </Link>

      <div className="mt-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-[11.5px] font-semibold text-emerald-200 uppercase tracking-wider">
          <Sparkles size={11} /> Result Ready
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl text-white">Your Try-On Result</h1>
        <p className="mt-2 text-[15px] text-white/60 max-w-2xl">
          Here's how the selected outfit looks on you. Compare side by side and download your result.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <ResultCard label="Selected Product">
          {product ? <ProductVisual product={product} className="aspect-[3/4]" /> : <EmptyTile label="No product" />}
          {product && (
            <div className="p-4">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-purple-300/80">{product.store}</div>
              <div className="font-display text-[15px] text-white mt-0.5 leading-snug">{product.name}</div>
              <div className="text-[13px] text-white/70 mt-1">${product.price}.00</div>
            </div>
          )}
        </ResultCard>

        <ResultCard label="Your Photo">
          {photo ? (
            <div className="aspect-[3/4] bg-black/40">
              <img src={photo} alt="Your uploaded photo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <EmptyTile label="No photo uploaded" />
          )}
        </ResultCard>

        <ResultCard label="Try-On Result" highlight>
          {product && photo ? (
            <div className="relative aspect-[3/4] overflow-hidden">
              <img src={photo} alt="You wearing the selected outfit" className="absolute inset-0 w-full h-full object-cover" />
              {/* Garment color overlay matching selected product */}
              <div
                className="absolute inset-x-0 bottom-0 h-[68%]"
                style={{ background: product.gradient, mixBlendMode: "soft-light", opacity: 0.95 }}
                aria-hidden
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[68%]"
                style={{ background: product.gradient, mixBlendMode: "multiply", opacity: 0.45 }}
                aria-hidden
              />
              <Shirt
                size={140}
                strokeWidth={0.6}
                className="absolute left-1/2 bottom-6 -translate-x-1/2 text-white/35"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                <div className="rounded-xl bg-black/55 backdrop-blur px-3 py-1.5 border border-white/15">
                  <div className="text-[10px] text-white/70 uppercase tracking-wider">Wearing</div>
                  <div className="text-[12.5px] font-semibold text-white leading-tight">{product.name}</div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider shadow-[0_0_18px_rgba(168,85,247,0.5)]">
                  <Sparkles size={11} /> AI
                </span>
              </div>
            </div>
          ) : (
            <EmptyTile label="Run the flow to see your result" />
          )}
        </ResultCard>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13.5px] font-semibold hover:scale-[1.02] transition shadow-[0_0_24px_rgba(168,85,247,0.4)]">
          <Download size={14} /> Download Result
        </button>
        <Link
          to="/dashboard/shoppers/fashion-store/store"
          className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 text-white/85 px-5 py-2.5 text-[13.5px] font-medium hover:bg-white/10 hover:border-purple-400/50 transition"
        >
          <RotateCcw size={14} /> Try Another Outfit
        </Link>
        <Link
          to="/dashboard/shoppers/fashion-store"
          className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 text-white/85 px-5 py-2.5 text-[13.5px] font-medium hover:bg-white/10 hover:border-purple-400/50 transition"
        >
          Back to Store
        </Link>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/15 text-white/85 px-5 py-2.5 text-[13.5px] font-medium hover:bg-white/10 hover:border-purple-400/50 transition"
        >
          <ExternalLink size={14} /> Open Product Store
        </a>
        <Link to="/dashboard/shoppers" className="ml-auto text-[13.5px] text-white/55 hover:text-white">
          Back to Dashboard
        </Link>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-4">
        <ShieldCheck size={18} className="text-emerald-400 shrink-0 mt-0.5" />
        <p className="text-[13px] text-emerald-100/90 leading-relaxed">
          Your uploaded photo and result are not stored after your session.
        </p>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  highlight,
  children,
}: {
  label: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.04] border backdrop-blur overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.35)] ${
        highlight ? "border-purple-400/50 shadow-[0_0_50px_rgba(168,85,247,0.3)]" : "border-white/10"
      }`}
    >
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-white/65">{label}</div>
        {highlight && <span className="text-[11px] font-semibold text-purple-300">Generated</span>}
      </div>
      {children}
    </div>
  );
}

function EmptyTile({ label }: { label: string }) {
  return (
    <div className="aspect-[3/4] grid place-items-center bg-black/30 text-[13px] text-white/40 px-6 text-center">
      {label}
    </div>
  );
}
