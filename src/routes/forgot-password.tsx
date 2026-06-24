import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, MailCheck } from "lucide-react";

import { AuthShell, AuthInput } from "@/components/site/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — TryVerse" },
      {
        name: "description",
        content: "Reset your TryVerse password and get back to creating.",
      },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError(undefined);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 900);
  }

  return (
    <AuthShell
      title="Reset password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="inline-flex items-center gap-2 text-white/75 hover:text-white">
          <ArrowLeft size={14} /> Back to login
        </Link>
      }
    >

      {sent ? (
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-white/[0.06] border border-white/10 grid place-items-center">
            <MailCheck size={20} className="text-white" />
          </div>
          <h3 className="mt-5 font-display text-[22px]">Check your inbox</h3>
          <p className="mt-3 text-[14px] text-white/65">
            If an account exists for <span className="text-white">{email}</span>, a reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <AuthInput
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(v) => {
              setEmail(v);
              if (error) setError(undefined);
            }}
            error={error}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center !py-3 mt-2 disabled:opacity-60"
          >
            {loading ? "Sending…" : (
              <>
                Send reset link <ArrowRight size={16} />
              </>
            )}
          </button>

        </form>
      )}
    </AuthShell>
  );
}
