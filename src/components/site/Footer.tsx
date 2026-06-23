import { Github, Instagram, Twitter, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

const product = ["Virtual Try-On", "AI Photoshoot", "Ghost Mannequin", "AI Pose Studio", "Stylo AI Stylist"];
const company = ["Pricing", "Stores", "For Brands", "Login"];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Try It Before You Buy It. The AI fashion platform for shoppers and apparel brands.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-muted-foreground hover:text-white hover:border-violet/40 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              {product.map((l) => (
                <li key={l}>
                  <a href="#features" className="text-white/80 hover:text-white">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              {company.map((l) => (
                <li key={l}><a href="#" className="text-white/80 hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Get started</h4>
            <a href="#try" className="btn-primary w-full">Try It Free</a>
            <a href="#brands" className="btn-secondary w-full mt-2">Book Brand Demo</a>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} TryVerse. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
