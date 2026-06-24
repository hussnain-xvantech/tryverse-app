import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import {
  AuthShell,
  AuthInput,
  SocialButtons,
  Divider,
} from "@/components/site/AuthShell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — TryVerse" },
      {
        name: "description",
        content:
          "Create your free TryVerse account to try clothes before buying or to create AI fashion visuals for your brand.",
      },
    ],
  }),
  component: SignupPage,
});

type Role = "Shopper" | "Brand";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Shopper");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Full name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    if (!password) next.password = "Password is required";
    else if (password.length < 8) next.password = "Use at least 8 characters";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start trying clothes on and creating AI fashion visuals with TryVerse."
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-white font-medium hover:underline">
            Log in.
          </Link>
        </p>
      }
    >
      <SocialButtons />
      <Divider />
      <form onSubmit={submit} className="space-y-4" noValidate>
        <AuthInput
          id="name"
          label="Full name"
          autoComplete="name"
          placeholder="Alex Morgan"
          value={name}
          onChange={setName}
          error={errors.name}
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
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

        <div>
          <div className="block text-[13px] font-medium text-white/80 mb-2">
            Account type
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["Shopper", "Brand"] as Role[]).map((r) => {
              const active = role === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-xl border px-4 py-3 text-[14px] font-medium transition ${
                    active
                      ? "border-[color:var(--color-accent,#a855f7)] bg-white/[0.06] text-white shadow-[0_0_0_3px_rgba(168,85,247,0.18)]"
                      : "border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center !py-3 mt-2 disabled:opacity-60"
        >
          {loading ? "Creating account…" : (
            <>
              Create account <ArrowRight size={16} />
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
