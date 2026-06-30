import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Download, RotateCcw, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { getSelectedProduct, getUserPhoto, type Product } from "@/lib/shopper-store";
import { ProductVisual } from "./dashboard.shoppers.fashion-store.index";

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
      <Link to="/dashboard/shoppers/fashion-store" className="inline-flex items-center gap-1.5 text-[13.5px] text-slate-600 hover:text-slate-900">
        <ArrowLeft size={14} /> Back to Store
      </Link>

      <div className="mt-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11.5px] font-semibold text-emerald-700 uppercase tracking-wider">
          <Sparkles size={11} /> Result Ready
        </div>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl text-slate-900">Your Try-On Result</h1>
        <p className="mt-2 text-[15px] text-slate-600 max-w-2xl">
          Compare the original product, your photo, and the rendered try-on side by side.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <ResultCard label="Selected Product">
          {product ? <ProductVisual product={product} className="aspect-[3/4]" /> : <EmptyTile label="No product" />}
          {product && (
            <div className="p-4">
              <div className="font-display text-[15px] text-slate-900">{product.name}</div>
              <div className="text-[12.5px] text-slate-500 mt-0.5">
                {product.store} · ${product.price}
              </div>
            </div>
          )}
        </ResultCard>

        <ResultCard label="Your Photo">
          {photo ? (
            <div className="aspect-[3/4] bg-slate-100">
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
              {/* Overlay the product's color signature onto the photo */}
              <div
                className="absolute inset-0 mix-blend-soft-light opacity-80"
                style={{ background: product.gradient }}
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                <div className="rounded-xl bg-white/85 backdrop-blur px-3 py-1.5">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider">Wearing</div>
                  <div className="text-[13px] font-semibold text-slate-900 leading-tight">{product.name}</div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-600 text-white px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider">
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
        <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-[13.5px] font-medium hover:bg-slate-700 transition">
          <Download size={14} /> Download Result
        </button>
        <Link to="/dashboard/shoppers/fashion-store" className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 text-slate-800 px-5 py-2.5 text-[13.5px] font-medium hover:border-purple-300 hover:text-purple-700 transition">
          <RotateCcw size={14} /> Try Another Outfit
        </Link>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 text-slate-800 px-5 py-2.5 text-[13.5px] font-medium hover:border-purple-300 hover:text-purple-700 transition"
        >
          <ExternalLink size={14} /> Open Product Store
        </a>
        <Link to="/dashboard/shoppers" className="ml-auto text-[13.5px] text-slate-600 hover:text-slate-900">
          Back to Dashboard
        </Link>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
        <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-[13px] text-emerald-900 leading-relaxed">
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
      className={`rounded-2xl bg-white border overflow-hidden shadow-sm ${
        highlight ? "border-purple-300 ring-2 ring-purple-200" : "border-slate-200"
      }`}
    >
      <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100">
        <div className="text-[12px] font-semibold uppercase tracking-wider text-slate-600">{label}</div>
        {highlight && <span className="text-[11px] font-semibold text-purple-700">Generated</span>}
      </div>
      {children}
    </div>
  );
}

function EmptyTile({ label }: { label: string }) {
  return (
    <div className="aspect-[3/4] grid place-items-center bg-slate-50 text-[13px] text-slate-400 px-6 text-center">
      {label}
    </div>
  );
}
