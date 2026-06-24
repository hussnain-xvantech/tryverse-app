import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";

type NavItem = { label: string; to: string };

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "For Shoppers", to: "/for-shoppers" },
  { label: "For Brands", to: "/for-brands" },
  { label: "Pricing", to: "/pricing" },
  { label: "Discover", to: "/discover" },
  { label: "Resources", to: "/resources" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.to === "/") return pathname === "/";
    return pathname === item.to || pathname.startsWith(item.to + "/");
  };

  const linkClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
      active
        ? "text-white bg-white/[0.06] border border-white/10"
        : "text-white/70 hover:text-white hover:bg-white/[0.04]"
    }`;

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
            {NAV.map((item) => (
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
              {NAV.map((item) => (
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
