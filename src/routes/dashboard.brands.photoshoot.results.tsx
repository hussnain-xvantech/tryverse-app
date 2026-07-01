import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Download, FolderPlus, Video as VideoIcon, Sparkles,
  RefreshCw, Check, ImageIcon,
} from "lucide-react";
import { BrandShell } from "@/components/site/BrandShell";
import { loadSelection, type PhotoshootSelection } from "@/lib/photoshoot-store";
import g1 from "@/assets/g1-after.jpg";
import g2 from "@/assets/g2-after.jpg";
import g3 from "@/assets/g3-after.jpg";
import g4 from "@/assets/g4-after.jpg";
import g5 from "@/assets/g5-after.jpg";
import g6 from "@/assets/g6-after.jpg";
import editorial from "@/assets/editorial-hero.jpg";
import hero from "@/assets/hero-result.jpg";
import cta from "@/assets/cta-result.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import flatlay from "@/assets/garment-flatlay.jpg";

export const Route = createFileRoute("/dashboard/brands/photoshoot/results")({
  head: () => ({ meta: [{ title: "Photoshoot Results — TryVerse Brand Studio" }] }),
  component: ResultsPage,
});

const RESULT_POOL = [editorial, hero, g1, g2, cta, blazerAfter, g3, g4, g5, g6];
const ANGLE_LABEL: Record<string, string> = {
  front: "Front View", "three-quarter": "3/4 View", left: "Left Side",
  right: "Right Side", back: "Back View", detail: "Detail Close-up", lifestyle: "Lifestyle",
};

function ResultsPage() {
  const navigate = useNavigate();
  const [sel, setSel] = useState<PhotoshootSelection | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { setSel(loadSelection()); }, []);

  const angles = sel?.angles?.length ? sel.angles : ["front", "three-quarter", "left", "back", "detail", "lifestyle"];
  const results = useMemo(
    () => angles.map((a, i) => ({ id: a, label: ANGLE_LABEL[a] ?? a, image: RESULT_POOL[i % RESULT_POOL.length] })),
    [angles.join(",")]
  );

  function fireToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2000); }

  const productImage = sel?.product?.image ?? flatlay;
  const productName = sel?.product?.name ?? sel?.uploadedName ?? "Uploaded product";

  return (
    <BrandShell title="Photoshoot Results">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <button onClick={() => navigate({ to: "/dashboard/brands/photoshoot" })}
              className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80"
              aria-label="Back">
              <ArrowLeft size={15} />
            </button>
            <div className="min-w-0">
              <div className="text-[11px] tracking-[0.22em] uppercase text-purple-300/90">Brand Studio</div>
              <h1 className="font-display text-2xl sm:text-3xl text-white leading-tight truncate">Photoshoot Results</h1>
              <p className="text-[13px] text-white/55 mt-1">Generated in 60s · {results.length} angles</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => fireToast("Downloading all results…")}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[12.5px] font-medium shadow-[0_0_24px_rgba(168,85,247,0.4)]">
              <Download size={13} /> Download All
            </button>
            <Link to="/dashboard/brands/photoshoot"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/85 px-4 py-2 text-[12.5px]">
              <Sparkles size={13} /> New Shot
            </Link>
          </div>
        </div>

        {/* Original product */}
        <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img src={productImage} alt={productName} className="h-full w-full object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] uppercase tracking-widest text-purple-300/80">Original Product</div>
            <div className="text-white text-[14px] font-medium truncate">{productName}</div>
            <div className="text-[12px] text-white/50 truncate">
              {sel?.model?.name && `Model: ${sel.model.name}`}{sel?.style?.name && ` · Style: ${sel.style.name}`}
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 px-3 py-1.5 text-[11.5px]">
            <Check size={11} /> {results.length} angles generated
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((r) => (
            <div key={r.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-purple-400/40 transition">
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img src={r.image} alt={r.label} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <div className="text-white text-[13px] font-medium">{r.label}</div>
              </div>
              <div className="absolute inset-0 grid place-items-center bg-black/50 opacity-0 group-hover:opacity-100 transition">
                <div className="flex flex-wrap gap-2 justify-center px-4">
                  <button onClick={() => fireToast(`${r.label}: download started`)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white px-3 py-1.5 text-[12px]">
                    <Download size={12} /> Download
                  </button>
                  <button onClick={() => fireToast("Saved to Catalog")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white px-3 py-1.5 text-[12px]">
                    <FolderPlus size={12} /> Save to Catalog
                  </button>
                  <Link to="/dashboard/brands/video-studio"
                    className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-3 py-1.5 text-[12px] shadow-[0_0_14px_rgba(168,85,247,0.5)]">
                    <VideoIcon size={12} /> Create Video
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk actions */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <button onClick={() => fireToast("Downloading all results…")}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[12.5px]"><Download size={13} /> Download All</button>
          <button onClick={() => fireToast("All results saved to Catalog")}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[12.5px]"><FolderPlus size={13} /> Save All to Catalog</button>
          <Link to="/dashboard/brands/video-studio"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 text-[12.5px]"><VideoIcon size={13} /> Create Video From Results</Link>
          <Link to="/dashboard/brands/photoshoot"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[12.5px] shadow-[0_0_20px_rgba(168,85,247,0.4)]"><RefreshCw size={13} /> New Shot</Link>
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-[#1a1130]/95 border border-purple-400/30 backdrop-blur-xl text-white text-[13px] px-4 py-2 shadow-[0_0_28px_rgba(168,85,247,0.35)] inline-flex items-center gap-2">
          <ImageIcon size={13} className="text-purple-300" /> {toast}
        </div>
      )}
    </BrandShell>
  );
}
