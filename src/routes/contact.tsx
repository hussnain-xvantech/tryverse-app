import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — TryVerse" }] }),
  component: () => (
    <Placeholder
      eyebrow="Get in touch"
      title="Talk To"
      accent="The TryVerse Team"
      description="Questions, partnerships, or press? We'd love to hear from you."
      primaryCta={{ label: "Book A Demo", to: "/book-demo" }}
      secondaryCta={{ label: "Back To Home", to: "/" }}
    />
  ),
});
