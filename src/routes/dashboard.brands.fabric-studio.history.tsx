import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Camera, Download, Eye, Layers, Plus } from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";
import { toast } from "sonner";
import fabricA from "@/assets/g1-before.jpg";
import fabricB from "@/assets/g2-before.jpg";
import fabricC from "@/assets/g2-catalog.jpg";
import resultImg from "@/assets/editorial-hero.jpg";

export const Route = createFileRoute("/dashboard/brands/fabric-studio/history")({
  head: () => ({ meta: [{ title: "Fabric Studio History — TryVerse Brand Studio" }] }),
  component: HistoryPage,
});

const HISTORY = [
  {
    id: "fs-1042",
    style: "Straight Shirt · Palazzo",
    model: "Female · Medium · Studio White · Standing",
    date: "Today · 14:22",
    fabrics: [fabricB, fabricA, fabricC],
    result: resultImg,
  },
  {
    id: "fs-1041",
    style: "Kurta · Cigarette Pants",
    model: "Male · Fair · Studio Gray · 3/4 Turn",
    date: "Yesterday · 18:04",
    fabrics: [fabricA, fabricB],
    result: resultImg,
  },
  {
    id: "fs-1039",
    style: "Anarkali · Churidar · Silk Dupatta",
    model: "Female · Tan · Outdoor Garden · Walking",
    date: "Mon · 09:11",
    fabrics: [fabricC, fabricB, fabricA],
    result: resultImg,
  },
];

function HistoryPage() {
  const empty = false; // demo data present

  return (
    <BrandShell title="Fabric Studio History">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-8 pb-20">
        <div className="flex items-start gap-3">
          <Link
            to="/dashboard/brands/fabric-studio"
            className="mt-1 grid h-9 w-9 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
            aria-label="Back to Fabric Studio"
          ><ArrowLeft size={15} /></Link>
          <div className="flex-1">
            <BrandPageHeader
              eyebrow="Brand Studio"
              title="Fabric Studio History"
              subtitle="Every garment visualization you've generated with Maison Studio."
              right={
                <Link
                  to="/dashboard/brands/fabric-studio"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                ><Plus size={13} /> Create Garment</Link>
              }
            />
          </div>
        </div>

        {empty ? (
          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-12 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-200">
              <Layers size={22} />
            </span>
            <h2 className="mt-5 font-display text-2xl text-white">No garment visualizations yet.</h2>
            <p className="mt-2 text-[14px] text-white/60">Upload fabric photos and generate your first outfit in seconds.</p>
            <Link
              to="/dashboard/brands/fabric-studio"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13px] font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            ><Plus size={13} /> Create Garment</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HISTORY.map((h) => (
              <div key={h.id} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden group hover:border-purple-400/40 transition">
                <div className="relative aspect-[4/5] bg-black/40 overflow-hidden">
                  <img src={h.result} alt={h.style} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-x-0 bottom-0 flex gap-1.5 p-2 bg-gradient-to-t from-black/85 to-transparent">
                    {h.fabrics.map((f, i) => (
                      <div key={i} className="relative h-10 w-10 rounded-md overflow-hidden border border-white/20 bg-black/40">
                        <img src={f} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                  <span className="absolute top-2 left-2 rounded-full bg-purple-600/70 text-white text-[10.5px] px-2 py-0.5 border border-purple-300/40">{h.id}</span>
                </div>
                <div className="p-3.5 space-y-1">
                  <div className="text-[13.5px] text-white truncate">{h.style}</div>
                  <div className="text-[11.5px] text-white/55 truncate">{h.model}</div>
                  <div className="text-[11px] text-white/40">{h.date}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <Link
                      to="/dashboard/brands/fabric-studio"
                      className="inline-flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-2.5 py-1 text-[11.5px]"
                    ><Eye size={11} /> View</Link>
                    <button
                      type="button"
                      onClick={() => toast.success(`Downloading ${h.id}…`)}
                      className="inline-flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-2.5 py-1 text-[11.5px]"
                    ><Download size={11} /> Download</button>
                    <Link
                      to="/dashboard/brands/photoshoot"
                      className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-2.5 py-1 text-[11.5px]"
                    ><Camera size={11} /> Photoshoot</Link>
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
