import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  ChevronDown, Menu, X, User, CreditCard, LogOut, Sparkles, Bell,
  LayoutDashboard, Camera, Shirt, Layers, Video, Wand2, LayoutGrid,
  FolderKanban, BarChart3, Settings, LifeBuoy, ArrowLeft, Store,
} from "lucide-react";
import logoAsset from "@/assets/tryverse-logo.png.asset.json";

export const BRAND_USER = {
  name: "Hussnain",
  initials: "HK",
  brand: "Maison Studio",
  email: "brand@tryverse.app",
  plan: "Suite",
  credits: "Unlimited",
};

export const BRAND_NAV = [
  { to: "/dashboard/brands", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/brands/photoshoot", label: "AI Photoshoot", icon: Camera },
  { to: "/dashboard/brands/ghost-mannequin", label: "Ghost Mannequin", icon: Shirt },
  { to: "/dashboard/brands/fabric-studio", label: "Fabric Studio", icon: Layers },
  { to: "/dashboard/brands/video-studio", label: "Video Studio", icon: Video },
  { to: "/dashboard/brands/pose-studio", label: "Pose Studio", icon: Wand2 },
  { to: "/dashboard/brands/widget", label: "Widget", icon: LayoutGrid },
  { to: "/dashboard/brands/stores", label: "Stores", icon: Store },
  { to: "/dashboard/brands/catalog", label: "Catalog", icon: FolderKanban },
  { to: "/dashboard/brands/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/brands/settings", label: "Settings", icon: Settings },
] as const;

function isActive(pathname: string, to: string, exact?: boolean) {
  return exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="h-full flex flex-col bg-[#0a0418]/95 backdrop-blur-xl border-r border-white/5">
      <div className="px-5 h-16 flex items-center border-b border-white/5">
        <Link to="/dashboard/brands" className="flex items-center" aria-label="TryVerse home">
          <img src={logoAsset.url} alt="TryVerse" className="h-7 w-auto" draggable={false} />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {BRAND_NAV.map((n) => {
          const Icon = n.icon;
          const active = isActive(pathname, n.to, "exact" in n && n.exact);
          return (
            <Link
              key={n.to}
              to={n.to}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] transition ${
                active
                  ? "bg-gradient-to-r from-purple-600/25 to-fuchsia-500/15 text-white border border-purple-400/30 shadow-[0_0_18px_rgba(168,85,247,0.15)]"
                  : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon size={16} className={active ? "text-purple-300" : "text-white/50"} />
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/5 p-3 space-y-1">
        <Link
          to="/contact"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition"
        >
          <LifeBuoy size={15} /> Help & Support
        </Link>
        <Link
          to="/login/brands"
          onClick={onNavigate}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-rose-400 hover:bg-rose-500/10 transition"
        >
          <LogOut size={15} /> Sign Out
        </Link>
      </div>
    </aside>
  );
}

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
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white text-[12px] font-semibold shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          {BRAND_USER.initials}
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="text-[13px] font-medium text-white">{BRAND_USER.name}</span>
          <span className="text-[11px] text-white/50">{BRAND_USER.brand}</span>
        </span>
        <ChevronDown size={14} className="text-white/60" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#1a1130]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/10">
            <div className="text-[13.5px] font-medium text-white">{BRAND_USER.name}</div>
            <div className="text-[12px] text-white/50">{BRAND_USER.email}</div>
            <div className="text-[11.5px] text-purple-300 mt-1">{BRAND_USER.brand}</div>
          </div>
          <Link to="/dashboard/brands/settings" onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-white/80 hover:bg-white/5 hover:text-white transition">
            <User size={15} className="text-white/50" /> Profile
          </Link>
          <Link to="/dashboard/brands/billing" onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-white/80 hover:bg-white/5 hover:text-white transition">
            <CreditCard size={15} className="text-white/50" /> Credits / Plan
          </Link>
          <button
            onClick={() => { setOpen(false); navigate({ to: "/login/brands" }); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}

function Topbar({ onMenu, title }: { onMenu: () => void; title?: string }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#070210]/80 backdrop-blur-xl border-b border-white/5 flex items-center gap-3 px-4 sm:px-6">
      <button
        onClick={onMenu}
        className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white"
        aria-label="Open menu"
      >
        <Menu size={16} />
      </button>
      <div className="flex-1 min-w-0">
        <div className="truncate text-[14.5px] font-medium text-white">{title ?? "Brand Studio"}</div>
      </div>
      <div className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600/20 to-fuchsia-500/20 border border-purple-400/30 px-3 py-1.5 text-[12px] font-medium text-purple-200">
        <Sparkles size={12} /> {BRAND_USER.plan} · {BRAND_USER.credits}
      </div>
      <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white transition">
        <Bell size={15} />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.9)]" />
      </button>
      <UserMenu />
    </header>
  );
}

export function BrandShell({ children, title }: { children: ReactNode; title?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-[#070210] text-white overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-purple-600/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-500/15 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-indigo-600/15 blur-[140px]" />
      </div>
      <div className="flex min-h-screen">
        <div className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
          <Sidebar />
        </div>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-72">
              <div className="relative h-full">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-white z-10"
                  aria-label="Close menu"
                >
                  <X size={15} />
                </button>
                <Sidebar onNavigate={() => setMobileOpen(false)} />
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar onMenu={() => setMobileOpen(true)} title={title} />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function BrandPageHeader({
  eyebrow, title, subtitle, right,
}: { eyebrow?: string; title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-[11.5px] font-semibold tracking-[0.22em] uppercase text-purple-300/90">{eyebrow}</div>
        )}
        <h1 className="mt-2 font-display text-3xl sm:text-4xl text-white leading-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-[15px] text-white/60 max-w-2xl">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function BrandPlaceholder({
  title, description,
}: { title: string; description: string }) {
  return (
    <BrandShell title={title}>
      <section className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10 py-14">
        <BrandPageHeader eyebrow="Feature Preview" title={title} subtitle={description} />
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 text-center shadow-[0_0_40px_rgba(168,85,247,0.08)]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-purple-600/40 to-fuchsia-500/30 border border-white/10">
            <Sparkles size={20} className="text-white" />
          </div>
          <h2 className="mt-6 font-display text-2xl text-white">Coming soon</h2>
          <p className="mt-3 text-[14.5px] text-white/60 max-w-md mx-auto">
            This module is being crafted for {BRAND_USER.brand}. Preview it soon in your Brand Studio.
          </p>
          <Link
            to="/dashboard/brands"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white px-5 py-2.5 text-[13.5px] font-medium shadow-[0_0_24px_rgba(168,85,247,0.5)] hover:scale-[1.02] transition"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </section>
    </BrandShell>
  );
}
