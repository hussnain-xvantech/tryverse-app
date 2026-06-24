import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — TryVerse" },
      { name: "description", content: "Guides, tutorials, and resources to get the most out of TryVerse." },
    ],
  }),
  component: () => (
    <Placeholder
      eyebrow="Resources"
      title="Guides & Resources"
      accent="For Every Creator"
      description="Tutorials, best practices, and inspiration for AI fashion creators and brands. Coming soon."
      primaryCta={{ label: "Try It Free", to: "/signup" }}
      secondaryCta={{ label: "View Pricing", to: "/pricing" }}
    />
  ),
});
