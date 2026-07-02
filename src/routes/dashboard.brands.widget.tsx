import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, RefreshCw, X, ShoppingBag, Upload, Sparkles } from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";
import blazer from "@/assets/clothing-blazer.jpg";
import result from "@/assets/hero-result.jpg";
import user from "@/assets/user-photo.jpg";

export const Route = createFileRoute("/dashboard/brands/widget")({
  head: () => ({ meta: [{ title: "Widget — TryVerse Brand" }] }),
  component: WidgetPage,
});

const SNIPPET = `<!-- TryVerse Virtual Try-On Widget -->
<script src="https://tryverse.app/static/embed.js"></script>
<script>
  TryVerse.init({
    siteId: 'client-maisonstudio-7738',
    apiKey: 'tv_live_d62f••••••••••••••',
  });
</script>`;

function WidgetPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    toast.success(`${label} copied`);
  };

  return (
    <BrandShell title="Widget">
      <section className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10 py-10 space-y-6">
        <BrandPageHeader
          eyebrow="Integration"
          title="Widget Integration"
          subtitle="Add virtual try-on to your online store and let shoppers try clothing before buying."
        />

        {/* Usage */}
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[13px] font-semibold text-white">Widget Usage</div>
              <div className="mt-0.5 text-[12px] text-white/50">Resets on the 1st of each month, UTC</div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 border border-purple-400/40 px-3 py-1 text-[11.5px] font-semibold text-purple-200">
              Suite Plan
            </span>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Metric label="Monthly Widget Try-Ons" value="0 / 100" />
            <Metric label="Total Remaining" value="100" />
            <Metric label="Extra Packs" value="0" />
          </div>
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div className="h-full w-[2%] bg-gradient-to-r from-purple-500 to-fuchsia-500" />
            </div>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-purple-400/25 bg-purple-500/5 p-4">
            <div>
              <div className="text-[13.5px] text-white font-medium">Need more try-ons?</div>
              <div className="text-[12px] text-white/60">Get 100 extra widget try-ons for $10/month.</div>
            </div>
            <button
              onClick={() => toast.info("Purchase flow coming soon.")}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[12.5px] font-medium shadow-[0_0_18px_rgba(168,85,247,0.45)]"
            >
              Buy More
            </button>
          </div>
        </Card>

        {/* Snippet */}
        <Card>
          <div className="text-[13px] font-semibold text-white">Embed Snippet</div>
          <div className="mt-1 text-[12.5px] text-white/60">
            Paste this code just before the closing <code className="text-purple-300">&lt;/body&gt;</code> tag on your website.
          </div>
          <div className="mt-4 relative rounded-xl border border-white/10 bg-[#0b0518] overflow-hidden">
            <button
              onClick={() => copy(SNIPPET, "Embed snippet")}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1.5 text-[11.5px] text-white/85"
            >
              <Copy size={12} /> Copy
            </button>
            <pre className="overflow-x-auto p-4 pr-24 text-[12px] leading-relaxed text-purple-100/90 font-mono">
              <code>{SNIPPET}</code>
            </pre>
          </div>
        </Card>

        {/* Credentials */}
        <Card>
          <div className="text-[13px] font-semibold text-white">API Credentials</div>
          <div className="mt-1 text-[12.5px] text-white/60">Use these credentials in the embed snippet. The API key is shown only once when created or regenerated.</div>
          <div className="mt-4 space-y-3">
            <CredentialRow label="Site ID" value="client-maisonstudio-7738" onCopy={copy} />
            <CredentialRow label="API Key" value="tv_live_d62f••••••••••••••" onCopy={copy} />
          </div>
          <button
            onClick={() => setConfirmOpen(true)}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-400/40 px-4 py-2 text-[12.5px] text-white/85 hover:text-rose-200 transition"
          >
            <RefreshCw size={13} /> Regenerate Key
          </button>
        </Card>

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <div className="text-[12.5px] font-semibold text-purple-300 tracking-wider uppercase">Free Tier</div>
            <div className="mt-2 font-display text-2xl text-white">100 try-ons / month</div>
            <div className="mt-2 text-[13px] text-white/60">Per store. Resets on the 1st of each month UTC.</div>
          </Card>
          <Card>
            <div className="text-[12.5px] font-semibold text-fuchsia-300 tracking-wider uppercase">Extra Quota</div>
            <div className="mt-2 font-display text-2xl text-white">$10 · 100 try-ons</div>
            <div className="mt-2 text-[13px] text-white/60">Stacks with free tier. Valid for 30 days.</div>
          </Card>
        </div>

        {/* How it works */}
        <Card>
          <div className="text-[13px] font-semibold text-white">How It Works</div>
          <ol className="mt-4 space-y-3">
            {[
              "Copy the embed snippet above and paste it into your website HTML before the closing </body> tag.",
              "The widget automatically detects product info from your page metadata, structured data, JSON-LD, and Open Graph tags.",
              "When a customer clicks the Try-On button on a product page, the product is auto-selected and they upload their photo.",
              "On listing pages with multiple products, customers can paste any product URL to try on.",
            ].map((s, i) => (
              <li key={i} className="flex gap-3 text-[13px] text-white/75">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-purple-500/20 border border-purple-400/40 text-[11px] font-semibold text-purple-200">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-[12.5px] text-white/65">
            Works automatically with Shopify, WooCommerce, Magento, BigCommerce, and stores using standard Open Graph or JSON-LD product markup.
          </div>
        </Card>

        {/* Preview */}
        <Card>
          <div className="text-[13px] font-semibold text-white">Widget Preview</div>
          <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-5 flex flex-col md:flex-row gap-5 items-center">
            <img src={blazer} alt="Product" className="w-40 h-52 rounded-lg object-cover border border-white/10" />
            <div className="flex-1 min-w-0">
              <div className="text-[12px] text-white/50 uppercase tracking-wider">Maison Studio</div>
              <div className="mt-1 font-display text-xl text-white">Lavender Oversized Blazer</div>
              <div className="mt-1 text-[13px] text-white/60">Available in XS – XL · Premium wool blend</div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-[12.5px] font-medium">
                  <ShoppingBag size={13} /> Add to Cart
                </button>
                <button
                  onClick={() => setPreviewOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 py-2 text-[12.5px] font-medium shadow-[0_0_18px_rgba(168,85,247,0.5)]"
                >
                  <Sparkles size={13} /> Try On With TryVerse
                </button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Regenerate confirm */}
      {confirmOpen && (
        <Modal onClose={() => setConfirmOpen(false)} title="Regenerate API key?">
          <p className="text-[13.5px] text-white/70">This may break your existing widget until you update your website.</p>
          <div className="mt-6 flex justify-end gap-2">
            <button onClick={() => setConfirmOpen(false)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[12.5px] text-white/80 hover:bg-white/10">Cancel</button>
            <button
              onClick={() => { setConfirmOpen(false); toast.success("New API key generated"); }}
              className="rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-2 text-[12.5px] text-white font-medium shadow-[0_0_14px_rgba(168,85,247,0.5)]"
            >
              Regenerate Key
            </button>
          </div>
        </Modal>
      )}

      {/* Try-on preview modal */}
      {previewOpen && (
        <Modal onClose={() => setPreviewOpen(false)} title="Try On Preview">
          <div className="grid grid-cols-3 gap-3">
            <PreviewTile label="Product" img={blazer} />
            <PreviewTile label="Your Photo" img={user} icon={Upload} />
            <PreviewTile label="Result" img={result} />
          </div>
          <div className="mt-5 text-[12.5px] text-white/60 text-center">This is what your shoppers will see on your store.</div>
        </Modal>
      )}
    </BrandShell>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_30px_rgba(168,85,247,0.06)]">{children}</div>;
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-[11.5px] uppercase tracking-widest text-white/50">{label}</div>
      <div className="mt-1 font-display text-xl text-white">{value}</div>
    </div>
  );
}
function CredentialRow({ label, value, onCopy }: { label: string; value: string; onCopy: (v: string, l: string) => void }) {
  return (
    <div>
      <div className="text-[11.5px] text-white/55 mb-1.5">{label}</div>
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0b0518] px-3 py-2">
        <code className="flex-1 truncate text-[12.5px] font-mono text-purple-100/90">{value}</code>
        <button onClick={() => onCopy(value, label)} className="grid h-7 w-7 place-items-center rounded-md hover:bg-white/5 text-white/70 hover:text-white" aria-label={`Copy ${label}`}>
          <Copy size={13} />
        </button>
      </div>
    </div>
  );
}
function PreviewTile({ label, img, icon: Icon }: { label: string; img: string; icon?: React.ElementType }) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-white/10 aspect-[3/4]">
      <img src={img} alt={label} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070210] via-transparent to-transparent" />
      {Icon && <span className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full bg-black/60 border border-white/20 text-white"><Icon size={12} /></span>}
      <div className="absolute inset-x-0 bottom-0 p-2 text-[11px] text-white/90">{label}</div>
    </div>
  );
}
function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0620] p-6 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
        <div className="flex items-start justify-between gap-4">
          <div className="font-display text-lg text-white">{title}</div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70"><X size={14} /></button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
