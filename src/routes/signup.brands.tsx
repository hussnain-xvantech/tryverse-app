import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";

import {
  AuthShell,
  AuthInput,
  SocialButtons,
  Divider,
} from "@/components/site/AuthShell";

export const Route = createFileRoute("/signup/brands")({
  head: () => ({
    meta: [
      { title: "Create Brand Account — TryVerse" },
      {
        name: "description",
        content:
          "Create a TryVerse brand account to launch AI photoshoots, ghost mannequin visuals, videos and try-on widgets.",
      },
    ],
  }),
  component: BrandSignupPage,
});

function BrandSignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; brand?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Full name is required";
    if (!email.trim()) next.email = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    if (!brand.trim()) next.brand = "Brand name is required";
    if (!password) next.password = "Password is required";
    else if (password.length < 8) next.password = "Use at least 8 characters";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/dashboard/brands" });
    }, 700);
  }

  return (
    <AuthShell
      title="Create your brand account"
      subtitle="Start creating AI photoshoots, ghost mannequin images, videos, and try-on experiences for your store."
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/login/brands" className="text-white font-medium hover:underline">
            Log in.
          </Link>
        </p>
      }
    >
      <SocialButtons />
      <Divider />
      <form onSubmit={submit} className="space-y-4" noValidate>
        <AuthInput id="name" label="Full name" autoComplete="name" placeholder="Alex Morgan" value={name} onChange={setName} error={errors.name} />
        <AuthInput id="email" label="Work email" type="email" autoComplete="email" placeholder="you@yourbrand.com" value={email} onChange={setEmail} error={errors.email} />
        <AuthInput id="brand" label="Brand name" autoComplete="organization" placeholder="Your brand" value={brand} onChange={setBrand} error={errors.brand} />
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
            <button type="button" onClick={() => setShow((v) => !v)} className="text-white/55 hover:text-white p-1" aria-label={show ? "Hide password" : "Show password"}>
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
        />
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-3 mt-2 disabled:opacity-60">
          {loading ? "Creating account…" : (<>Create Brand Account <ArrowRight size={16} /></>)}
        </button>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[12px] text-white/60">
          {["Brand Studio access", "Store-ready visuals", "Book demo anytime"].map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-violet/20 text-violet"><Check size={10} strokeWidth={3} /></span>
              {t}
            </li>
          ))}
        </ul>
        <p className="text-[12px] text-white/50 text-center leading-relaxed">
          By continuing you agree to our{" "}
          <Link to="/privacy" className="text-white/70 hover:text-white underline underline-offset-2">Privacy Policy</Link>{" "}and{" "}
          <Link to="/terms" className="text-white/70 hover:text-white underline underline-offset-2">Terms of Service</Link>.
        </p>
      </form>
    </AuthShell>
  );
}
