import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, User, CreditCard, Settings, LogOut, MessageCircle, Sparkles } from "lucide-react";
import logoAsset from "@/assets/tryverse-logo.png.asset.json";

export const SHOPPER_USER = {
  name: "Attaullah Khan",
  email: "shopper@tryverse.app",
  plan: "Pro",
  credits: 182,
  monthly: 200,
};

const NAV = [
  { to: "/dashboard/shoppers", label: "Home", exact: true },
  { to: "/dashboard/shoppers/fashion-store", label: "Store", exact: false },
  { to: "/dashboard/shoppers/try-on", label: "Try-On", exact: false },
  { to: "/dashboard/shoppers/ai-stylist", label: "AI Stylist", exact: false },
  { to: "/dashboard/shoppers/pose-studio", label: "Pose Studio", exact: false },
  { to: "/dashboard/shoppers/video-studio", label: "Video Studio", exact: false },
] as const;

function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    function on(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", on);
    return () => document.removeEventListener("mousedown", on);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-white pl-1 pr-3 py-1 border border-slate-200 hover:border-purple-300 hover:shadow-sm transition"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-[12px] font-semibold">
          AK
        </span>
        <span className="hidden sm:inline text-[13.5px] font-medium text-slate-800">{SHOPPER_USER.name}</span>
        <ChevronDown size={14} className="text-slate-500" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden z-50"
        >
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="text-[13.5px] font-medium text-slate-800">{SHOPPER_USER.name}</div>
            <div className="text-[12px] text-slate-500">{SHOPPER_USER.email}</div>
          </div>
          <MenuItem icon={User} label="Profile" />
          <MenuItem icon={CreditCard} label="Credits" />
          <MenuItem icon={Settings} label="Settings" />
          <button
            onClick={() => {
              setOpen(false);
              navigate({ to: "/login/shoppers" });
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-rose-600 hover:bg-rose-50 transition"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-slate-700 hover:bg-slate-50 transition">
      <Icon size={15} className="text-slate-500" /> {label}
    </button>
  );
}

function ShopperHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-slate-200/70">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/dashboard/shoppers" className="flex items-center gap-2" aria-label="TryVerse home">
          <img src={logoAsset.url} alt="TryVerse" className="h-7 w-auto" draggable={false} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition ${
                  active
                    ? "bg-purple-50 text-purple-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-100 px-3 py-1.5 text-[12px] font-medium text-purple-700">
            <Sparkles size={12} /> {SHOPPER_USER.plan} · {SHOPPER_USER.credits} credits
          </div>
          <UserMenu />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-700"
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 py-3 grid gap-1">
            {NAV.map((n) => {
              const active = n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/");
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-[14px] ${
                    active ? "bg-purple-50 text-purple-700 font-medium" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-purple-50 border border-purple-100 px-3 py-1.5 text-[12px] font-medium text-purple-700 w-fit">
              <Sparkles size={12} /> {SHOPPER_USER.plan} · {SHOPPER_USER.credits} credits
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ShopperFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-slate-500">
        <div>© 2026 TryVerse. All rights reserved.</div>
        <div className="flex items-center gap-5">
          <a href="mailto:info@tryverse.app" className="hover:text-slate-800">info@tryverse.app</a>
          <Link to="/privacy" className="hover:text-slate-800">Privacy</Link>
          <Link to="/terms" className="hover:text-slate-800">Terms</Link>
        </div>
      </div>
    </footer>
  );
}

function FloatingHelp() {
  return (
    <>
      <a
        href="https://wa.me/0"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat support"
        className="fixed bottom-5 left-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white shadow-lg hover:scale-105 transition"
      >
        <MessageCircle size={20} />
      </a>
      <Link
        to="/dashboard/shoppers/ai-stylist"
        aria-label="Open AI Stylist"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 h-12 shadow-lg hover:scale-105 transition"
      >
        <Sparkles size={16} /> <span className="text-[13.5px] font-medium">Ask Stylo</span>
      </Link>
    </>
  );
}

export function ShopperShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-slate-900">
      <ShopperHeader />
      <main className="flex-1">{children}</main>
      <ShopperFooter />
      <FloatingHelp />
    </div>
  );
}

export function ShopperPageHeader({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <div>
        {eyebrow && (
          <div className="text-[11.5px] font-semibold tracking-[0.18em] uppercase text-purple-600">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-2 font-display text-3xl sm:text-4xl text-slate-900 leading-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-[15px] text-slate-600 max-w-2xl">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
