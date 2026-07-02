import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Upload, Check, Sparkles, Download, FolderPlus, Video, RefreshCw, Image as ImageIcon,
} from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";
import editorial from "@/assets/editorial-hero.jpg";
import g1 from "@/assets/g1-after.jpg";
import g2 from "@/assets/g2-after.jpg";
import g3 from "@/assets/g3-after.jpg";
import g4 from "@/assets/g4-after.jpg";
import g5 from "@/assets/g5-after.jpg";
import g6 from "@/assets/g6-after.jpg";

export const Route = createFileRoute("/dashboard/brands/pose-studio")({
  head: () => ({ meta: [{ title: "Pose Studio — TryVerse Brand" }] }),
  component: PoseStudio,
});

const CATEGORIES = {
  "Catalog & Ecommerce": ["Front Standing", "3/4 Turn", "Side View", "Back View", "Detail Close-up", "Natural Standing"],
  "Editorial": ["Magazine Pose", "Over Shoulder", "Dramatic Turn", "Seated Editorial", "Soft Movement", "Hero Campaign"],
  "Lifestyle": ["Walking", "Cafe Look", "Outdoor Stroll", "Relaxed Standing", "Window Light", "Studio Lifestyle"],
  "Social Content": ["Reels Cover", "Mirror Pose", "Casual Try-On", "Influencer Look", "Street Style", "Product Drop"],
  "Campaign": ["Launch Hero", "Premium Studio", "Bold Profile", "Lookbook", "Fashion Week", "Minimal Ad"],
  "Detail Shots": ["Sleeve Detail", "Fabric Texture", "Collar Close-up", "Button Detail", "Embroidery Detail", "Fit Close-up"],
} as const;

const POSE_IMAGES = [editorial, g1, g2, g3, g4, g5];
const RESULT_IMAGES = [g6, g4, g1, g2];

type Cat = keyof typeof CATEGORIES;

function PoseStudio() {
  const [uploaded, setUploaded] = useState(false);
  const [cat, setCat] = useState<Cat>("Catalog & Ecommerce");
  const [selected, setSelected] = useState<string[]>([]);
  const [count, setCount] = useState(4);
  const [bg, setBg] = useState("Keep original");
  const [fit, setFit] = useState("Balanced");
  const [ratio, setRatio] = useState("4:5");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(false);

  const togglePose = (p: string) =>
    setSelected((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));

  const canGenerate = uploaded && selected.length > 0 && !loading;

  const generate = () => {
    if (!canGenerate) return;
    setLoading(true);
    setResults(false);
    setTimeout(() => {
      setLoading(false);
      setResults(true);
      toast.success("Pose variations ready");
    }, 1600);
  };

  return (
    <BrandShell title="Pose Studio">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10">
        <BrandPageHeader
          eyebrow="Feature"
          title="Pose Studio"
          subtitle="Upload one fashion image, choose pose styles, and create brand-ready pose variations for catalogs, campaigns, and product pages."
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6">
          {/* LEFT — controls */}
          <div className="space-y-6">
            {/* Upload */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
              <div className="text-[13px] font-semibold text-white">Upload Product or Model Image</div>
              <button
                type="button"
                onClick={() => setUploaded(true)}
                className={`mt-4 w-full rounded-xl border-2 border-dashed transition ${
                  uploaded ? "border-purple-400/50 bg-purple-500/5" : "border-white/15 hover:border-purple-400/50 hover:bg-white/[0.04]"
                }`}
              >
                {!uploaded ? (
                  <div className="py-10 text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-purple-600/40 to-fuchsia-500/30 border border-white/10">
                      <Upload size={18} className="text-white" />
                    </div>
                    <div className="mt-3 text-[13.5px] text-white">Upload fashion image</div>
                    <div className="mt-1 text-[12px] text-white/50">JPG, PNG, WebP up to 20MB · drag and drop or click</div>
                  </div>
                ) : (
                  <div className="p-3 flex items-center gap-3">
                    <img src={editorial} alt="uploaded" className="h-20 w-20 rounded-lg object-cover" />
                    <div className="text-left min-w-0">
                      <div className="text-[13.5px] text-white truncate">product-hero.jpg</div>
                      <div className="mt-1 inline-flex items-center gap-1.5 text-[12px] text-emerald-300">
                        <Check size={13} /> Ready for pose generation
                      </div>
                    </div>
                  </div>
                )}
              </button>
            </div>

            {/* Category */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
              <div className="text-[13px] font-semibold text-white">Pose Category</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(CATEGORIES) as Cat[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCat(c); setSelected([]); }}
                    className={`rounded-full px-3.5 py-1.5 text-[12.5px] border transition ${
                      cat === c
                        ? "bg-gradient-to-r from-purple-600/40 to-fuchsia-500/30 border-purple-400/50 text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]"
                        : "border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-purple-400/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Poses */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
              <div className="flex items-center justify-between">
                <div className="text-[13px] font-semibold text-white">Select Poses</div>
                <div className="text-[11.5px] text-white/50">{selected.length} selected</div>
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES[cat].map((p, i) => {
                  const on = selected.includes(p);
                  return (
                    <button
                      key={p}
                      onClick={() => togglePose(p)}
                      className={`group relative rounded-xl overflow-hidden border text-left transition ${
                        on ? "border-purple-400/60 shadow-[0_0_18px_rgba(168,85,247,0.35)]" : "border-white/10 hover:border-purple-400/40"
                      }`}
                    >
                      <div className="relative aspect-[3/4]">
                        <img src={POSE_IMAGES[i % POSE_IMAGES.length]} alt={p} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070210] via-[#070210]/40 to-transparent" />
                        {on && (
                          <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.7)]">
                            <Check size={13} />
                          </span>
                        )}
                        <div className="absolute inset-x-0 bottom-0 p-2.5">
                          <div className="text-[12.5px] font-medium text-white leading-tight">{p}</div>
                          <div className="text-[10.5px] text-white/60 mt-0.5">Brand-safe · Clothing visible</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Settings */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 space-y-4">
              <div className="text-[13px] font-semibold text-white">Settings</div>

              <SettingRow label="Output count" options={["2 variations", "4 variations", "6 variations"]}
                value={`${count} variations`} onChange={(v) => setCount(parseInt(v))} />
              <SettingRow label="Background" options={["Keep original", "Studio white", "Studio grey", "Soft editorial", "Brand color"]} value={bg} onChange={setBg} />
              <SettingRow label="Fit preservation" options={["Strict", "Balanced", "Creative"]} value={fit} onChange={setFit} />
              <SettingRow label="Aspect ratio" options={["1:1", "4:5", "9:16", "16:9"]} value={ratio} onChange={setRatio} />
            </div>

            <button
              onClick={generate}
              disabled={!canGenerate}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-6 py-3 text-[14px] font-medium shadow-[0_0_28px_rgba(168,85,247,0.55)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] transition"
            >
              <Sparkles size={15} /> {loading ? "Creating pose variations…" : "Generate Pose Variations"}
            </button>
          </div>

          {/* RIGHT — preview */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 min-h-[500px]">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-semibold text-white">Results</div>
              {results && (
                <span className="text-[11.5px] text-purple-300">{count} variations · {ratio}</span>
              )}
            </div>

            {!results && !loading && (
              <div className="mt-10 text-center py-16">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/5 border border-white/10">
                  <ImageIcon size={20} className="text-white/50" />
                </div>
                <div className="mt-4 text-[14px] text-white/70">Your pose results will appear here.</div>
                <div className="mt-1 text-[12px] text-white/40">Upload an image and choose poses to begin.</div>
              </div>
            )}

            {loading && (
              <div className="mt-10 text-center py-16">
                <div className="mx-auto h-10 w-10 rounded-full border-2 border-purple-400/40 border-t-purple-400 animate-spin" />
                <div className="mt-4 text-[13.5px] text-white/80">Creating pose variations…</div>
              </div>
            )}

            {results && (
              <>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <ResultCard label="Original" img={editorial} />
                  {RESULT_IMAGES.slice(0, count).map((img, i) => (
                    <ResultCard key={i} label={`Pose ${i + 1}`} img={img} />
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <ActionButton icon={Download} onClick={() => toast.success("Downloading all…")}>Download All</ActionButton>
                  <ActionButton icon={FolderPlus} onClick={() => toast.success("Saved to catalog")}>Save to Catalog</ActionButton>
                  <ActionButton icon={Video} to="/dashboard/brands/video-studio">Create Video</ActionButton>
                  <ActionButton icon={RefreshCw} onClick={generate}>Generate More</ActionButton>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </BrandShell>
  );
}

function SettingRow({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-[12px] text-white/60 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-lg px-3 py-1.5 text-[12px] border transition ${
              value === o
                ? "bg-purple-500/20 border-purple-400/50 text-white"
                : "border-white/10 bg-white/[0.03] text-white/65 hover:text-white hover:border-purple-400/30"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultCard({ label, img }: { label: string; img: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[3/4]">
      <img src={img} alt={label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070210] to-transparent p-2">
        <div className="text-[11.5px] text-white/90">{label}</div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, children, onClick, to }: { icon: React.ElementType; children: React.ReactNode; onClick?: () => void; to?: string }) {
  const cls = "inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/40 px-3 py-2 text-[12px] text-white/85 transition";
  if (to) return <Link to={to} className={cls}><Icon size={13} /> {children}</Link>;
  return <button onClick={onClick} className={cls}><Icon size={13} /> {children}</button>;
}
