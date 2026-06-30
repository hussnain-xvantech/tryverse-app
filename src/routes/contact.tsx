import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, ShoppingBag, Building2, Handshake, ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal, RevealLines } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TryVerse" },
      { name: "description", content: "Reach the TryVerse team — shopper support, brand inquiries, partnerships." },
    ],
  }),
  component: ContactPage,
});

type Role = "Shopper" | "Brand" | "Partner" | "Other";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Shopper");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your name";
    if (!email.trim()) next.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email";
    if (!subject.trim()) next.subject = "Add a short subject";
    if (!message.trim() || message.trim().length < 10) next.message = "Tell us a bit more (10+ chars)";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-white">
      <Header />
      <main className="relative pt-[120px] pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[520px] w-[900px] -translate-x-1/2 opacity-60"
          style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
        />

        {/* Hero */}
        <section className="mx-auto max-w-[860px] px-6 sm:px-10 text-center">
          <Reveal as="div" className="eyebrow justify-center">CONTACT</Reveal>
          <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-[60px] leading-[1.05]">
            <RevealLines lines={["Let's Talk About", "TryVerse"]} accentIndices={[1]} step={120} />
          </h1>
          <Reveal as="p" delay={320} className="mt-6 text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            Have a question, need support, or want to bring TryVerse to your clothing brand? Send us a message and we'll get back to you.
          </Reveal>
        </section>

        {/* Two-column */}
        <section className="mx-auto max-w-[1180px] px-6 sm:px-10 mt-16">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.15fr_1fr]">
            {/* Form card */}
            <Reveal className="relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8 backdrop-blur-sm">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-60"
                style={{ boxShadow: "0 30px 80px -40px rgba(168,85,247,0.45)" }}
              />
              {sent ? (
                <div className="relative text-center py-14">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-violet/20 text-violet">
                    <Check size={26} />
                  </div>
                  <h3 className="font-display text-2xl mt-5">Thanks, we've received your message.</h3>
                  <p className="mt-3 text-white/65">We'll reply to {email || "you"} shortly.</p>
                  <button
                    onClick={() => {
                      setSent(false); setName(""); setEmail(""); setSubject(""); setMessage("");
                    }}
                    className="btn-secondary !py-3 !px-6 !text-sm mt-7"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="relative space-y-4">
                  <Field label="Full name" error={errors.name}>
                    <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Alex Morgan" />
                  </Field>
                  <Field label="Email address" error={errors.email}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@example.com" />
                  </Field>
                  <div>
                    <label className="block text-[13px] font-medium text-white/80 mb-2">I am a</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(["Shopper", "Brand", "Partner", "Other"] as Role[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`rounded-xl border px-3 py-2.5 text-[13px] font-medium transition-all ${
                            role === r
                              ? "border-violet/60 bg-violet/15 text-white shadow-[0_0_0_3px_rgba(168,85,247,0.12)]"
                              : "border-white/10 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/20"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field label="Subject" error={errors.subject}>
                    <input value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} placeholder="How can we help?" />
                  </Field>
                  <Field label="Message" error={errors.message}>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className={`${inputCls} resize-y min-h-[120px]`}
                      placeholder="Tell us a little about what you need…"
                    />
                  </Field>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center !py-3.5 mt-1 disabled:opacity-60">
                    {loading ? "Sending…" : (<>Send Message <ArrowRight size={16} /></>)}
                  </button>
                </form>
              )}
            </Reveal>

            {/* Info card */}
            <Reveal delay={120} className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7">
                <h3 className="font-display text-xl">How can we help?</h3>
                <div className="mt-5 space-y-4">
                  {[
                    { Icon: ShoppingBag, title: "Shopper Support", body: "Questions about virtual try-on, credits, or your account." },
                    { Icon: Building2, title: "Brand Inquiries", body: "AI photoshoots, ghost mannequin, widget, demos, and brand pricing." },
                    { Icon: Handshake, title: "Partnerships", body: "Collaborations, stores, and fashion platform opportunities." },
                  ].map(({ Icon, title, body }) => (
                    <div key={title} className="flex gap-3.5">
                      <div
                        className="shrink-0 grid h-10 w-10 place-items-center rounded-xl bg-violet/15 text-violet"
                        style={{ boxShadow: "0 0 24px -6px rgba(168,85,247,0.55)" }}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-white text-[15px]">{title}</div>
                        <p className="text-[13.5px] text-white/65 leading-relaxed mt-0.5">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet/15 text-violet">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-[12.5px] uppercase tracking-wider text-white/55">Email</div>
                    <a href="mailto:info@tryverse.app" className="text-white hover:text-violet transition-colors font-medium">
                      info@tryverse.app
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-violet/30 bg-gradient-to-br from-violet/10 to-transparent p-6 sm:p-7">
                <h4 className="font-display text-lg">Run a clothing brand?</h4>
                <p className="text-[14px] text-white/70 mt-1.5 leading-relaxed">
                  See TryVerse Brand Studio in action — AI photoshoots, ghost mannequin, and virtual try-on for your store.
                </p>
                <Link to="/book-demo" className="btn-primary !py-2.5 !px-5 !text-sm mt-4 inline-flex">
                  Book Brand Demo <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14.5px] text-white placeholder:text-white/35 outline-none transition-all focus:border-violet/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(168,85,247,0.15)]";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] font-medium text-white/80 mb-2">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-rose-400">{error}</p>}
    </div>
  );
}
