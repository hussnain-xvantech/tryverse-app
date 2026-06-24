import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import authVisualAsset from "@/assets/auth-visual.jpg.asset.json";

const authVisual = authVisualAsset.url;


const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/for-shoppers", label: "For Shoppers" },
  { to: "/for-brands", label: "For Brands" },
  { to: "/pricing", label: "Pricing" },
  { to: "/discover", label: "Discover" },
  { to: "/resources", label: "Resources" },
] as const;

function AuthNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const isLogin = pathname === "/login";
  const isSignup = pathname === "/signup";

  return (
    <header className="px-6 sm:px-10 py-5 sm:py-6">
      <div className="mx-auto max-w-[1320px] flex items-center justify-between gap-4">
        <Link to="/" aria-label="TryVerse home" className="inline-flex shrink-0">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-[14px]">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-white/70 hover:text-white transition"
              activeProps={{ className: "text-white" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className={`text-[14px] px-3 py-2 rounded-lg transition ${
              isLogin
                ? "text-white bg-white/[0.08] ring-1 ring-white/15"
                : "text-white/75 hover:text-white"
            }`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`btn-primary !text-[14px] !py-2 !px-4 ${
              isSignup ? "ring-2 ring-purple-400/60 shadow-[0_0_24px_rgba(168,85,247,0.45)]" : ""
            }`}
          >
            Try Free
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-white/10 bg-white/[0.04] text-white"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden mt-4 mx-auto max-w-[1320px] surface-card p-4 rounded-2xl">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-lg text-[14px] text-white/80 hover:text-white hover:bg-white/[0.05]"
                activeProps={{ className: "text-white bg-white/[0.06]" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-[14px] ${
                isLogin ? "text-white bg-white/[0.08]" : "text-white/80 hover:text-white"
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className={`btn-primary justify-center !text-[14px] mt-1 ${
                isSignup ? "ring-2 ring-purple-400/60" : ""
              }`}
            >
              Try Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  trust?: ReactNode;
}) {
  return (
    <div className="min-h-screen relative text-white overflow-x-hidden flex flex-col">
      <AuthNav />
      <main className="flex-1 px-6 sm:px-10 pb-10">
        <div className="mx-auto w-full max-w-[1320px] grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center">
          {/* LEFT — form */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 opacity-80"
              style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
            />
            <div className="mx-auto w-full max-w-[460px] animate-fade-up">
              <h1 className="font-display text-[34px] sm:text-[42px] leading-[1.05]">
                {title}
              </h1>
              <p className="mt-3 text-[14px] sm:text-[15px] text-white/65 leading-relaxed">
                {subtitle}
              </p>
              <div className="mt-7">{children}</div>
              <div className="mt-6 text-[13.5px] text-white/65">{footer}</div>
            </div>
          </div>

          {/* RIGHT — visual */}
          <div className="hidden lg:block relative animate-fade-up [animation-delay:120ms]">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70"
              style={{ background: "var(--gradient-glow)", filter: "blur(50px)" }}
            />
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] shadow-[0_40px_120px_-40px_rgba(168,85,247,0.55)] aspect-[3/4] max-h-[78vh] mx-auto w-full"
              style={{ background: "linear-gradient(160deg, #1a1530 0%, #120e22 60%, #0c0a14 100%)" }}
            >
              <img
                src={authVisual}
                alt="TryVerse fashion try-on result — cream tailored blazer outfit"
                width={896}
                height={1216}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 m-auto max-h-full max-w-full w-auto h-auto object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur px-3 py-1.5 text-[11.5px] text-white/90 border border-white/10">
                <Sparkles size={12} className="text-violet" /> Generated with TryVerse
              </div>
            </div>
          </div>

          {/* MOBILE compact visual below form */}
          <div className="lg:hidden order-last">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08]">
              <img
                src={authVisual}
                alt="TryVerse virtual try-on result"
                width={896}
                height={1216}
                loading="lazy"
                decoding="async"
                className="block w-full h-48 object-cover"
              />
              <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur px-2.5 py-1 text-[11px] text-white/90 border border-white/10">
                <Sparkles size={11} className="text-violet" /> Generated with TryVerse
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


export function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  rightSlot,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rightSlot?: ReactNode;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[13px] font-medium text-white/80 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl bg-white/[0.04] border px-4 py-3 text-[14px] text-white placeholder-white/35 transition focus:outline-none focus:bg-white/[0.06] ${
            error
              ? "border-red-400/60 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.15)]"
              : "border-white/10 focus:border-[color:var(--color-accent,#a855f7)] focus:shadow-[0_0_0_4px_rgba(168,85,247,0.18)]"
          } ${rightSlot ? "pr-12" : ""}`}
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-3 flex items-center">{rightSlot}</div>
        )}
      </div>
      {error && <p className="mt-2 text-[12px] text-red-300">{error}</p>}
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        className="rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition px-4 py-3 text-[14px] font-medium inline-flex items-center justify-center gap-2"
      >
        <GoogleIcon /> Continue with Google
      </button>
      <button
        type="button"
        className="rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition px-4 py-3 text-[14px] font-medium inline-flex items-center justify-center gap-2"
      >
        <AppleIcon /> Continue with Apple
      </button>
    </div>
  );
}

export function Divider({ label = "or" }: { label?: string }) {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-[12px] uppercase tracking-[0.18em] text-white/45">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.4-.1-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.3 0 10.1-2 13.7-5.3l-6.3-5.2C29.3 35 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.2 5.8l6.3 5.2C41.9 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.49 2.27-1.27 3.06-.83.86-2.19 1.52-3.32 1.43-.14-1.12.46-2.3 1.21-3.06.85-.86 2.27-1.49 3.38-1.43zM20.5 17.5c-.55 1.27-.82 1.83-1.53 2.95-1 1.55-2.41 3.48-4.16 3.49-1.55.02-1.95-.99-4.05-.97-2.1.01-2.54 1-4.09.98-1.75-.01-3.08-1.78-4.08-3.33C-.06 17.36-.34 12.74 1.4 10.16c1.23-1.81 3.17-2.86 4.99-2.86 1.85 0 3.01 1 4.55 1 1.49 0 2.4-1 4.54-1 1.61 0 3.31.87 4.52 2.38-3.97 2.17-3.32 7.84.5 7.82z" />
    </svg>
  );
}
