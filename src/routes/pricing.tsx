import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — TryVerse" }] }),
  component: () => (
    <Placeholder
      eyebrow="Pricing"
      title="Simple Plans"
      accent="For Everyone"
      description="TryVerse is free to start. Detailed plans for shoppers and brands are coming soon."
      primaryCta={{ label: "Try It Free", to: "/signup" }}
      secondaryCta={{ label: "Book Brand Demo", to: "/book-demo" }}
    />
  ),
});
