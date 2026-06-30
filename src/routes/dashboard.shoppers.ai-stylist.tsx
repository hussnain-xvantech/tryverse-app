import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Upload, CheckCircle2, Sparkles, Star, Palette, Briefcase, Coffee, Heart, Wand2, MessageCircle, Send, ArrowUpRight } from "lucide-react";
import { DEMO_USER_PHOTO } from "@/lib/shopper-store";
import g2a from "@/assets/g2-after.jpg";
import g3a from "@/assets/g3-after.jpg";
import g4a from "@/assets/g4-after.jpg";

export const Route = createFileRoute("/dashboard/shoppers/ai-stylist")({
  component: AIStylist,
});

const OPTIONS = [
  { id: "rate", title: "Rate my outfit", desc: "Get a styling score with detailed feedback.", icon: Star },
  { id: "colors", title: "What colors suit me?", desc: "Personal color palette based on your tones.", icon: Palette },
  { id: "work", title: "Style me for work", desc: "Polished outfits for the office or meetings.", icon: Briefcase },
  { id: "casual", title: "Casual weekend look", desc: "Effortless and comfortable everyday styling.", icon: Coffee },
  { id: "date", title: "Date night outfit", desc: "Confident, elegant looks for a night out.", icon: Heart },
  { id: "style-this", title: "How to style this?", desc: "Outfit ideas built around one item.", icon: Wand2 },
] as const;

type OptionId = (typeof OPTIONS)[number]["id"];

function AIStylist() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [selected, setSelected] = useState<OptionId | null>(null);
  const [message, setMessage] = useState("");

  function reset() { setSelected(null); }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Home
      </Link>
      <div className="mt-5">
        <div className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">AI Fashion Stylist</div>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl text-white">AI Fashion Stylist</h1>
        <p className="mt-2 text-[15px] text-white/60">Your personal AI stylist — outfit ratings, style advice, color analysis, and product discovery.</p>
      </div>

      {!photo ? (
        <UploadState onUpload={() => setPhoto(DEMO_USER_PHOTO)} />
      ) : !selected ? (
        <OptionsState photo={photo} onChange={() => setPhoto(null)} onPick={(id) => setSelected(id)} />
      ) : (
        <ResponseState photo={photo} option={selected} onBack={reset} message={message} setMessage={setMessage} />
      )}
    </div>
  );
}

function UploadState({ onUpload }: { onUpload: () => void }) {
  return (
    <div className="mt-10 mx-auto max-w-xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 sm:p-10 text-center shadow-[0_0_60px_rgba(168,85,247,0.18)]">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="relative">
          <span className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 border border-purple-400/30 text-purple-200">
            <Upload size={20} />
          </span>
          <h2 className="mt-5 font-display text-2xl text-white">Upload Your Photo</h2>
          <p className="mt-2 text-[14px] text-white/65 max-w-md mx-auto">
            Upload your photo and Stylo will provide personalized style analysis, outfit recommendations, color matching, and product suggestions tailored to you.
          </p>
          <button onClick={onUpload} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-6 h-11 text-[14px] font-semibold shadow-[0_0_24px_rgba(168,85,247,0.4)] hover:scale-[1.02] transition">
            <Upload size={15} /> Choose Photo
          </button>
          <div className="mt-4 text-[12.5px] text-white/45">Your photo is used only for styling and is never shared.</div>
        </div>
      </div>
    </div>
  );
}

function OptionsState({ photo, onChange, onPick }: { photo: string; onChange: () => void; onPick: (id: OptionId) => void }) {
  return (
    <div className="mt-8">
      <p className="text-[15px] text-white/60">What would you like to do today?</p>

      <div className="mt-5 flex items-center gap-4 rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.08] backdrop-blur p-4">
        <img src={photo} alt="Your photo" className="h-16 w-16 rounded-xl object-cover border border-white/10" />
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-300">
            <CheckCircle2 size={14} /> Photo uploaded
          </div>
          <div className="text-[13px] text-white/65 mt-0.5">Ready for personalized advice</div>
        </div>
        <button onClick={onChange} className="text-[12.5px] text-white/70 hover:text-white border border-white/15 rounded-full px-3 h-8">Change</button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((o) => {
          const Icon = o.icon;
          return (
            <button key={o.id} onClick={() => onPick(o.id)} className="group text-left relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 hover:-translate-y-0.5 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-purple-500/25 to-fuchsia-500/25 border border-purple-400/30 text-purple-200">
                <Icon size={16} />
              </span>
              <div className="mt-4 font-display text-[17px] text-white">{o.title}</div>
              <p className="mt-1.5 text-[13px] text-white/60 leading-relaxed">{o.desc}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-purple-300">
                Start <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <button onClick={() => onPick("style-this")} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 text-white px-5 h-11 text-[13.5px] font-semibold hover:bg-white/[0.1] transition">
          <MessageCircle size={14} /> Or just chat freely
        </button>
      </div>
    </div>
  );
}

const RESPONSES: Record<OptionId, { heading: string; body: string; cards: { title: string; img: string; tone: string }[] }> = {
  rate: {
    heading: "Outfit Rating: 8.4 / 10",
    body: "Strong silhouette and well-balanced palette. The proportions read polished, with a clean upper layer and a relaxed bottom. To push it from good to great, try a defined waist or a single statement accent in a deeper tone.",
    cards: [
      { title: "Same look, defined waist", img: g2a, tone: "Refined" },
      { title: "Deeper neutral accent", img: g3a, tone: "Elevated" },
      { title: "Polished evening edit", img: g4a, tone: "Sharp" },
    ],
  },
  colors: {
    heading: "Your Color Palette",
    body: "Based on your photo, Stylo suggests soft neutrals, deep navy, emerald green, warm beige, and muted lavender. These tones can create a clean balanced look while keeping your outfit polished.",
    cards: [
      { title: "Neutral blazer look", img: g2a, tone: "Warm beige + ivory" },
      { title: "Emerald evening look", img: g3a, tone: "Emerald + black" },
      { title: "Soft lavender casual", img: g4a, tone: "Lavender + cream" },
    ],
  },
  work: {
    heading: "Polished workwear suggestions",
    body: "Lean into structured pieces in muted tones. A clean blazer over a tonal knit pairs well with tailored trousers. Keep the palette to two anchors and one softer accent for a confident, modern office look.",
    cards: [
      { title: "Tailored navy blazer", img: g2a, tone: "Office ready" },
      { title: "Tonal knit + trousers", img: g3a, tone: "Meeting day" },
      { title: "Soft beige co-ord", img: g4a, tone: "Smart casual" },
    ],
  },
  casual: {
    heading: "Easy weekend looks",
    body: "Comfortable cuts in breathable fabrics. Try a relaxed shirt with wide-leg trousers, or a soft knit with a midi skirt. Keep colors warm and natural to feel effortless without losing polish.",
    cards: [
      { title: "Relaxed shirt + trousers", img: g2a, tone: "Brunch" },
      { title: "Knit + midi skirt", img: g3a, tone: "City stroll" },
      { title: "Linen co-ord", img: g4a, tone: "Sunny day" },
    ],
  },
  date: {
    heading: "Date night outfit ideas",
    body: "Pick one defining piece — a satin dress, a sharp blazer set, or a textured knit. Keep the rest minimal so the look feels confident, balanced, and intentional.",
    cards: [
      { title: "Satin midi dress", img: g2a, tone: "Romantic" },
      { title: "Tailored blazer set", img: g3a, tone: "Modern" },
      { title: "Textured knit look", img: g4a, tone: "Cozy chic" },
    ],
  },
  "style-this": {
    heading: "Styling around your piece",
    body: "Build three different moods from the same hero piece — relaxed, polished, and evening. Vary the bottom, the layering, and the level of accent color to shift the tone without changing the core item.",
    cards: [
      { title: "Relaxed daytime", img: g2a, tone: "Soft" },
      { title: "Polished office", img: g3a, tone: "Structured" },
      { title: "Evening edit", img: g4a, tone: "Statement" },
    ],
  },
};

function ResponseState({ photo, option, onBack, message, setMessage }: { photo: string; option: OptionId; onBack: () => void; message: string; setMessage: (v: string) => void }) {
  const r = RESPONSES[option];
  const opt = OPTIONS.find((o) => o.id === option)!;
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <img src={photo} alt="You" className="w-full aspect-[4/5] object-cover" />
          <div className="p-4">
            <div className="inline-flex items-center gap-1.5 text-[12px] text-emerald-300"><CheckCircle2 size={12} /> Your photo</div>
          </div>
        </div>
        <div className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-700/30 to-fuchsia-700/20 backdrop-blur-xl p-4">
          <div className="text-[11.5px] font-semibold tracking-[0.18em] uppercase text-purple-200/80">Your request</div>
          <div className="mt-1.5 font-display text-[17px] text-white">{opt.title}</div>
        </div>
        <button onClick={onBack} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white/[0.06] border border-white/15 text-white h-10 text-[13px] font-semibold hover:bg-white/[0.1] transition">
          Ask another question
        </button>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.5)]">
              <Sparkles size={15} />
            </span>
            <div className="font-display text-[18px] text-white">{r.heading}</div>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed text-white/75">{r.body}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {r.cards.map((c) => (
              <div key={c.title} className="rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
                <img src={c.img} alt={c.title} className="w-full aspect-[3/4] object-cover" />
                <div className="p-3">
                  <div className="text-[13.5px] text-white font-medium">{c.title}</div>
                  <div className="text-[11.5px] text-purple-300 mt-0.5">{c.tone}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link to="/dashboard/shoppers/try-on" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 h-10 text-[13px] font-semibold shadow-[0_0_18px_rgba(168,85,247,0.35)] hover:scale-[1.02] transition">
              Try outfit on
            </Link>
            <Link to="/dashboard/shoppers/fashion-store" className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/15 text-white px-4 h-10 text-[13px] font-semibold hover:bg-white/[0.1] transition">
              Find products
            </Link>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setMessage(""); }}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-2"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask Stylo anything about your outfit..."
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/35 px-3 h-10 text-[14px]"
          />
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 h-10 text-[13px] font-semibold shadow-[0_0_18px_rgba(168,85,247,0.35)] hover:scale-[1.02] transition">
            <Send size={13} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
