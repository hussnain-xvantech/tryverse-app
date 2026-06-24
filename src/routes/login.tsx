import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

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
      title="Log in"
      subtitle="Welcome back. Continue creating with TryVerse."
      footer={
        <div className="space-y-2">
          <p>
            No account?{" "}
            <Link to="/signup" className="text-white font-medium hover:underline">
              Create one.
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-white font-medium hover:underline">
              Reset it.
            </Link>
          </p>
        </div>
      }
    >
      <SocialButtons />
      <Divider />
      <form onSubmit={submit} className="space-y-4" noValidate>
        <AuthInput
          id="email"
          label="Email"
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
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center !py-3 mt-2 disabled:opacity-60"
        >
          {loading ? "Signing in…" : (
            <>
              Continue with email <ArrowRight size={16} />
            </>
          )}
        </button>
        <p className="text-[12px] text-white/50 text-center leading-relaxed">
          By continuing you agree to our{" "}
          <Link to="/privacy" className="text-white/70 hover:text-white underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/terms" className="text-white/70 hover:text-white underline underline-offset-2">
            Terms of Service
          </Link>
          .
        </p>
      </form>
    </AuthShell>
  );
}
