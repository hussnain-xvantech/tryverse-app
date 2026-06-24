import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/book-demo")({
  head: () => ({ meta: [{ title: "Book A Demo — TryVerse" }] }),
  component: () => (
    <Placeholder
      eyebrow="Brand demo"
      title="Book A Walkthrough"
      accent="Of TryVerse Studio"
      description="See how TryVerse turns clothing photos into AI model shots, ghost mannequin images, videos, and virtual try-on for your store."
      primaryCta={{ label: "Contact Us", to: "/contact" }}
      secondaryCta={{ label: "Explore Brand Studio", to: "/for-brands" }}
    />
  ),
});
