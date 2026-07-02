import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  CreditCard, MousePointerClick, Store, TrendingUp, Trophy, Sparkles, ArrowUpRight,
} from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";

export const Route = createFileRoute("/dashboard/brands/analytics")({
  head: () => ({ meta: [{ title: "Analytics — TryVerse Brand" }] }),
  component: Analytics,
});

const METRICS = [
  { label: "Total Credits Used", value: "265", icon: CreditCard, tone: "purple" as const },
  { label: "Widget Try-Ons", value: "0", icon: MousePointerClick, tone: "purple" as const },
  { label: "Active Stores", value: "26", icon: Store, tone: "purple" as const },
  { label: "Conversion Lift", value: "+18%", icon: TrendingUp, tone: "emerald" as const },
  { label: "Top Store", value: "Frank And Oak", icon: Trophy, tone: "purple" as const },
  { label: "AI Outputs Created", value: "143", icon: Sparkles, tone: "purple" as const },
];

const FEATURE_CREDITS = [
  { name: "Fabric Studio", used: 30 },
  { name: "AI Photoshoot", used: 172 },
  { name: "Ghost Mannequin", used: 63 },
  { name: "Video Studio", used: 0 },
  { name: "Pose Studio", used: 0 },
  { name: "Widget", used: 0 },
];
const STORE_CREDITS = [
  { name: "No store", used: 7 },
  { name: "Frank And Oak", used: 258 },
  { name: "Maison Studio", used: 0 },
];
const TOP_PRODUCTS = [
  { p: "Lavender Oversized Blazer", s: "Frank And Oak", t: 42, sv: 11, c: "8.2%" },
  { p: "Linen Shirt", s: "Maison Studio", t: 36, sv: 9, c: "7.4%" },
  { p: "Blue Shalwar Kameez", s: "Maison Studio", t: 28, sv: 6, c: "6.9%" },
];
const TIMELINE = [
  "AI Photoshoot generated — 2 hours ago",
  "Ghost Mannequin saved to catalog — Yesterday",
  "Widget key copied — 2 days ago",
  "Fabric Studio visualization generated — 3 days ago",
];

function Analytics() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");
  const maxFeature = Math.max(...FEATURE_CREDITS.map((f) => f.used), 1);
  const maxStore = Math.max(...STORE_CREDITS.map((f) => f.used), 1);

  return (
    <BrandShell title="Analytics">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10 space-y-8">
        <BrandPageHeader
          eyebrow="Insights"
          title="Analytics"
          subtitle="Track credit usage, widget performance, store activity, and product engagement."
          right={
            <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-1">
              {(["7d", "30d", "90d"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => { setRange(r); toast.info(`Range: ${r}`); }}
                  className={`px-3.5 py-1.5 text-[12.5px] rounded-md transition ${
                    range === r ? "bg-purple-500/25 text-white border border-purple-400/40" : "text-white/60 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          }
        />

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {METRICS.map((m) => {
            const Icon = m.icon;
            const accent = m.tone === "emerald" ? "from-emerald-500/40 to-teal-500/30" : "from-purple-600/40 to-fuchsia-500/30";
            return (
              <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${accent} border border-white/10`}>
                    <Icon size={15} className="text-white" />
                  </span>
                  {m.tone === "emerald" && <span className="text-[11px] text-emerald-300">↑ vs prev</span>}
                </div>
                <div className="mt-4 text-[11px] uppercase tracking-widest text-white/50">{m.label}</div>
                <div className="mt-1 font-display text-2xl text-white truncate">{m.value}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Credits by Feature */}
          <Card title="Credits by Feature">
            <div className="space-y-3">
              {FEATURE_CREDITS.map((f) => (
                <BarRow key={f.name} label={f.name} value={f.used} max={maxFeature} />
              ))}
            </div>
          </Card>

          {/* Credits by Store */}
          <Card title="Credits by Store">
            <div className="space-y-3">
              {STORE_CREDITS.map((f) => (
                <BarRow key={f.name} label={f.name} value={f.used} max={maxStore} />
              ))}
            </div>
          </Card>

          {/* Credits by User */}
          <Card title="Credits by User">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-[12px] font-semibold shadow-[0_0_16px_rgba(168,85,247,0.5)]">HK</span>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] text-white">Hussnain</div>
                <div className="text-[11.5px] text-white/50 truncate">hussnain@tryverse.app</div>
              </div>
              <div className="text-right">
                <div className="font-display text-lg text-white">265</div>
                <div className="text-[11px] text-white/50">credits</div>
              </div>
            </div>
          </Card>

          {/* Widget Usage by Store */}
          <Card title="Widget Usage by Store">
            <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
              <div className="text-[13.5px] text-white/70">No widget usage in this period.</div>
              <Link
                to="/dashboard/brands/widget"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[12.5px] font-medium shadow-[0_0_16px_rgba(168,85,247,0.45)]"
              >
                Set up Widget <ArrowUpRight size={13} />
              </Link>
            </div>
          </Card>
        </div>

        {/* Top Products */}
        <Card title="Top Products">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[560px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-widest text-white/50 border-b border-white/10">
                  <th className="py-2.5 pr-4 font-medium">Product</th>
                  <th className="py-2.5 pr-4 font-medium">Store</th>
                  <th className="py-2.5 pr-4 font-medium">Try-ons</th>
                  <th className="py-2.5 pr-4 font-medium">Saves</th>
                  <th className="py-2.5 pr-4 font-medium">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map((row) => (
                  <tr key={row.p} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] cursor-pointer" onClick={() => toast.info(`${row.p} · details coming soon`)}>
                    <td className="py-3 pr-4 text-white">{row.p}</td>
                    <td className="py-3 pr-4 text-white/70">{row.s}</td>
                    <td className="py-3 pr-4 text-white/80">{row.t}</td>
                    <td className="py-3 pr-4 text-white/80">{row.sv}</td>
                    <td className="py-3 pr-4 text-emerald-300">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Timeline */}
        <Card title="Activity Timeline">
          <ol className="space-y-3">
            {TIMELINE.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
                <div className="text-[13px] text-white/80">{t}</div>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </BrandShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6">
      <div className="text-[13px] font-semibold text-white mb-4">{title}</div>
      {children}
    </div>
  );
}

function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.max(2, (value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-[12.5px]">
        <span className="text-white/80">{label}</span>
        <span className="text-white/60">{value}</span>
      </div>
      <div className="mt-1.5 h-2 w-full rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
          style={{ width: `${value === 0 ? 0 : pct}%` }}
        />
      </div>
    </div>
  );
}
