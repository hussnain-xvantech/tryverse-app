import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — TryVerse" },
      { name: "description", content: "Discover featured AI fashion stores, brands, and try-on experiences on TryVerse." },
    ],
  }),
  component: () => (
    <Placeholder
      eyebrow="Discover"
      title="Discover Fashion"
      accent="Powered By AI"
      description="Explore featured stores, virtual try-on collections, and curated AI fashion experiences. Coming soon."
      primaryCta={{ label: "Try It Free", to: "/signup" }}
      secondaryCta={{ label: "For Brands", to: "/for-brands" }}
    />
  ),
});
