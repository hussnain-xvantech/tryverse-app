import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { ShopperPageHeader, SHOPPER_USER } from "@/components/site/ShopperShell";

export const Route = createFileRoute("/dashboard/shoppers/profile")({
  head: () => ({ meta: [{ title: "Your Profile — TryVerse" }, { name: "robots", content: "noindex" }] }),
  component: ProfilePage,
});

const UNITS = ["CM", "Inches", "Feet"] as const;
const FIELDS: { key: string; label: string; value: string }[] = [
  { key: "height", label: "Height", value: "5.74" },
  { key: "chest", label: "Chest", value: "3.1" },
  { key: "waist", label: "Waist", value: "2.7" },
  { key: "shoulder", label: "Shoulder", value: "1.5" },
  { key: "sleeve", label: "Sleeve Length", value: "2.1" },
  { key: "neck", label: "Neck", value: "1.2" },
];

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-7 shadow-[0_0_40px_-20px_rgba(168,85,247,0.4)] ${className}`}>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, disabled, helper }: { label: string; value: string; onChange?: (v: string) => void; disabled?: boolean; helper?: string }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium text-white/60">{label}</span>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="mt-1.5 w-full rounded-xl bg-black/30 border border-white/10 px-3.5 py-2.5 text-[14px] text-white placeholder:text-white/30 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition disabled:opacity-60"
      />
      {helper && <span className="mt-1 block text-[11.5px] text-white/40">{helper}</span>}
    </label>
  );
}

function ProfilePage() {
  const [name, setName] = useState(SHOPPER_USER.name);
  const [unit, setUnit] = useState<(typeof UNITS)[number]>("Feet");
  const [m, setM] = useState(Object.fromEntries(FIELDS.map((f) => [f.key, f.value])));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>
      <div className="mt-5">
        <ShopperPageHeader eyebrow="Account" title="Your Profile" subtitle="Manage your details and measurements." />
      </div>

      <div className="mt-8 grid gap-6">
        <Card>
          <h2 className="font-display text-xl text-white">Account Details</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={name} onChange={setName} />
            <Input label="Email" value={SHOPPER_USER.email} disabled helper="Email cannot be changed." />
          </div>
          <button
            onClick={() => toast.success("Profile updated successfully.")}
            className="mt-5 inline-flex h-10 items-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 text-[13.5px] font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:opacity-95 transition"
          >
            Save Changes
          </button>
        </Card>

        <Card>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="font-display text-xl text-white">Body Measurements</h2>
              <p className="mt-1 text-[13.5px] text-white/55">Used to improve AI size and fit recommendations.</p>
            </div>
            <div className="inline-flex rounded-full bg-black/30 border border-white/10 p-1">
              {UNITS.map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition ${
                    unit === u ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {FIELDS.map((f) => (
              <Input key={f.key} label={f.label} value={m[f.key]} onChange={(v) => setM({ ...m, [f.key]: v })} />
            ))}
          </div>
          <button
            onClick={() => toast.success("Measurements saved.")}
            className="mt-5 inline-flex h-10 items-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 text-[13.5px] font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:opacity-95 transition"
          >
            Save Measurements
          </button>
        </Card>

        <div className="rounded-2xl bg-emerald-500/5 border border-emerald-400/30 p-5 flex items-start gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/15 text-emerald-300">
            <ShieldCheck size={18} />
          </div>
          <p className="text-[13.5px] text-white/75 leading-relaxed">
            Your uploaded photos and generated results are not stored after your session.
          </p>
        </div>
      </div>
    </div>
  );
}
