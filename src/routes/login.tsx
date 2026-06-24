import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import {
  AuthShell,
  AuthInput,
  SocialButtons,
  Divider,
} from "@/components/site/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In — TryVerse" },
      {
        name: "description",
        content:
          "Log in to TryVerse to keep creating virtual try-ons, AI photoshoots, and styled outfits.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }

  return (
    <AuthShell
      eyebrow="Welcome Back"
      title="Welcome back"
      subtitle="Log in to continue creating with TryVerse."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="text-white font-medium hover:underline">
            Sign up
          </Link>
        </>
      }
      trust={
        <>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={12} /> Secure login
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles size={12} /> Clothing-only AI
          </span>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <AuthInput
          id="password"
          label="Password"
          type={show ? "text" : "password"}
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          error={errors.password}
          rightSlot={
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="text-white/55 hover:text-white p-1"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />

        <div className="flex items-center justify-between text-[13px]">
          <label className="inline-flex items-center gap-2 text-white/70 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/[0.05] accent-purple-500"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-white/70 hover:text-white">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center !py-3 mt-2 disabled:opacity-60"
        >
          {loading ? "Signing in…" : (
            <>
              Log In <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <Divider />
      <SocialButtons />
    </AuthShell>
  );
}
