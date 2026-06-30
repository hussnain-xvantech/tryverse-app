import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Upload, ShieldCheck, X, ExternalLink, User as UserIcon, Sparkles, Check } from "lucide-react";
import { getSelectedProduct, setUserPhoto, DEMO_USER_PHOTO, type Product } from "@/lib/shopper-store";
import { ProductVisual } from "./dashboard.shoppers.fashion-store.store";

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

  function commitPhoto(url: string) {
    setPhoto(url);
    setUserPhoto(url);
  }

  function onFiles(files: FileList | null) {
    const f = files?.[0];
    if (!f) {
      // Demo: simulate upload when no real file is provided
      commitPhoto(DEMO_USER_PHOTO);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => commitPhoto(String(reader.result || ""));
    reader.readAsDataURL(f);
  }

  function generate() {
    if (!product || !photo) return;
    setGenerating(true);
    setTimeout(() => navigate({ to: "/dashboard/shoppers/fashion-store/result" }), 900);
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers/fashion-store/store" className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Store
      </Link>

      <div className="mt-5">
        <div className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">Step 2 of 3</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl text-white">Try This Outfit On You</h1>
        <p className="mt-2 text-[15px] text-white/60 max-w-2xl">
          Upload your photo and we'll combine it with the selected product to render a photoreal try-on result.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* LEFT: Upload + selected item */}
        <div className="grid gap-5">
          {/* Your photo */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur p-5 sm:p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)]">
            <div className="flex items-center justify-between">
              <div className="font-display text-[17px] text-white">Your Photo</div>
              {photo && (
                <button
                  onClick={() => setPhoto(null)}
                  className="text-[12px] text-white/50 hover:text-white inline-flex items-center gap-1"
                >
                  <X size={12} /> Remove
                </button>
              )}
            </div>

            {!photo ? (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  onFiles(e.dataTransfer.files);
                }}
                className="mt-4 group w-full grid place-items-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] hover:bg-purple-500/10 hover:border-purple-400/50 transition aspect-[4/3] cursor-pointer text-center px-6"
              >
                <div>
                  <span className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-[0_0_24px_rgba(168,85,247,0.45)]">
                    <Upload size={20} />
                  </span>
                  <div className="mt-4 text-[14.5px] font-medium text-white">Upload your photo</div>
                  <div className="mt-1 text-[12.5px] text-white/50">JPG, PNG up to 10MB</div>
                  <div className="mt-3 text-[11.5px] text-purple-300/80">Drag and drop or browse</div>
                </div>
              </button>
            ) : (
              <div className="mt-4 relative rounded-2xl overflow-hidden border border-white/15 aspect-[4/3] bg-black/40">
                <img src={photo} alt="Your uploaded photo" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 text-white px-2.5 py-1 text-[11px] font-semibold">
                  <Check size={11} /> Uploaded
                </div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={(e) => onFiles(e.target.files)} />
          </div>

          {/* Selected item */}
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur overflow-hidden">
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <div className="font-display text-[17px] text-white">Selected Item</div>
              <Link to="/dashboard/shoppers/fashion-store/store" className="text-[12.5px] text-purple-300 hover:text-purple-200">
                Change item
              </Link>
            </div>
            {product ? (
              <div className="px-5 pb-5 flex items-center gap-4">
                <div className="h-24 w-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <ProductVisual product={product} className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-purple-300/80">
                    {product.store}
                  </div>
                  <div className="mt-1 font-display text-[15px] text-white leading-snug">{product.name}</div>
                  <div className="mt-1 text-[14px] font-semibold text-white">${product.price}.00</div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="mt-2 inline-flex items-center gap-1 text-[12px] text-purple-300 hover:text-purple-200"
                  >
                    Buy now <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            ) : (
              <div className="px-5 pb-5 text-[14px] text-white/60">No product selected.</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/shoppers/fashion-store/store"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-white/30 px-4 py-2.5 text-[13px] font-medium transition"
            >
              <ArrowLeft size={13} /> Prev
            </Link>
            <button
              onClick={generate}
              disabled={!product || !photo || generating}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[14px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] transition shadow-[0_0_28px_rgba(168,85,247,0.4)]"
            >
              {generating ? (
                <>
                  <Sparkles size={15} className="animate-pulse" /> Generating…
                </>
              ) : (
                <>
                  Generate Try-On <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT: Preview canvas */}
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 backdrop-blur p-5 sm:p-6 min-h-[520px] flex flex-col shadow-[0_0_60px_rgba(168,85,247,0.12)]">
          <div className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">Live Preview</div>
          {!photo ? (
            <div className="flex-1 mt-4 grid place-items-center rounded-2xl border border-dashed border-white/10 bg-black/20 px-8 text-center">
              <div>
                <span className="inline-grid place-items-center h-16 w-16 rounded-2xl bg-white/5 border border-white/10 text-white/60">
                  <UserIcon size={22} />
                </span>
                <div className="mt-5 font-display text-xl text-white">Your preview will appear here</div>
                <p className="mt-2 text-[13.5px] text-white/55 max-w-sm mx-auto">
                  Upload your photo and select an item to see how it looks on you.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative">
                <img src={photo} alt="Your photo" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-2 left-2 rounded-full bg-black/50 backdrop-blur text-[10px] font-semibold text-white px-2 py-0.5 uppercase tracking-wider">
                  Photo
                </div>
              </div>
              {product && (
                <div className="rounded-2xl overflow-hidden border border-white/10 relative">
                  <ProductVisual product={product} className="absolute inset-0 w-full h-full" />
                  <div className="absolute top-2 left-2 rounded-full bg-black/50 backdrop-blur text-[10px] font-semibold text-white px-2 py-0.5 uppercase tracking-wider">
                    Outfit
                  </div>
                </div>
              )}
              <div className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 px-4 py-2 text-[12.5px] font-medium">
                <Check size={13} /> Ready to generate
              </div>
            </div>
          )}
        </div>
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
