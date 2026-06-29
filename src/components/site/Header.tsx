import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";

type NavItem = { label: string; to: string };

const NAV_LEFT: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "For Shoppers", to: "/for-shoppers" },
  { label: "For Brands", to: "/for-brands" },
];

const NAV_RIGHT: NavItem[] = [
  { label: "Discover", to: "/discover" },
  { label: "Resources", to: "/resources" },
];

const PRICING_ITEMS: { label: string; to: string; sub: string }[] = [
  { label: "For Shoppers", to: "/pricing/shoppers", sub: "Personal try-on plans" },
  { label: "For Brands", to: "/pricing/brands", sub: "Brand studio plans" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [mobilePricingOpen, setMobilePricingOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const pricingWrapRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!pricingWrapRef.current) return;
      if (!pricingWrapRef.current.contains(e.target as Node)) {
        setPricingOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setPricingOpen(false);
    setOpen(false);
    setMobilePricingOpen(false);
  }, [pathname]);

  const isActive = (item: NavItem) => {
    if (item.to === "/") return pathname === "/";
    return pathname === item.to || pathname.startsWith(item.to + "/");
  };
  const isPricingActive = pathname === "/pricing" || pathname.startsWith("/pricing/");

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
      active
        ? "text-white bg-white/[0.06] border border-white/10"
        : "text-white/70 hover:text-white hover:bg-white/[0.04]"
    }`;

  const openPricing = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setPricingOpen(true);
  };
  const scheduleClosePricing = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPricingOpen(false), 140);
  };

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

          <nav className="hidden lg:flex items-center justify-center gap-1">
            {NAV_LEFT.map((item) => (
              <Link key={item.label} to={item.to} className={linkClass(isActive(item))}>
                {item.label}
              </Link>
            ))}

            {/* Pricing dropdown */}
            <div
              ref={pricingWrapRef}
              className="relative"
              onMouseEnter={openPricing}
              onMouseLeave={scheduleClosePricing}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={pricingOpen}
                onClick={() => setPricingOpen((v) => !v)}
                className={`${linkClass(isPricingActive)} inline-flex items-center gap-1.5`}
              >
                Pricing
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${pricingOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition-all duration-200 ${
                  pricingOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
                role="menu"
              >
                <div
                  className="w-[300px] rounded-2xl border border-violet/30 bg-background/90 backdrop-blur-xl p-2 shadow-2xl"
                  style={{
                    boxShadow:
                      "0 20px 60px -20px rgba(168,85,247,0.45), 0 0 0 1px rgba(168,85,247,0.18)",
                  }}
                >
                  {PRICING_ITEMS.map((p) => {
                    const active = pathname === p.to;
                    return (
                      <Link
                        key={p.to}
                        to={p.to}
                        role="menuitem"
                        className={`block rounded-xl px-3.5 py-3 transition-colors ${
                          active
                            ? "bg-white/[0.06]"
                            : "hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="text-[14px] font-semibold text-white">{p.label}</div>
                        <div className="mt-0.5 text-[12.5px] text-white/60">{p.sub}</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {NAV_RIGHT.map((item) => (
              <Link key={item.label} to={item.to} className={linkClass(isActive(item))}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 justify-end">
            <Link
              to="/login"
              className="hidden sm:inline-flex text-[14px] font-medium text-white/70 hover:text-white px-4 py-2"
            >
              Login
            </Link>
            <Link to="/signup" className="btn-primary !py-2.5 !px-5 !text-[14px]">
              Try Free
            </Link>
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
          <div className="lg:hidden mb-3 glass rounded-2xl p-3 animate-fade-up">
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

              {/* Mobile pricing accordion */}
              <button
                type="button"
                onClick={() => setMobilePricingOpen((v) => !v)}
                aria-expanded={mobilePricingOpen}
                className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium ${
                  isPricingActive
                    ? "text-white bg-white/5"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>Pricing</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobilePricingOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-200 ease-out"
                style={{ gridTemplateRows: mobilePricingOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="mt-1 ml-3 mb-1 rounded-xl border border-violet/25 bg-white/[0.03] p-1">
                    {PRICING_ITEMS.map((p) => (
                      <Link
                        key={p.to}
                        to={p.to}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 hover:bg-white/5"
                      >
                        <div className="text-[14px] font-medium text-white">{p.label}</div>
                        <div className="text-[12px] text-white/55">{p.sub}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

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

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="sm:hidden rounded-xl px-3 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5"
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
