import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { ShopperPageHeader, SHOPPER_USER } from "@/components/site/ShopperShell";

export const Route = createFileRoute("/dashboard/shoppers/settings")({
  head: () => ({ meta: [{ title: "Settings — TryVerse" }, { name: "robots", content: "noindex" }] }),
  component: SettingsPage,
});

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 sm:p-7 shadow-[0_0_40px_-20px_rgba(168,85,247,0.4)] ${className}`}>
      {children}
    </div>
  );
}

function Field({ label, type = "text", value, onChange, rightIcon }: { label: string; type?: string; value: string; onChange: (v: string) => void; rightIcon?: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium text-white/60">{label}</span>
      <div className="mt-1.5 relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl bg-black/30 border border-white/10 px-3.5 py-2.5 pr-10 text-[14px] text-white focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition"
        />
        {rightIcon && <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightIcon}</div>}
      </div>
    </label>
  );
}

function Toggle({ label, checked, onChange, description }: { label: string; checked: boolean; onChange: (v: boolean) => void; description?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <div>
        <div className="text-[13.5px] text-white">{label}</div>
        {description && <div className="text-[12px] text-white/45 mt-0.5">{description}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
          checked ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-[0_0_14px_rgba(168,85,247,0.5)]" : "bg-white/10"
        }`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function PwField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  return (
    <Field
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      rightIcon={
        <button type="button" onClick={() => setShow((s) => !s)} className="grid h-7 w-7 place-items-center rounded-md text-white/50 hover:text-white">
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      }
    />
  );
}

function SettingsPage() {
  const navigate = useNavigate();
  const [name, setName] = useState(SHOPPER_USER.name);
  const [cur, setCur] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [notif, setNotif] = useState({ product: true, credits: true, recs: true, stores: false, promo: false });
  const [priv, setPriv] = useState({ photos: true, results: true, training: true, hideShowcase: false });
  const [appearance, setAppearance] = useState({ dark: true, reducedMotion: false, compact: false });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onChangePw = () => {
    if (pw.length < 6) return toast.error("New password must be at least 6 characters.");
    if (pw !== pw2) return toast.error("Passwords must match.");
    setCur(""); setPw(""); setPw2("");
    toast.success("Password updated successfully.");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <Link to="/dashboard/shoppers" className="inline-flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>
      <div className="mt-5">
        <ShopperPageHeader eyebrow="Account" title="Settings" subtitle="Control your account, security, and preferences." />
      </div>

      <div className="mt-8 grid gap-6">
        <Card>
          <h2 className="font-display text-xl text-white">Profile Settings</h2>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Field label="Display Name" value={name} onChange={setName} />
            <Field label="Email" value={SHOPPER_USER.email} onChange={() => {}} />
          </div>
          <button
            onClick={() => toast.success("Settings saved.")}
            className="mt-5 inline-flex h-10 items-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 text-[13.5px] font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:opacity-95 transition"
          >
            Save Settings
          </button>
        </Card>

        <Card>
          <h2 className="font-display text-xl text-white">Change Password</h2>
          <div className="mt-5 grid gap-4">
            <PwField label="Current Password" value={cur} onChange={setCur} />
            <div className="grid sm:grid-cols-2 gap-4">
              <PwField label="New Password" value={pw} onChange={setPw} />
              <PwField label="Confirm New Password" value={pw2} onChange={setPw2} />
            </div>
          </div>
          <button
            onClick={onChangePw}
            className="mt-5 inline-flex h-10 items-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-5 text-[13.5px] font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.45)] hover:opacity-95 transition"
          >
            Change Password
          </button>
        </Card>

        <Card>
          <h2 className="font-display text-xl text-white">Notifications</h2>
          <div className="mt-3 divide-y divide-white/5">
            <Toggle label="Product updates" checked={notif.product} onChange={(v) => setNotif({ ...notif, product: v })} />
            <Toggle label="Credit usage alerts" checked={notif.credits} onChange={(v) => setNotif({ ...notif, credits: v })} />
            <Toggle label="Style recommendations" checked={notif.recs} onChange={(v) => setNotif({ ...notif, recs: v })} />
            <Toggle label="New store alerts" checked={notif.stores} onChange={(v) => setNotif({ ...notif, stores: v })} />
            <Toggle label="Promotional emails" checked={notif.promo} onChange={(v) => setNotif({ ...notif, promo: v })} />
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-xl text-white">Privacy</h2>
          <div className="mt-3 divide-y divide-white/5">
            <Toggle label="Auto-delete uploaded photos after session" checked={priv.photos} onChange={(v) => setPriv({ ...priv, photos: v })} />
            <Toggle label="Auto-delete generated results after session" checked={priv.results} onChange={(v) => setPriv({ ...priv, results: v })} />
            <Toggle label="Do not use my uploads for product improvement" checked={priv.training} onChange={(v) => setPriv({ ...priv, training: v })} />
            <Toggle label="Hide profile from public showcase" checked={priv.hideShowcase} onChange={(v) => setPriv({ ...priv, hideShowcase: v })} />
          </div>
          <p className="mt-4 text-[12.5px] text-white/50">TryVerse does not sell your photos or generated images.</p>
        </Card>

        <Card>
          <h2 className="font-display text-xl text-white">Appearance</h2>
          <div className="mt-3 divide-y divide-white/5">
            <Toggle label="Dark mode" checked={appearance.dark} onChange={(v) => setAppearance({ ...appearance, dark: v })} />
            <Toggle label="Reduced motion" checked={appearance.reducedMotion} onChange={(v) => setAppearance({ ...appearance, reducedMotion: v })} />
            <Toggle label="Compact dashboard cards" checked={appearance.compact} onChange={(v) => setAppearance({ ...appearance, compact: v })} />
          </div>
        </Card>

        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 backdrop-blur-xl p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-rose-500/15 text-rose-300">
              <ShieldAlert size={18} />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl text-white">Danger Zone</h2>
              <p className="mt-1 text-[13.5px] text-white/60">Once you delete your account, this action cannot be undone.</p>
              <button
                onClick={() => setConfirmOpen(true)}
                className="mt-4 inline-flex h-10 items-center rounded-full bg-rose-600/90 hover:bg-rose-600 px-5 text-[13.5px] font-medium text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setConfirmOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#150a28] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl text-white">Delete your account?</h3>
            <p className="mt-2 text-[13.5px] text-white/65">This is a demo action and will not actually delete your account. You will be returned to the login page.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirmOpen(false)} className="h-9 px-4 rounded-full bg-white/5 border border-white/10 text-[13px] text-white hover:bg-white/10">Cancel</button>
              <button
                onClick={() => { setConfirmOpen(false); toast("Demo only — account not deleted."); navigate({ to: "/login/shoppers" }); }}
                className="h-9 px-4 rounded-full bg-rose-600 text-[13px] text-white hover:bg-rose-500"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
