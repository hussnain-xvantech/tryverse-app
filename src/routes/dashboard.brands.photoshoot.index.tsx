import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Camera, Upload, ArrowLeft, ArrowRight, Check, Sparkles, ChevronRight,
  History, Package, User as UserIcon, Palette, Aperture, Loader2, X,
} from "lucide-react";
import { BrandShell } from "@/components/site/BrandShell";
import { saveSelection, pushHistory, type PhotoshootSelection } from "@/lib/photoshoot-store";

// Assets (clothing only)
import flatlay from "@/assets/garment-flatlay.jpg";
import blazer from "@/assets/clothing-blazer.jpg";
import g1 from "@/assets/g1-after.jpg";
import g2 from "@/assets/g2-after.jpg";
import g3 from "@/assets/g3-after.jpg";
import g4 from "@/assets/g4-after.jpg";
import g5 from "@/assets/g5-after.jpg";
import g6 from "@/assets/g6-after.jpg";
import g1b from "@/assets/g1-before.jpg";
import g2b from "@/assets/g2-before.jpg";
import g2c from "@/assets/g2-catalog.jpg";
import editorial from "@/assets/editorial-hero.jpg";
import hero from "@/assets/hero-result.jpg";
import cta from "@/assets/cta-result.jpg";
import blazerAfter from "@/assets/blazer-after.jpg";
import blazerBefore from "@/assets/blazer-before.jpg";

export const Route = createFileRoute("/dashboard/brands/photoshoot/")({
  head: () => ({ meta: [{ title: "AI Photoshoot — TryVerse Brand Studio" }] }),
  component: PhotoshootWizard,
});

// ---------- Data ----------
const PRODUCT_IMAGES = [flatlay, blazer, g1b, g2b, g2c, blazerBefore, g3, g4, g5, g6, g1, g2, editorial, hero, cta];
const CATALOG = [
  "Linen Shirt — Long Sleeve",
  "Linen Shirt — Short Sleeve",
  "Lyocell Resort Shirt",
  "Relaxed Linen Trouser",
  "Essential Chino Short",
  "Essential Slim Chino Pant",
  "Pique Henley",
  "Relaxed Hemp Tee",
  "Essential Ribbed Tank",
  "Cotton Overshirt",
  "Beige Co-ord Set",
  "Lavender Blazer",
  "Cream Wide Leg Trouser",
  "Black Studio Shirt",
  "Olive Utility Pants",
].map((name, i) => ({
  id: `p${i}`,
  name,
  category: name.toLowerCase().includes("trouser") || name.toLowerCase().includes("pant") || name.toLowerCase().includes("short")
    ? "Bottoms"
    : name.toLowerCase().includes("blazer") || name.toLowerCase().includes("overshirt") || name.toLowerCase().includes("co-ord")
    ? "Outerwear"
    : "Tops",
  image: PRODUCT_IMAGES[i % PRODUCT_IMAGES.length],
}));

const MODEL_IMAGES = [g1, g2, g3, g4, g5, g6, editorial, hero, cta, blazerAfter, g1b, g2b];

const FEMALE_MODELS = [
  ["Sofia", "South Asian", "Slim", "20s"],
  ["Aisha", "Middle Eastern", "Average", "20s"],
  ["Mei", "East Asian", "Slim", "20s"],
  ["Zara", "African", "Curvy", "20s"],
  ["Elena", "Caucasian", "Average", "30s"],
  ["Amara", "African", "Average", "20s"],
  ["Priya", "South Asian", "Average", "20s"],
  ["Hana", "East Asian", "Slim", "20s"],
  ["Nadia", "Caucasian", "Slim", "20s"],
  ["Fatima", "South Asian", "Average", "20s"],
  ["Elif", "Middle Eastern", "Slim", "20s"],
  ["Chiamaka", "African", "Average", "20s"],
  ["Valentina", "Latino", "Curvy", "20s"],
  ["Putri", "Southeast Asian", "Slim", "20s"],
].map(([name, region, body, age], i) => ({
  id: `mf${i}`, name, region, body, age, image: MODEL_IMAGES[i % MODEL_IMAGES.length],
}));

const MALE_MODELS = [
  ["Marcus", "African", "Athletic", "20s"],
  ["Liam", "Caucasian", "Athletic", "30s"],
  ["Carlos", "Latino", "Athletic", "20s"],
  ["Arjun", "South Asian", "Average", "30s"],
  ["Owais", "Middle Eastern", "Slim", "20s"],
  ["Yuki", "East Asian", "Slim", "20s"],
  ["Ling", "East Asian", "Average", "20s"],
  ["Omar", "Middle Eastern", "Athletic", "30s"],
  ["James", "Caucasian", "Athletic", "30s"],
  ["Diego", "Latino", "Average", "30s"],
  ["Kofi", "African", "Athletic", "30s"],
].map(([name, region, body, age], i) => ({
  id: `mm${i}`, name, region, body, age, image: MODEL_IMAGES[(i + 3) % MODEL_IMAGES.length],
}));

const CUSTOM_MODELS = [
  { id: "cm1", name: "Arsalan", label: "Brand Ambassador", image: MODEL_IMAGES[2] },
  { id: "cm2", name: "Awais", label: "Custom", image: MODEL_IMAGES[5] },
  { id: "cm3", name: "Hassan", label: "Brand Ambassador", image: MODEL_IMAGES[8] },
];

const STYLE_CATEGORIES = [
  "Studio", "Street Style", "Sports & Activewear", "Unique Locations",
  "Fashion Ideas", "Colored Backgrounds", "Premium Lifestyle",
] as const;

const STYLES: Record<string, string[]> = {
  "Studio": ["Editorial Studio Portrait", "White Studio", "Cobalt Studio Portrait", "Minimal Fashion Studio", "Black Studio", "Golden Studio"],
  "Street Style": ["City Sidewalk", "Urban Crosswalk", "Boutique Street", "Concrete Wall", "Evening Street", "Minimal Outdoor"],
  "Sports & Activewear": ["Gym Studio", "Running Track", "Tennis Court", "Athletic Campaign", "Yoga Studio", "Outdoor Fitness"],
  "Unique Locations": ["Desert Editorial", "Modern Gallery", "Luxury Hotel", "Rooftop", "Minimal Architecture", "Garden Studio"],
  "Fashion Ideas": ["Campaign Hero", "Lookbook", "Ecommerce Catalog", "Social Ad", "Seasonal Drop", "Editorial Magazine"],
  "Colored Backgrounds": ["Pastel Pink", "Mint Green", "Lavender", "Soft Yellow", "Coral", "Sky Blue"],
  "Premium Lifestyle": ["Luxury Apartment", "Boutique Interior", "Resort Walk", "Coffee Studio", "Modern Office", "Gallery Corridor"],
};

const STYLE_IMAGES = [editorial, hero, cta, g1, g2, g3, g4, g5, g6, blazerAfter];

const COLORS = [
  { name: "Auto", hex: "" },
  { name: "Pastel Pink", hex: "#f8c8d4" },
  { name: "Mint Green", hex: "#b8e6c9" },
  { name: "Lavender", hex: "#c8b8e6" },
  { name: "Soft Yellow", hex: "#f5e6a3" },
  { name: "Coral", hex: "#f5a89b" },
  { name: "Sky Blue", hex: "#a8d0e6" },
  { name: "Peach", hex: "#f5c9a8" },
  { name: "Sage Green", hex: "#b8ccb0" },
  { name: "Rose", hex: "#d99aa8" },
  { name: "Cream", hex: "#f0e6d2" },
  { name: "Dusty Blue", hex: "#8ea3b8" },
  { name: "Warm Beige", hex: "#d9c4a8" },
  { name: "White", hex: "#ffffff" },
  { name: "Charcoal", hex: "#333333" },
  { name: "Royal Blue", hex: "#3a5199" },
  { name: "Terracotta", hex: "#c17a5f" },
];

const ANGLES = [
  { id: "front", name: "Front View", desc: "Model facing camera directly", required: true },
  { id: "three-quarter", name: "3/4 View", desc: "45° angled shot" },
  { id: "left", name: "Left Side", desc: "90° left profile" },
  { id: "right", name: "Right Side", desc: "90° right profile" },
  { id: "back", name: "Back View", desc: "180° rear shot" },
  { id: "detail", name: "Detail Close-up", desc: "Fabric and embroidery macro" },
  { id: "lifestyle", name: "Lifestyle", desc: "Candid walking or movement" },
];

const STEP_LABELS = ["Product", "Model", "Style", "Angles"] as const;
type StepIdx = 0 | 1 | 2 | 3;

// ---------- UI atoms ----------
function Stepper({ step, onJump }: { step: StepIdx; onJump: (s: StepIdx) => void }) {
  const icons = [Package, UserIcon, Palette, Aperture];
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-2 px-2">
      {STEP_LABELS.map((label, i) => {
        const Icon = icons[i];
        const done = i < step;
        const active = i === step;
        const clickable = i <= step;
        return (
          <div key={label} className="flex items-center gap-2 shrink-0">
            <button
              disabled={!clickable}
              onClick={() => clickable && onJump(i as StepIdx)}
              className={`inline-flex items-center gap-2 rounded-full pl-2 pr-4 py-1.5 text-[12.5px] font-medium border transition ${
                active
                  ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.5)]"
                  : done
                  ? "bg-white/[0.06] text-white border-purple-400/40 hover:bg-white/10"
                  : "bg-white/[0.02] text-white/40 border-white/10 cursor-not-allowed"
              }`}
            >
              <span className={`grid h-6 w-6 place-items-center rounded-full text-[11px] ${
                active ? "bg-white/25" : done ? "bg-emerald-500/30 text-emerald-200" : "bg-white/10"
              }`}>
                {done ? <Check size={12} /> : <Icon size={12} />}
              </span>
              <span className="whitespace-nowrap">{i + 1}. {label}</span>
            </button>
            {i < 3 && <ChevronRight size={14} className="text-white/25 shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div>
      {eyebrow && <div className="text-[11px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">{eyebrow}</div>}
      <h2 className="mt-1 font-display text-2xl sm:text-[28px] text-white leading-tight">{title}</h2>
      {sub && <p className="mt-1.5 text-[14px] text-white/60">{sub}</p>}
    </div>
  );
}

function GlassCard({ children, className = "", selected = false, onClick, as = "div" }: {
  children: React.ReactNode; className?: string; selected?: boolean; onClick?: () => void; as?: "div" | "button";
}) {
  const Comp: any = as;
  return (
    <Comp
      onClick={onClick}
      className={`relative rounded-2xl border backdrop-blur-xl transition text-left ${
        selected
          ? "border-purple-400/70 bg-purple-500/[0.08] shadow-[0_0_24px_rgba(168,85,247,0.28)]"
          : "border-white/10 bg-white/[0.03] hover:border-purple-400/40 hover:bg-white/[0.05]"
      } ${className}`}
    >
      {selected && (
        <span className="absolute top-2 right-2 z-10 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.7)]">
          <Check size={12} strokeWidth={3} />
        </span>
      )}
      {children}
    </Comp>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11.5px] text-white/70">
      {children}
    </span>
  );
}

// ---------- Wizard ----------
function PhotoshootWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState<StepIdx>(0);

  // Step 1 state
  const [productType, setProductType] = useState<"single" | "multiple">("single");
  const [uploadedName, setUploadedName] = useState<string | null>(null);
  const [uploadedSecondaryName, setUploadedSecondaryName] = useState<string | null>(null);
  const [product, setProduct] = useState<typeof CATALOG[number] | null>(null);
  const [productSecondary, setProductSecondary] = useState<typeof CATALOG[number] | null>(null);

  // Step 2
  const [model, setModel] = useState<any | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Step 3
  const [styleCategory, setStyleCategory] = useState<string>("Studio");
  const [selectedStyle, setSelectedStyle] = useState<{ id: string; name: string; image: string } | null>(null);
  const [background, setBackground] = useState<string>("Auto");

  // Step 4
  const [angles, setAngles] = useState<string[]>(["front"]);
  const [instructions, setInstructions] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(0);

  const canNext = useMemo(() => {
    if (step === 0) {
      if (productType === "single") return !!product || !!uploadedName;
      return (!!product || !!uploadedName) && (!!productSecondary || !!uploadedSecondaryName);
    }
    if (step === 1) return !!model;
    if (step === 2) return !!selectedStyle;
    if (step === 3) return angles.length >= 2;
    return false;
  }, [step, productType, product, productSecondary, uploadedName, uploadedSecondaryName, model, selectedStyle, angles]);

  function toggleAngle(id: string) {
    if (id === "front") return; // required
    setAngles((prev) => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  }

  const productLabel = product?.name ?? uploadedName ?? null;
  const secondaryLabel = productSecondary?.name ?? uploadedSecondaryName ?? null;

  function goNext() {
    if (step < 3) setStep((s) => (s + 1) as StepIdx);
    else runGenerate();
  }

  function goBack() {
    if (step === 0) { navigate({ to: "/dashboard/brands" }); return; }
    setStep((s) => (s - 1) as StepIdx);
  }

  const GEN_STEPS = [
    "Reading product image",
    "Building model pose",
    "Applying selected style",
    "Rendering selected angles",
    "Finalizing outputs",
  ];

  function runGenerate() {
    if (!canNext) return;
    setGenerating(true);
    setGenStep(0);
    GEN_STEPS.forEach((_, i) => setTimeout(() => setGenStep(i + 1), (i + 1) * 480));
    setTimeout(() => {
      const sel: PhotoshootSelection = {
        productType,
        product: product ?? null,
        productSecondary: productSecondary ?? null,
        uploadedName, uploadedSecondaryName,
        model,
        styleCategory,
        style: selectedStyle,
        background,
        angles,
        instructions,
        generatedAt: new Date().toISOString(),
      };
      saveSelection(sel);
      pushHistory({
        id: crypto.randomUUID?.() ?? String(Date.now()),
        product: productLabel ?? "Uploaded product",
        productImage: product?.image ?? PRODUCT_IMAGES[0],
        model: model?.name ?? "Model",
        style: selectedStyle?.name ?? "Studio",
        angles: angles.length,
        date: new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
      });
      navigate({ to: "/dashboard/brands/photoshoot/results" });
    }, GEN_STEPS.length * 480 + 400);
  }

  return (
    <BrandShell title="AI Photoshoot">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-8 pb-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-600/40 to-fuchsia-500/30 border border-purple-400/30 text-purple-100 shadow-[0_0_18px_rgba(168,85,247,0.35)]">
              <Camera size={18} />
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl text-white leading-tight truncate">AI Photoshoot</h1>
              <p className="text-[13.5px] text-white/55">AI-powered product photography</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/brands/photoshoot/history"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-white/10 text-white/80 hover:text-white px-3.5 py-2 text-[12.5px] transition">
              <History size={13} /> History
            </Link>
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-7">
          <Stepper step={step} onJump={setStep} />
        </div>

        {/* Step content */}
        <div className="mt-8">
          {step === 0 && (
            <div className="space-y-8">
              <SectionHead eyebrow="Step 1" title="Choose Product" sub="Upload your product image or select from your catalog." />

              {/* Product type */}
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { key: "single", title: "Single Product", desc: "One garment or full outfit" },
                  { key: "multiple", title: "Multiple Products", desc: "Upper + lower body pair" },
                ].map((t) => (
                  <GlassCard key={t.key} as="button" selected={productType === t.key} onClick={() => setProductType(t.key as any)} className="p-5">
                    <div className="text-[14.5px] font-medium text-white">{t.title}</div>
                    <div className="text-[12.5px] text-white/55 mt-0.5">{t.desc}</div>
                  </GlassCard>
                ))}
              </div>

              {/* Upload boxes */}
              <div className={`grid gap-4 ${productType === "multiple" ? "md:grid-cols-2" : ""}`}>
                <UploadBox
                  title={productType === "multiple" ? "Upload Upper Body Garment" : "Upload Product Image"}
                  sub={productType === "multiple" ? "Drop image here or click to upload" : "Drop image here or click to upload"}
                  helper="JPG, PNG up to 10MB"
                  filename={uploadedName}
                  onPick={() => { setUploadedName("upper-garment.jpg"); setProduct(null); }}
                  onClear={() => setUploadedName(null)}
                />
                {productType === "multiple" && (
                  <UploadBox
                    title="Upload Lower Body Garment"
                    sub="Upload trousers, pants, skirt..."
                    helper="Pair with upper garment"
                    filename={uploadedSecondaryName}
                    onPick={() => { setUploadedSecondaryName("lower-garment.jpg"); setProductSecondary(null); }}
                    onClear={() => setUploadedSecondaryName(null)}
                  />
                )}
              </div>

              {/* Catalog */}
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg text-white">Or Select From Your Catalog</h3>
                  <div className="text-[12px] text-white/45">{CATALOG.length} products</div>
                </div>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {CATALOG.map((p) => {
                    const isPrimary = product?.id === p.id;
                    const isSecondary = productSecondary?.id === p.id;
                    const selected = productType === "single" ? isPrimary : isPrimary || isSecondary;
                    return (
                      <GlassCard key={p.id} as="button" selected={selected}
                        onClick={() => {
                          if (productType === "single") { setProduct(p); setUploadedName(null); }
                          else {
                            // pick primary first, then secondary
                            if (!product || isPrimary) { setProduct(isPrimary ? null : p); setUploadedName(null); }
                            else { setProductSecondary(isSecondary ? null : p); setUploadedSecondaryName(null); }
                          }
                        }} className="overflow-hidden">
                        <div className="aspect-[4/5] w-full overflow-hidden bg-white/[0.04]">
                          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                        </div>
                        <div className="px-3 py-2.5">
                          <div className="text-[10.5px] uppercase tracking-widest text-purple-300/80">{p.category}</div>
                          <div className="text-[12.5px] text-white leading-snug mt-0.5 line-clamp-2">{p.name}</div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8">
              <SectionHead eyebrow="Step 2" title="Select Model" sub="Choose an AI model for your photoshoot." />

              <div>
                <h3 className="font-display text-lg text-white mb-4">Your Custom Models</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {CUSTOM_MODELS.map((m) => (
                    <ModelCard key={m.id} m={{ ...m, region: m.label, body: "Custom", age: "" }}
                      selected={model?.id === m.id} onClick={() => setModel(m)} />
                  ))}
                  <button onClick={() => setShowComingSoon(true)}
                    className="rounded-2xl border-2 border-dashed border-white/15 hover:border-purple-400/50 bg-white/[0.02] hover:bg-white/[0.05] transition aspect-[3/4] grid place-items-center text-center px-4">
                    <div>
                      <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200"><Sparkles size={16} /></span>
                      <div className="mt-2 text-[13px] text-white font-medium">Create Your Own</div>
                      <div className="text-[11px] text-white/45 mt-0.5">Train a custom model</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg text-white mb-4">Female Models</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {FEMALE_MODELS.map((m) => (
                    <ModelCard key={m.id} m={m} selected={model?.id === m.id} onClick={() => setModel(m)} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg text-white mb-4">Male Models</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {MALE_MODELS.map((m) => (
                    <ModelCard key={m.id} m={m} selected={model?.id === m.id} onClick={() => setModel(m)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <SectionHead eyebrow="Step 3" title="Choose Style" sub="Pick a scene style for your photoshoot." />

              <div className="flex flex-wrap gap-2">
                {STYLE_CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => { setStyleCategory(cat); setSelectedStyle(null); }}
                    className={`px-3.5 py-1.5 rounded-full text-[12.5px] border transition ${
                      styleCategory === cat
                        ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white border-transparent shadow-[0_0_18px_rgba(168,85,247,0.4)]"
                        : "bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}>{cat}</button>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STYLES[styleCategory].map((name, i) => {
                  const id = `${styleCategory}-${i}`;
                  const image = STYLE_IMAGES[(i * 3 + styleCategory.length) % STYLE_IMAGES.length];
                  const sel = selectedStyle?.id === id;
                  return (
                    <GlassCard key={id} as="button" selected={sel} onClick={() => setSelectedStyle({ id, name, image })}
                      className="overflow-hidden">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 right-3 text-white text-[13px] font-medium">{name}</div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <h3 className="font-display text-base text-white">Background Color</h3>
                    <p className="text-[12px] text-white/50">Optional, defaults to preset scene.</p>
                  </div>
                  <div className="text-[11.5px] text-purple-300/80">Selected: {background}</div>
                </div>
                <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 gap-2.5">
                  {COLORS.map((c) => {
                    const sel = background === c.name;
                    return (
                      <button key={c.name} onClick={() => setBackground(c.name)}
                        className={`group text-left`}>
                        <div className={`relative aspect-square rounded-xl border-2 transition overflow-hidden ${
                          sel ? "border-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.4)]" : "border-white/10 group-hover:border-white/25"
                        }`}
                          style={c.hex ? { background: c.hex } : { background: "linear-gradient(135deg, #2a1a4a, #1a0f2f)" }}>
                          {!c.hex && <span className="absolute inset-0 grid place-items-center text-white/70"><Sparkles size={14} /></span>}
                          {sel && (
                            <span className="absolute top-1 right-1 grid h-4 w-4 place-items-center rounded-full bg-purple-500 text-white">
                              <Check size={9} strokeWidth={3} />
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 text-[10.5px] text-white/60 text-center truncate">{c.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <SectionHead eyebrow="Step 4" title="Choose Poses & Angles" sub="Select which poses and angles to generate. Minimum 2." />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ANGLES.map((a) => {
                  const sel = angles.includes(a.id);
                  return (
                    <GlassCard key={a.id} as="button" selected={sel} onClick={() => toggleAngle(a.id)} className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-medium text-white">{a.name}</span>
                            {a.required && (
                              <span className="text-[10px] tracking-widest uppercase bg-purple-500/20 text-purple-200 border border-purple-400/30 rounded-full px-1.5 py-0.5">Required</span>
                            )}
                          </div>
                          <div className="text-[12.5px] text-white/55 mt-1">{a.desc}</div>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>

              {angles.length < 2 && (
                <div className="text-[12px] text-amber-300/90">Select at least 2 angles to generate.</div>
              )}

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5">
                <div className="text-[12px] font-medium uppercase tracking-widest text-purple-300/80 mb-2">
                  Additional Instructions <span className="text-white/40 normal-case tracking-normal">Optional</span>
                </div>
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Example: show dupatta draped over shoulder, use wooden stool prop, editorial magazine look..."
                  className="w-full min-h-[96px] rounded-xl bg-black/30 border border-white/10 focus:border-purple-400/50 focus:outline-none text-white text-[13.5px] p-3 placeholder:text-white/30" />
              </div>

              <div className="rounded-2xl border border-purple-400/25 bg-purple-500/[0.05] p-5">
                <div className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">Generation Summary</div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-[13px]">
                  <SummaryRow label="Product" value={productLabel ?? "—"} sub={secondaryLabel ?? undefined} />
                  <SummaryRow label="Model" value={model?.name ?? "—"} sub={model ? `${model.region} · ${model.body}` : undefined} />
                  <SummaryRow label="Style" value={selectedStyle?.name ?? "—"} sub={styleCategory} />
                  <SummaryRow label="Angles" value={`${angles.length} selected`} sub={angles.length === 6 ? "Full set" : undefined} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#070210]/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-3 flex items-center gap-3">
          <button onClick={goBack}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 hover:text-white px-4 py-2 text-[12.5px] transition">
            <ArrowLeft size={13} /> Back
          </button>
          <div className="hidden md:flex flex-1 min-w-0 items-center gap-2 overflow-x-auto">
            {productLabel && <Chip><Package size={11} /> {productLabel}{secondaryLabel ? ` + ${secondaryLabel}` : ""}</Chip>}
            {model && <Chip><UserIcon size={11} /> {model.name}</Chip>}
            {selectedStyle && <Chip><Palette size={11} /> {selectedStyle.name}</Chip>}
            {step === 3 && <Chip><Aperture size={11} /> {angles.length} angles</Chip>}
          </div>
          <div className="flex-1 md:hidden" />
          <button onClick={goNext} disabled={!canNext || generating}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13px] font-medium shadow-[0_0_24px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed">
            {generating ? <><Loader2 size={14} className="animate-spin" /> Generating…</>
              : step === 3 ? <><Sparkles size={13} /> Generate ({angles.length} Angles)</>
              : <>Next <ArrowRight size={13} /></>}
          </button>
        </div>
      </div>

      {/* Coming soon modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShowComingSoon(false)}>
          <div className="max-w-sm w-full rounded-2xl border border-white/10 bg-[#1a1130]/95 p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-purple-600/40 to-fuchsia-500/30 border border-purple-400/30 text-white"><Sparkles size={18} /></span>
            <h3 className="mt-4 font-display text-xl text-white">Custom Model Training</h3>
            <p className="mt-2 text-[13.5px] text-white/60">Bring your own brand ambassador into TryVerse. Coming soon to Maison Studio.</p>
            <button onClick={() => setShowComingSoon(false)} className="mt-5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white px-5 py-2 text-[13px]">Got it</button>
          </div>
        </div>
      )}

      {/* Generation overlay */}
      {generating && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full rounded-2xl border border-purple-400/30 bg-[#0f0722]/95 p-7 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white">
                <Loader2 size={18} className="animate-spin" />
              </span>
              <div>
                <div className="font-display text-lg text-white">Generating Your Photoshoot</div>
                <div className="text-[12.5px] text-white/55">Preserving garment color, fit, fabric, and details.</div>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {GEN_STEPS.map((s, i) => (
                <div key={s} className={`flex items-center gap-2 text-[13px] ${i < genStep ? "text-emerald-300" : i === genStep ? "text-white" : "text-white/40"}`}>
                  {i < genStep ? <Check size={13} /> : i === genStep ? <Loader2 size={13} className="animate-spin" /> : <span className="h-1.5 w-1.5 rounded-full bg-white/25" />}
                  {s}
                </div>
              ))}
            </div>
            <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 transition-all" style={{ width: `${(genStep / GEN_STEPS.length) * 100}%` }} />
            </div>
          </div>
        </div>
      )}
    </BrandShell>
  );
}

// ---------- Sub components ----------
function UploadBox({ title, sub, helper, filename, onPick, onClear }: {
  title: string; sub: string; helper: string; filename: string | null; onPick: () => void; onClear: () => void;
}) {
  return (
    <div className={`relative rounded-2xl border-2 border-dashed transition ${
      filename ? "border-purple-400/60 bg-purple-500/[0.04]" : "border-white/15 hover:border-purple-400/50 bg-white/[0.02]"
    }`}>
      <button onClick={onPick} className="w-full text-center px-6 py-8 sm:py-10">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200"><Upload size={18} /></span>
        <div className="mt-3 text-[14px] text-white font-medium">{title}</div>
        <div className="mt-1 text-[12.5px] text-white/55">{sub}</div>
        <div className="mt-1 text-[11.5px] text-white/40">{helper}</div>
      </button>
      {filename && (
        <div className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-100 pl-2.5 pr-1.5 py-1 text-[11px]">
          <Check size={11} /> {filename}
          <button onClick={onClear} className="grid h-4 w-4 place-items-center rounded-full bg-white/10 hover:bg-white/20"><X size={9} /></button>
        </div>
      )}
    </div>
  );
}

function ModelCard({ m, selected, onClick }: { m: any; selected: boolean; onClick: () => void }) {
  return (
    <GlassCard as="button" selected={selected} onClick={onClick} className="overflow-hidden">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/[0.04]">
        <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <span className="absolute top-2 left-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/90 text-[10px] px-2 py-0.5">{m.region}</span>
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="text-white text-[13px] font-medium leading-tight">{m.name}</div>
          <div className="text-[10.5px] text-white/60 mt-0.5">{[m.body, m.age].filter(Boolean).join(" · ")}</div>
        </div>
      </div>
    </GlassCard>
  );
}

function SummaryRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="text-[10.5px] uppercase tracking-widest text-purple-300/80">{label}</div>
      <div className="mt-1 text-white text-[13.5px] leading-tight truncate">{value}</div>
      {sub && <div className="text-[11.5px] text-white/50 mt-0.5 truncate">{sub}</div>}
    </div>
  );
}
