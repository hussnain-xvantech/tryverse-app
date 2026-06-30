import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TryVerse" },
      { name: "description", content: "How TryVerse handles your data, photos, and AI-generated fashion visuals." },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: LegalSection[] = [
  {
    title: "Introduction",
    body: "This Privacy Policy describes how TryVerse handles information when you use our website, virtual try-on tools, brand tools, and related services.",
  },
  {
    title: "Information We Collect",
    bullets: [
      "Account information such as name, email, and account type",
      "Uploaded photos or clothing images",
      "AI-generated outputs created with our tools",
      "Usage data such as pages visited, features used, and device or browser information",
      "Payment or billing information handled through payment providers, where applicable",
    ],
  },
  {
    title: "How We Use Information",
    bullets: [
      "To provide TryVerse features and services",
      "To generate try-on results and AI fashion visuals",
      "To manage accounts and credits",
      "To improve performance and user experience",
      "To provide support and communicate updates",
      "To protect security and prevent abuse",
    ],
  },
  {
    title: "Uploaded Photos and Generated Images",
    bullets: [
      "Uploaded photos and generated results are used to provide the requested AI output",
      "TryVerse does not sell user images",
      "We aim to delete uploaded photos and generated results after the session or according to product settings",
      "Please avoid uploading images you do not have permission to use",
    ],
  },
  {
    title: "Sharing Information",
    bullets: [
      "We do not sell personal information",
      "We may share limited information with service providers needed to operate the platform",
      "We may disclose information if required by law or to protect TryVerse and our users",
    ],
  },
  {
    title: "Cookies and Analytics",
    bullets: [
      "TryVerse may use cookies or analytics tools to understand usage and improve the website",
      "You can control cookies through your browser settings",
    ],
  },
  {
    title: "Data Security",
    bullets: [
      "TryVerse uses reasonable technical and organizational measures to protect information",
      "No online service is 100% secure",
    ],
  },
  {
    title: "User Choices",
    bullets: [
      "You can request account updates or deletion",
      "You can contact TryVerse about privacy questions at any time",
    ],
  },
  {
    title: "Children's Privacy",
    body: "TryVerse is not intended for children under 13. We do not knowingly collect information from children under 13.",
  },
  {
    title: "Changes To This Policy",
    body: "This policy may be updated from time to time. We will reflect changes by updating the effective date above.",
  },
  {
    title: "Contact",
    body: "For privacy questions, contact us at info@tryverse.app.",
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACY POLICY"
      title="Your Privacy"
      accent="Matters"
      subtitle="We design TryVerse with privacy in mind, especially when you upload photos or create AI-generated fashion visuals."
      sections={SECTIONS}
      ctaHeading="Questions About Privacy?"
      ctaSub="We're happy to help — reach out to the TryVerse team anytime."
    />
  );
}
