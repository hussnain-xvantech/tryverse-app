import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Shirt, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/shoppers/try-on")({
  component: TryOnPlaceholder,
});

function TryOnPlaceholder() {
  return <DashFeatureStub title="Virtual Try-On" desc="Paste any product URL and see the outfit on yourself. We'll render a photoreal try-on in seconds." />;
}

export function DashFeatureStub({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13.5px] text-slate-600 hover:text-slate-900">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>
      <div className="mt-6 rounded-3xl bg-white border border-slate-200 shadow-sm p-8 sm:p-12 text-center">
        <span className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white">
          <Shirt size={20} />
        </span>
        <h1 className="mt-5 font-display text-3xl sm:text-4xl text-slate-900">{title}</h1>
        <p className="mt-3 text-[15px] text-slate-600 max-w-xl mx-auto">{desc}</p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-100 px-4 py-2 text-[13px] text-purple-700">
          <Sparkles size={13} /> Coming Soon — flow under construction
        </div>
        <div className="mt-8">
          <Link to="/dashboard/shoppers" className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-[13.5px] font-medium hover:bg-slate-700 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
