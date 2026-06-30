import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, User, CreditCard, Settings, LogOut, MessageCircle, Sparkles } from "lucide-react";
import logoAsset from "@/assets/tryverse-logo.png.asset.json";

export const SHOPPER_USER = {
  name: "Hussnain",
  initials: "HK",
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
        className="flex items-center gap-2 rounded-full bg-white/5 pl-1 pr-3 py-1 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-[12px] font-semibold shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          {SHOPPER_USER.initials}
        </span>
        <span className="hidden sm:inline text-[13.5px] font-medium text-white">{SHOPPER_USER.name}</span>
        <ChevronDown size={14} className="text-white/60" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1a1130]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50"
        >
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-[13.5px] font-medium text-white">{SHOPPER_USER.name}</div>
            <div className="text-[12px] text-white/50">{SHOPPER_USER.email}</div>
          </div>
          <MenuLink to="/dashboard/shoppers/profile" icon={User} label="Profile" onNavigate={() => setOpen(false)} />
          <MenuLink to="/dashboard/shoppers/credits" icon={CreditCard} label="Credits" onNavigate={() => setOpen(false)} />
          <MenuLink to="/dashboard/shoppers/settings" icon={Settings} label="Settings" onNavigate={() => setOpen(false)} />
          <button
            onClick={() => {
              setOpen(false);
              navigate({ to: "/login/shoppers" });
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-rose-400 hover:bg-rose-500/10 transition"
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
    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-white/80 hover:bg-white/5 hover:text-white transition">
      <Icon size={15} className="text-white/50" /> {label}
    </button>
  );
}

function ShopperHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[#0a0418]/80 backdrop-blur-xl border-b border-white/5">
      <div className="mx-auto max-w-[1280px] flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/dashboard/shoppers" className="flex items-center gap-2" aria-label="TryVerse home">
          <img src={logoAsset.url} alt="TryVerse" className="h-7 w-auto" draggable={false} />
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 rounded-full bg-white/[0.04] border border-white/10 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/");
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.45)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600/20 to-fuchsia-500/20 border border-purple-400/30 px-3 py-1.5 text-[12px] font-medium text-purple-200">
            <Sparkles size={12} /> {SHOPPER_USER.plan} · {SHOPPER_USER.credits} credits
          </div>
          <UserMenu />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white"
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0a0418]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[1280px] px-4 py-3 grid gap-1">
            {NAV.map((n) => {
              const active = n.exact ? pathname === n.to : pathname === n.to || pathname.startsWith(n.to + "/");
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-[14px] ${
                    active ? "bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-medium" : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-purple-500/15 border border-purple-400/30 px-3 py-1.5 text-[12px] font-medium text-purple-200 w-fit">
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
    <footer className="border-t border-white/5 bg-[#0a0418]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-white/50">
        <div>© 2026 TryVerse. All rights reserved.</div>
        <div className="flex items-center gap-5">
          <a href="mailto:info@tryverse.app" className="hover:text-white transition">info@tryverse.app</a>
          <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition">Terms</Link>
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
        className="fixed bottom-5 left-5 z-30 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_0_24px_rgba(16,185,129,0.4)] hover:scale-105 transition"
      >
        <MessageCircle size={20} />
      </a>
      <Link
        to="/dashboard/shoppers/ai-stylist"
        aria-label="Open AI Stylist"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-4 h-12 shadow-[0_0_28px_rgba(168,85,247,0.5)] hover:scale-105 transition"
      >
        <Sparkles size={16} /> <span className="text-[13.5px] font-medium">Ask Stylo</span>
      </Link>
    </>
  );
}

export function ShopperShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#070210] text-white overflow-x-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/15 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-indigo-600/15 blur-[140px]" />
      </div>
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
          <div className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">
            {eyebrow}
          </div>
        )}
        <h1 className="mt-2 font-display text-3xl sm:text-4xl text-white leading-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-[15px] text-white/60 max-w-2xl">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
