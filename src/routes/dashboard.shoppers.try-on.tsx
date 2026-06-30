import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shirt, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/shoppers/try-on")({
  component: TryOnPlaceholder,
});

function TryOnPlaceholder() {
  return (
    <DashFeatureStub
      title="Virtual Try-On"
      desc="Paste any product URL and see the outfit on yourself. We'll render a photoreal try-on in seconds."
    />
  );
}

export function DashFeatureStub({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-10">
      <Link
        to="/dashboard/shoppers"
        className="inline-flex items-center gap-1.5 text-[13.5px] text-white/60 hover:text-white transition"
      >
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
            <Link
              to="/dashboard/shoppers"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13.5px] font-semibold hover:scale-[1.02] transition shadow-[0_0_24px_rgba(168,85,247,0.4)]"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
