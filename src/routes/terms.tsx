import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — TryVerse" },
      { name: "description", content: "Rules for using TryVerse virtual try-on, AI photoshoot, and brand tools." },
    ],
  }),
  component: TermsPage,
});

const SECTIONS: LegalSection[] = [
  {
    title: "Acceptance Of Terms",
    body: "By using TryVerse, you agree to these terms. If you do not agree, please do not use the service.",
  },
  {
    title: "TryVerse Services",
    bullets: [
      "Virtual Try-On",
      "AI Photoshoot",
      "Ghost Mannequin",
      "Pose Studio",
      "Video Studio",
      "Stylo AI Stylist",
      "Brand Widget",
      "Brand Studio tools",
    ],
  },
  {
    title: "Accounts",
    body: "You are responsible for providing accurate account information and keeping your credentials secure. You are responsible for activity that happens on your account.",
  },
  {
    title: "Shopper Use",
    body: "Shoppers can use TryVerse to preview clothing, get styling suggestions, and create try-on results for personal use.",
  },
  {
    title: "Brand Use",
    body: "Brands can use TryVerse to create AI visuals, manage catalog-related content, and use brand tools according to their plan limits.",
  },
  {
    title: "Uploaded Content",
    bullets: [
      "You must have the rights to upload photos, clothing images, and brand assets",
      "You are responsible for the content you upload",
      "Do not upload illegal, harmful, or unauthorized content",
    ],
  },
  {
    title: "AI Generated Outputs",
    bullets: [
      "AI outputs may vary between generations",
      "TryVerse does not guarantee perfect accuracy, fit, color, or appearance",
      "Review outputs carefully before using them commercially",
    ],
  },
  {
    title: "Payments, Credits, And Plans",
    bullets: [
      "Some features may require paid plans or credits",
      "Pricing may vary between shopper and brand plans",
      "Credits may be consumed when generating outputs",
      "Failed generation handling may follow platform rules described in-product",
    ],
  },
  {
    title: "Prohibited Use",
    bullets: [
      "Do not misuse the platform",
      "Do not attempt to reverse engineer or disrupt the services",
      "Do not upload harmful, illegal, or infringing content",
      "Do not use TryVerse for non-clothing categories where not supported",
      "Do not violate the rights of others",
    ],
  },
  {
    title: "Intellectual Property",
    bullets: [
      "TryVerse owns its platform, design, software, branding, and technology",
      "You retain rights to your uploaded content, subject to the license needed to provide the service",
    ],
  },
  {
    title: "Service Availability",
    bullets: [
      "TryVerse may change, suspend, or improve features at any time",
      "Service may not always be uninterrupted",
    ],
  },
  {
    title: "Limitation Of Liability",
    body: "To the extent allowed by law, TryVerse is not liable for indirect, incidental, or consequential damages or losses arising from your use of the service.",
  },
  {
    title: "Changes To Terms",
    body: "These terms may be updated from time to time. Updates take effect when posted, reflected by the effective date above.",
  },
  {
    title: "Contact",
    body: "For questions about these terms, contact us at info@tryverse.app.",
  },
];

function TermsPage() {
  return (
    <LegalPage
      eyebrow="TERMS & CONDITIONS"
      title="Terms"
      accent="Of Use"
      subtitle="These terms explain the rules for using TryVerse, including virtual try-on, AI photoshoot, brand tools, and related services."
      sections={SECTIONS}
      ctaHeading="Need Help?"
      ctaSub="Reach out to the TryVerse team — we're happy to help."
    />
  );
}
