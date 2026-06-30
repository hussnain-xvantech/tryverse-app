import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Upload, ShieldCheck, X, ImageIcon } from "lucide-react";
import { getSelectedProduct, setUserPhoto, type Product } from "@/lib/shopper-store";
import { ProductVisual } from "./dashboard.shoppers.fashion-store.index";

export const Route = createFileRoute("/dashboard/shoppers/fashion-store/try-on")({
  head: () => ({ meta: [{ title: "Try-On — TryVerse" }, { name: "robots", content: "noindex" }] }),
  component: TryOnFlow,
});

function TryOnFlow() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setProduct(getSelectedProduct());
  }, []);

  function onFiles(files: FileList | null) {
    const f = files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || "");
      setPhoto(url);
      setUserPhoto(url);
    };
    reader.readAsDataURL(f);
  }

  function generate() {
    if (!product || !photo) return;
    setGenerating(true);
    setTimeout(() => navigate({ to: "/dashboard/shoppers/fashion-store/result" }), 800);
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers/fashion-store" className="inline-flex items-center gap-1.5 text-[13.5px] text-slate-600 hover:text-slate-900">
        <ArrowLeft size={14} /> Back to Store
      </Link>

      <div className="mt-5">
        <div className="text-[11.5px] font-semibold tracking-[0.18em] uppercase text-purple-600">Step 2 of 3</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl text-slate-900">Try This Outfit On You</h1>
        <p className="mt-2 text-[15px] text-slate-600 max-w-2xl">
          We'll combine your selected product with your photo to render a photoreal try-on result.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Selected product */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 pt-5 pb-3 flex items-center justify-between">
            <div className="font-display text-[17px] text-slate-900">Selected Product</div>
            <Link to="/dashboard/shoppers/fashion-store" className="text-[12.5px] text-purple-700 hover:underline">
              Change
            </Link>
          </div>
          {product ? (
            <div>
              <ProductVisual product={product} className="aspect-[4/3]" />
              <div className="p-5">
                <div className="font-display text-lg text-slate-900">{product.name}</div>
                <div className="mt-1 text-[13px] text-slate-500">
                  {product.store} · {product.category}
                </div>
                <div className="mt-3 text-[16px] font-semibold text-slate-900">${product.price}</div>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center">
              <p className="text-[14px] text-slate-600">No product selected.</p>
              <Link to="/dashboard/shoppers/fashion-store" className="mt-4 inline-flex items-center gap-2 rounded-full bg-purple-600 text-white px-4 py-2 text-[13px] font-medium">
                Browse the store
              </Link>
            </div>
          )}
        </div>

        {/* Upload photo */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col">
          <div className="font-display text-[17px] text-slate-900">Upload Your Photo</div>
          <p className="mt-1.5 text-[13.5px] text-slate-600">
            Use a clear front-facing photo for the best try-on result.
          </p>

          {!photo ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onFiles(e.dataTransfer.files);
              }}
              className="mt-5 grid place-items-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 hover:bg-purple-50/40 hover:border-purple-300 transition aspect-[4/3] cursor-pointer text-center px-6"
            >
              <div>
                <span className="inline-grid place-items-center h-12 w-12 rounded-xl bg-purple-100 text-purple-700">
                  <Upload size={18} />
                </span>
                <div className="mt-3 text-[14px] font-medium text-slate-800">Drop your photo here</div>
                <div className="mt-1 text-[12.5px] text-slate-500">or click to browse · JPG, PNG</div>
              </div>
            </button>
          ) : (
            <div className="mt-5 relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src={photo} alt="Your uploaded photo" className="absolute inset-0 w-full h-full object-cover" />
              <button
                onClick={() => setPhoto(null)}
                className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-slate-700 border border-white/60 hover:bg-white"
                aria-label="Remove photo"
              >
                <X size={14} />
              </button>
            </div>
          )}
          <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => onFiles(e.target.files)} />

          <div className="mt-5 flex items-start gap-2 text-[12.5px] text-slate-500">
            <ImageIcon size={14} className="mt-0.5 shrink-0" />
            Photos are processed in your session only and never stored on our servers.
          </div>

          <button
            onClick={generate}
            disabled={!product || !photo || generating}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-3 text-[14px] font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition"
          >
            {generating ? "Generating…" : (<>Generate Try-On <ArrowRight size={15} /></>)}
          </button>
        </div>
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
