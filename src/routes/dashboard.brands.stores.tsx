import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Search, Plus, X, Trash2 } from "lucide-react";
import { BrandShell, BrandPageHeader } from "@/components/site/BrandShell";

export const Route = createFileRoute("/dashboard/brands/stores")({
  head: () => ({ meta: [{ title: "Stores — TryVerse Brand" }] }),
  component: StoresLayout,
});

function StoresLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/dashboard/brands/stores") return <Outlet />;
  return <StoresIndex />;
}

const STORES = [
  "Frank And Oak:30", "Reitmans:27", "Knix:11", "Forever 21:26", "Windsor:15",
  "Giordano:107", "Alo Yoga:24", "Outdoor Voices:26", "Beyond Yoga:28", "YoungLA:27",
  "Born Primitive:18", "Fashion Nova:19", "Good American:30", "Meshki:28", "Petal & Pup:25",
  "Naked Wardrobe:28", "VICI Collection:30", "12th Tribe:19", "Club Monaco:29", "STAUD:29",
  "Cuyana:20", "J. Crew:42", "Alkaram Studio:29", "Junaid Jamshed:127", "Beech Tree:123",
  "Princess Polly:71",
].map((s) => {
  const [name, count] = s.split(":");
  return { name, count: Number(count) };
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function StoresIndex() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [modal, setModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = useMemo(
    () => STORES.filter((s) => s.name.toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <BrandShell title="Stores">
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10">
        <BrandPageHeader
          eyebrow="Integrations"
          title="Your Stores"
          subtitle="Select a store to manage or create a new one."
          right={
            <button
              onClick={() => setModal(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13px] font-medium shadow-[0_0_22px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition"
            >
              <Plus size={14} /> Create New Store
            </button>
          }
        />

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search stores…"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400/50"
            />
          </div>
          <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-1">
            {(["All", "Active", "Inactive"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 text-[12.5px] rounded-md transition ${
                  filter === f ? "bg-purple-500/25 text-white border border-purple-400/40" : "text-white/60 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <StoreCard key={s.name} name={s.name} count={s.count} onDelete={() => setConfirmDelete(s.name)} />
          ))}
          <button
            onClick={() => setModal(true)}
            className="rounded-2xl border-2 border-dashed border-white/15 hover:border-purple-400/50 bg-white/[0.02] hover:bg-white/[0.04] p-6 min-h-[220px] flex flex-col items-center justify-center text-center transition"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-purple-600/40 to-fuchsia-500/30 border border-white/10">
              <Plus size={18} className="text-white" />
            </span>
            <div className="mt-3 text-[13.5px] font-medium text-white">Create New Store</div>
            <div className="mt-1 text-[12px] text-white/50">Connect Shopify, WooCommerce, and more</div>
          </button>
        </div>
      </section>

      {modal && <CreateStoreModal onClose={() => setModal(false)} />}
      {confirmDelete && (
        <Modal title="Delete store?" onClose={() => setConfirmDelete(null)}>
          <p className="text-[13.5px] text-white/70">This will remove <span className="text-white">{confirmDelete}</span> from your dashboard. This action cannot be undone.</p>
          <div className="mt-6 flex justify-end gap-2">
            <button onClick={() => setConfirmDelete(null)} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[12.5px] text-white/80 hover:bg-white/10">Cancel</button>
            <button
              onClick={() => { toast.success(`${confirmDelete} deleted`); setConfirmDelete(null); }}
              className="rounded-lg bg-rose-500 hover:bg-rose-600 px-4 py-2 text-[12.5px] text-white font-medium"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </BrandShell>
  );
}

function StoreCard({ name, count, onDelete }: { name: string; count: number; onDelete: () => void }) {
  const slug = slugify(name);
  const to = `/dashboard/brands/stores/${slug}`;
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] hover:border-purple-400/40 hover:shadow-[0_0_28px_rgba(168,85,247,0.2)] p-5 transition">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-purple-600/40 to-fuchsia-500/30 border border-white/10 text-white text-[13px] font-semibold">
            {name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </span>
          <div className="min-w-0">
            <div className="font-display text-[15px] text-white truncate">{name}</div>
            <div className="text-[11.5px] text-white/50">{count} / 500 products</div>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="grid h-8 w-8 place-items-center rounded-lg text-white/40 hover:text-rose-300 hover:bg-rose-500/10 transition"
          aria-label="Delete store"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="emerald">Active</Badge>
        <Badge tone="purple">Widget Enabled</Badge>
      </div>
      <div className="mt-2 text-[11.5px] text-white/45">Last synced 2h ago</div>
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        <MiniAction to={to}>Manage</MiniAction>
        <MiniAction to="/dashboard/brands/widget">Widget</MiniAction>
        <MiniAction to="/dashboard/brands/analytics">Analytics</MiniAction>
      </div>
    </div>
  );
}

function Badge({ tone, children }: { tone: "emerald" | "purple"; children: React.ReactNode }) {
  const cls = tone === "emerald"
    ? "bg-emerald-500/15 border-emerald-400/35 text-emerald-200"
    : "bg-purple-500/15 border-purple-400/35 text-purple-200";
  return <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold tracking-wider ${cls}`}>{children}</span>;
}

function MiniAction({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-purple-400/40 px-2 py-1.5 text-center text-[11.5px] text-white/80 hover:text-white transition"
    >
      {children}
    </Link>
  );
}

function CreateStoreModal({ onClose }: { onClose: () => void }) {
  const [platform, setPlatform] = useState("Shopify");
  return (
    <Modal title="Create New Store" onClose={onClose}>
      <form
        onSubmit={(e) => { e.preventDefault(); toast.success("Store created successfully."); onClose(); }}
        className="space-y-4"
      >
        <Field label="Store Name"><input required className="input" placeholder="Maison Studio Main" /></Field>
        <Field label="Store URL"><input required type="url" className="input" placeholder="https://your-store.com" /></Field>
        <Field label="Platform">
          <div className="flex flex-wrap gap-2">
            {["Shopify", "WooCommerce", "Magento", "BigCommerce", "Custom"].map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPlatform(p)}
                className={`rounded-lg px-3 py-1.5 text-[12px] border transition ${
                  platform === p
                    ? "bg-purple-500/20 border-purple-400/50 text-white"
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-purple-400/30"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Product Limit"><input type="number" defaultValue={500} className="input" /></Field>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[12.5px] text-white/80 hover:bg-white/10">Cancel</button>
          <button type="submit" className="rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-500 px-4 py-2 text-[12.5px] text-white font-medium shadow-[0_0_14px_rgba(168,85,247,0.5)]">Create Store</button>
        </div>
      </form>
      <style>{`.input{width:100%;border-radius:.5rem;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);padding:.5rem .75rem;font-size:13px;color:#fff}.input:focus{outline:none;border-color:rgba(168,85,247,.5)}`}</style>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11.5px] text-white/60 mb-1.5">{label}</div>
      {children}
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
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

