import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";

type NavItem = { label: string; to: string };
type SubItem = { label: string; to: string; sub: string };

const NAV_LEFT: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "For Shoppers", to: "/for-shoppers" },
  { label: "For Brands", to: "/for-brands" },
];

const NAV_RIGHT: NavItem[] = [
  { label: "Discover", to: "/discover" },
  { label: "Resources", to: "/resources" },
];

const PRICING_ITEMS: SubItem[] = [
  { label: "For Shoppers", to: "/pricing/shoppers", sub: "Personal try-on plans" },
  { label: "For Brands", to: "/pricing/brands", sub: "Brand studio plans" },
];

const LOGIN_ITEMS: SubItem[] = [
  { label: "Shopper Login", to: "/login/shoppers", sub: "Try outfits and manage your personal results" },
  { label: "Brand Login", to: "/login/brands", sub: "Access Brand Studio and manage AI visuals" },
];

const SIGNUP_ITEMS: SubItem[] = [
  { label: "Start as Shopper", to: "/signup/shoppers", sub: "Try clothes before buying" },
  { label: "Start as Brand", to: "/signup/brands", sub: "Create AI photoshoots & store visuals" },
];

type DropdownKey = "pricing" | "login" | "signup";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState<DropdownKey | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-dropdown-root="true"]')) return;
      setOpenDropdown(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setOpen(false);
    setMobileOpen(null);
  }, [pathname]);

  const isActive = (item: NavItem) => {
    if (item.to === "/") return pathname === "/";
    return pathname === item.to || pathname.startsWith(item.to + "/");
  };
  const isPricingActive = pathname === "/pricing" || pathname.startsWith("/pricing/");
  const isLoginActive = pathname === "/login" || pathname.startsWith("/login/");

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
      active
        ? "text-white bg-white/[0.06] border border-white/10"
        : "text-white/70 hover:text-white hover:bg-white/[0.04]"
    }`;

  const openMenu = (k: DropdownKey) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(k);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 140);
  };

  const DropdownPanel = ({
    items,
    align = "center",
  }: {
    items: SubItem[];
    align?: "center" | "right";
  }) => (
    <div
      className={`w-[300px] rounded-2xl border border-violet/30 bg-background/90 backdrop-blur-xl p-2 shadow-2xl ${
        align === "right" ? "" : ""
      }`}
      style={{
        boxShadow:
          "0 20px 60px -20px rgba(168,85,247,0.45), 0 0 0 1px rgba(168,85,247,0.18)",
      }}
    >
      {items.map((p) => {
        const active = pathname === p.to;
        return (
          <Link
            key={p.to}
            to={p.to}
            role="menuitem"
            className={`block rounded-xl px-3.5 py-3 transition-colors ${
              active ? "bg-white/[0.06]" : "hover:bg-white/[0.05]"
            }`}
          >
            <div className="text-[14px] font-semibold text-white">{p.label}</div>
            <div className="mt-0.5 text-[12.5px] text-white/60 leading-snug">{p.sub}</div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-[72px] gap-6">
          <div className="flex items-center">
            <Logo />
          </div>

          <nav ref={navRef} className="hidden lg:flex items-center justify-center gap-1">
            {NAV_LEFT.map((item) => (
              <Link key={item.label} to={item.to} className={linkClass(isActive(item))}>
                {item.label}
              </Link>
            ))}

            {/* Pricing dropdown */}
            <div
              className="relative"
              data-dropdown-root="true"
              onMouseEnter={() => openMenu("pricing")}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openDropdown === "pricing"}
                onClick={() => setOpenDropdown(openDropdown === "pricing" ? null : "pricing")}
                className={`${linkClass(isPricingActive)} inline-flex items-center gap-1.5`}
              >
                Pricing
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openDropdown === "pricing" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                  openDropdown === "pricing"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                role="menu"
              >
                <DropdownPanel items={PRICING_ITEMS} />
              </div>
            </div>

            {NAV_RIGHT.map((item) => (
              <Link key={item.label} to={item.to} className={linkClass(isActive(item))}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-end">
            {/* Login dropdown */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => openMenu("login")}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openDropdown === "login"}
                onClick={() => setOpenDropdown(openDropdown === "login" ? null : "login")}
                className={`inline-flex items-center gap-1.5 text-[14px] font-medium px-4 py-2 rounded-full transition-colors ${
                  isLoginActive ? "text-white bg-white/[0.06]" : "text-white/70 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                Login
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openDropdown === "login" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute right-0 top-full pt-3 transition-all duration-200 ${
                  openDropdown === "login"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                role="menu"
              >
                <DropdownPanel items={LOGIN_ITEMS} align="right" />
              </div>
            </div>

            {/* Try Free dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("signup")}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={openDropdown === "signup"}
                onClick={() => setOpenDropdown(openDropdown === "signup" ? null : "signup")}
                className="btn-primary !py-2.5 !px-5 !text-[14px] inline-flex items-center gap-1.5"
              >
                Try Free
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openDropdown === "signup" ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute right-0 top-full pt-3 transition-all duration-200 z-50 ${
                  openDropdown === "signup"
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                role="menu"
              >
                <DropdownPanel items={SIGNUP_ITEMS} align="right" />
              </div>
            </div>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mb-3 glass rounded-2xl p-3 animate-fade-up max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col">
              {NAV_LEFT.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm font-medium ${
                    isActive(item)
                      ? "text-white bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <MobileGroup
                label="Pricing"
                isOpen={mobileOpen === "pricing"}
                toggle={() => setMobileOpen(mobileOpen === "pricing" ? null : "pricing")}
                items={PRICING_ITEMS}
                active={isPricingActive}
                onItemClick={() => setOpen(false)}
              />

              {NAV_RIGHT.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-3 text-sm font-medium ${
                    isActive(item)
                      ? "text-white bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="h-px bg-white/10 my-2" />

              <MobileGroup
                label="Login"
                isOpen={mobileOpen === "login"}
                toggle={() => setMobileOpen(mobileOpen === "login" ? null : "login")}
                items={LOGIN_ITEMS}
                active={isLoginActive}
                onItemClick={() => setOpen(false)}
              />

              <MobileGroup
                label="Try Free"
                isOpen={mobileOpen === "signup"}
                toggle={() => setMobileOpen(mobileOpen === "signup" ? null : "signup")}
                items={SIGNUP_ITEMS}
                active={pathname.startsWith("/signup")}
                onItemClick={() => setOpen(false)}
                primary
              />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileGroup({
  label,
  isOpen,
  toggle,
  items,
  active,
  onItemClick,
  primary = false,
}: {
  label: string;
  isOpen: boolean;
  toggle: () => void;
  items: SubItem[];
  active: boolean;
  onItemClick: () => void;
  primary?: boolean;
}) {
  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium ${
          primary
            ? "text-white"
            : active
              ? "text-white bg-white/5"
              : "text-white/80 hover:text-white hover:bg-white/5"
        }`}
        style={
          primary
            ? {
                background: "linear-gradient(135deg, rgba(109,40,255,0.65), rgba(217,70,239,0.55))",
                boxShadow: "0 8px 24px -10px rgba(168,85,247,0.7)",
              }
            : undefined
        }
      >
        <span>{label}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-1 ml-3 mb-1 rounded-xl border border-violet/25 bg-white/[0.03] p-1">
            {items.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                onClick={onItemClick}
                className="block rounded-lg px-3 py-2.5 hover:bg-white/5"
              >
                <div className="text-[14px] font-medium text-white">{p.label}</div>
                <div className="text-[12px] text-white/55 leading-snug">{p.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
