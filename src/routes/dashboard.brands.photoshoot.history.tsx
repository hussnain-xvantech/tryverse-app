import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Camera, Download, Eye, Sparkles } from "lucide-react";
import { BrandShell } from "@/components/site/BrandShell";
import { loadHistory, type HistoryItem } from "@/lib/photoshoot-store";

export const Route = createFileRoute("/dashboard/brands/photoshoot/history")({
  head: () => ({ meta: [{ title: "Photoshoot History — TryVerse Brand Studio" }] }),
  component: HistoryPage,
});

function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  useEffect(() => { setItems(loadHistory()); }, []);

  return (
    <BrandShell title="Photoshoot History">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/brands/photoshoot"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80" aria-label="Back">
            <ArrowLeft size={15} />
          </Link>
          <div>
            <div className="text-[11px] tracking-[0.22em] uppercase text-purple-300/90">Brand Studio</div>
            <h1 className="font-display text-2xl sm:text-3xl text-white leading-tight">Photoshoot History</h1>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-600/40 to-fuchsia-500/30 border border-purple-400/30 text-white"><Camera size={20} /></span>
            <h2 className="mt-5 font-display text-xl text-white">No photoshoots yet</h2>
            <p className="mt-2 text-[13.5px] text-white/55 max-w-md mx-auto">Create your first AI photoshoot to see it appear here.</p>
            <Link to="/dashboard/brands/photoshoot"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13.5px] font-medium shadow-[0_0_24px_rgba(168,85,247,0.5)]">
              <Sparkles size={14} /> Create Photoshoot
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <div key={it.id} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden hover:border-purple-400/40 transition">
                <div className="aspect-[16/10] w-full overflow-hidden bg-white/5">
                  <img src={it.productImage} alt={it.product} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="text-white text-[14px] font-medium truncate">{it.product}</div>
                  <div className="text-[12px] text-white/55 truncate">{it.model} · {it.style} · {it.angles} angles</div>
                  <div className="text-[11.5px] text-white/40 mt-1">{it.date}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link to="/dashboard/brands/photoshoot/results"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-3 py-1.5 text-[12px]">
                      <Eye size={12} /> View Results
                    </Link>
                    <button className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-3 py-1.5 text-[12px]">
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </BrandShell>
  );
}
