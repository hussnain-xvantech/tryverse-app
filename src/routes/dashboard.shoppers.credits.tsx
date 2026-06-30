import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { ShopperPageHeader, SHOPPER_USER } from "@/components/site/ShopperShell";

export const Route = createFileRoute("/dashboard/shoppers/credits")({
  head: () => ({ meta: [{ title: "Credits & Plan — TryVerse" }, { name: "robots", content: "noindex" }] }),
  component: CreditsPage,
});

const USAGE = [
  { label: "Virtual Try-On", used: 24 },
  { label: "AI Fashion Store", used: 18 },
  { label: "Pose Studio", used: 12 },
  { label: "Showcase Video", used: 30 },
  { label: "AI Stylist", used: 5 },
];

const PACKS = [
  { credits: 250, price: "$50", per: "$0.20 per credit", badge: null as string | null },
  { credits: 500, price: "$85", per: "$0.17 per credit", badge: "Best Value" },
  { credits: 1000, price: "$150", per: "$0.15 per credit", badge: null },
];

const BENEFITS = ["Watermark-free results", "Priority processing", "HD downloads", "200 credits/month"];

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-7 shadow-[0_0_40px_-20px_rgba(168,85,247,0.4)] ${className}`}>
      {children}
    </div>
  );
}

function CreditsPage() {
  const max = Math.max(...USAGE.map((u) => u.used));
  const pct = (SHOPPER_USER.credits / SHOPPER_USER.monthly) * 100;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>
      <div className="mt-5">
        <ShopperPageHeader eyebrow="Billing" title="Credits & Plan" subtitle="Track usage and top up whenever you need more." />
      </div>

      <div className="mt-8 grid gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl text-white">TryVerse Pro</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active
                </span>
              </div>
              <p className="mt-1 text-[13.5px] text-white/60">{SHOPPER_USER.credits} credits remaining · {SHOPPER_USER.monthly} / month</p>
            </div>
            <button className="inline-flex h-10 items-center rounded-full bg-white/5 border border-white/15 px-5 text-[13.5px] font-medium text-white hover:bg-white/10 transition">
              Manage Plan
            </button>
          </div>
          <div className="relative mt-5">
            <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1.5 flex justify-between text-[11.5px] text-white/50">
              <span>{SHOPPER_USER.credits} of {SHOPPER_USER.monthly} remaining</span>
              <span>Resets next billing cycle</span>
            </div>
          </div>
          <ul className="relative mt-5 grid sm:grid-cols-2 gap-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2 text-[13.5px] text-white/75">
                <Check size={14} className="text-purple-300" /> {b}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-display text-xl text-white">Credit Usage</h2>
          <div className="mt-5 grid gap-3.5">
            {USAGE.map((u) => (
              <div key={u.label}>
                <div className="flex justify-between text-[13px] text-white/75">
                  <span>{u.label}</span>
                  <span className="text-white/55">{u.used} credits used</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-white/8 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400" style={{ width: `${(u.used / max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div>
          <h2 className="font-display text-xl text-white">Need More Credits?</h2>
          <p className="mt-1 text-[13.5px] text-white/55">Top-ups never expire and stack with your monthly plan.</p>
          <div className="mt-5 grid md:grid-cols-3 gap-4">
            {PACKS.map((p) => (
              <div
                key={p.credits}
                className={`relative rounded-2xl border p-6 backdrop-blur-xl ${
                  p.badge
                    ? "bg-gradient-to-b from-purple-600/15 to-fuchsia-500/5 border-purple-400/40 shadow-[0_0_40px_-15px_rgba(168,85,247,0.6)]"
                    : "bg-white/[0.03] border-white/10"
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white shadow">
                    <Sparkles size={10} /> {p.badge}
                  </span>
                )}
                <div className="text-[13px] text-white/60">{p.credits} credits</div>
                <div className="mt-1 font-display text-3xl text-white">{p.price}</div>
                <div className="mt-1 text-[12px] text-white/45">{p.per}</div>
                <button
                  onClick={() => toast("Credit purchase flow coming soon.")}
                  className="mt-5 w-full inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-[13.5px] font-medium text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:opacity-95 transition"
                >
                  Buy Pack
                </button>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <h2 className="font-display text-xl text-white">How Credits Work</h2>
          <ul className="mt-4 grid gap-2.5 text-[13.5px] text-white/75">
            {[
              "Credits are used when you generate AI results.",
              "Failed generations do not consume credits.",
              "Monthly plan credits refresh every billing cycle.",
              "Credit packs never expire.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check size={14} className="mt-1 text-purple-300 shrink-0" /> {t}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
