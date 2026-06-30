import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Upload, Link2, Image as ImageIcon, Sparkles, Download, RefreshCw, MessageCircle, Shirt, Loader2, CheckCircle2 } from "lucide-react";
import { DEMO_USER_PHOTO } from "@/lib/shopper-store";
import g1a from "@/assets/g1-after.jpg";
import garmentFlat from "@/assets/garment-flatlay.jpg";

export const Route = createFileRoute("/dashboard/shoppers/try-on")({
  component: TryOnStudio,
});

function TryOnStudio() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [tab, setTab] = useState<"url" | "upload">("url");
  const [url, setUrl] = useState("");
  const [garment, setGarment] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const ready = !!photo && (!!url || !!garment);

  function simulatePhoto() { setPhoto(DEMO_USER_PHOTO); }
  function simulateGarment() { setGarment(garmentFlat); }

  function generate() {
    if (!ready) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1600);
  }

  function reset() {
    setPhoto(null); setUrl(""); setGarment(null); setStatus("idle");
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Home
      </Link>
      <div className="mt-5">
        <div className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">Virtual Try-On</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl text-white">Virtual Try-On Studio</h1>
        <p className="mt-2 text-[15px] text-white/60">See yourself in any outfit from the internet.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* LEFT */}
        <div className="space-y-5">
          {/* Photo */}
          <Card title="Photo" step={1}>
            {!photo ? (
              <button onClick={simulatePhoto} className="w-full rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] hover:border-purple-400/50 hover:bg-purple-500/5 transition p-8 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-200">
                  <Upload size={18} />
                </span>
                <div className="mt-3 text-[14px] text-white font-medium">Click to upload photo</div>
                <div className="mt-1 text-[12.5px] text-white/50">JPG, PNG up to 10MB</div>
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <img src={photo} alt="You" className="h-20 w-20 rounded-xl object-cover border border-white/10" />
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 text-[12.5px] text-emerald-300">
                    <CheckCircle2 size={13} /> Photo uploaded
                  </div>
                  <div className="text-[13px] text-white/60 mt-0.5">Ready for try-on</div>
                </div>
                <button onClick={() => setPhoto(null)} className="text-[12.5px] text-white/60 hover:text-white">Change</button>
              </div>
            )}
          </Card>

          {/* Garment */}
          <Card title="Add Garment" step={2}>
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 w-fit">
              <TabBtn active={tab === "url"} onClick={() => setTab("url")}><Link2 size={13} /> Product URL</TabBtn>
              <TabBtn active={tab === "upload"} onClick={() => setTab("upload")}><ImageIcon size={13} /> Upload Garment</TabBtn>
            </div>
            {tab === "url" ? (
              <div className="mt-4">
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.zara.com/..."
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-400/50 focus:bg-white/[0.06] outline-none text-white placeholder:text-white/35 px-4 h-11 text-[14px] transition"
                />
                <p className="mt-2 text-[12.5px] text-white/50">Paste any fashion product URL from Zara, H&M, Macy's, Nordstrom, or other supported stores.</p>
              </div>
            ) : (
              <div className="mt-4">
                {!garment ? (
                  <button onClick={simulateGarment} className="w-full rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] hover:border-purple-400/50 hover:bg-purple-500/5 transition p-6 text-center">
                    <Shirt size={18} className="mx-auto text-purple-300" />
                    <div className="mt-2 text-[13.5px] text-white">Upload garment photo</div>
                    <div className="text-[12px] text-white/50">JPG, PNG up to 10MB</div>
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <img src={garment} alt="Garment" className="h-20 w-20 rounded-xl object-cover border border-white/10" />
                    <div className="flex-1 text-[13px] text-white/70">Garment ready</div>
                    <button onClick={() => setGarment(null)} className="text-[12.5px] text-white/60 hover:text-white">Change</button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={generate}
              disabled={!ready || status === "loading"}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 h-12 text-[14px] font-semibold text-white bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:scale-[1.01] active:scale-100 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100"
            >
              {status === "loading" ? (<><Loader2 size={15} className="animate-spin" /> Generating…</>) : (<><Sparkles size={15} /> Generate Try-On</>)}
            </button>
          </Card>

          {/* How */}
          <Card title="How it works">
            <ol className="space-y-2.5 text-[13.5px] text-white/70">
              {[
                "Upload a clear full-body or upper-body photo",
                "Paste a clothing product URL or upload a garment image",
                "Click generate and wait 20–30 seconds",
                "Get your try-on result and AI styling advice",
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 grid h-6 w-6 place-items-center rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200 text-[11.5px] font-semibold">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* RIGHT — result panel */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl min-h-[520px] shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
          <div className="relative p-6 sm:p-8 h-full">
            {status !== "done" ? (
              <div className="h-full min-h-[460px] flex flex-col items-center justify-center text-center">
                {status === "loading" ? (
                  <>
                    <Loader2 size={36} className="text-purple-300 animate-spin" />
                    <div className="mt-4 font-display text-2xl text-white">Generating your try-on…</div>
                    <p className="mt-2 text-[14px] text-white/55 max-w-sm">Stylo is rendering your outfit. This usually takes 20–30 seconds.</p>
                  </>
                ) : (
                  <>
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 border border-purple-400/30 text-purple-200">
                      <Sparkles size={22} />
                    </span>
                    <div className="mt-5 font-display text-2xl text-white">Your result will appear here</div>
                    <p className="mt-2 text-[14px] text-white/55 max-w-sm">Upload a photo and enter a garment URL to get started.</p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-3">
                  <Thumb label="Your photo" src={photo!} />
                  <Thumb label="Garment" src={garment || garmentFlat} />
                  <Thumb label="Result" src={g1a} highlight />
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img src={g1a} alt="Try-on result" className="w-full aspect-[4/5] object-cover" />
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 h-10 text-[13px] font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:scale-[1.02] transition">
                    <Download size={14} /> Download Result
                  </button>
                  <button onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 text-white px-4 h-10 text-[13px] font-semibold hover:bg-white/[0.1] transition">
                    <RefreshCw size={14} /> Try Another Outfit
                  </button>
                  <Link to="/dashboard/shoppers/ai-stylist" className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 text-white px-4 h-10 text-[13px] font-semibold hover:bg-white/[0.1] transition">
                    <MessageCircle size={14} /> Ask Stylo For Advice
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, step, children }: { title: string; step?: number; children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 mb-4">
        {step && (
          <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-[11.5px] font-semibold">{step}</span>
        )}
        <h3 className="font-display text-[17px] text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg px-3 h-8 text-[12.5px] font-medium transition ${active ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]" : "text-white/60 hover:text-white"}`}>
      {children}
    </button>
  );
}

function Thumb({ label, src, highlight }: { label: string; src: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl overflow-hidden border ${highlight ? "border-purple-400/60 shadow-[0_0_18px_rgba(168,85,247,0.35)]" : "border-white/10"}`}>
      <div className="aspect-square bg-white/5">
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
      <div className="px-2.5 py-1.5 text-[11px] text-white/60 bg-black/30">{label}</div>
    </div>
  );
}

// Kept for backward-compat with /ai-stylist, /pose-studio, /video-studio stubs
export function DashFeatureStub({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>
      <div className="mt-6 relative overflow-hidden rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-8 sm:p-12 text-center shadow-[0_0_60px_rgba(168,85,247,0.15)]">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative">
          <span className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-[0_0_28px_rgba(168,85,247,0.5)]">
            <Shirt size={20} />
          </span>
          <h1 className="mt-5 font-display text-3xl sm:text-4xl text-white">{title}</h1>
          <p className="mt-3 text-[15px] text-white/65 max-w-xl mx-auto">{desc}</p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-purple-500/15 border border-purple-400/30 px-4 py-2 text-[13px] text-purple-200">
            <Sparkles size={13} /> Coming Soon — flow under construction
          </div>
          <div className="mt-8">
            <Link to="/dashboard/shoppers" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13.5px] font-semibold hover:scale-[1.02] transition shadow-[0_0_24px_rgba(168,85,247,0.4)]">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
