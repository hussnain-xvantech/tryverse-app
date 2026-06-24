import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/stores")({
  head: () => ({ meta: [{ title: "Supported Stores — TryVerse" }] }),
  component: () => (
    <Placeholder
      eyebrow="Supported stores"
      title="Stores That Work"
      accent="With TryVerse"
      description="Browse the growing list of fashion stores supported by TryVerse virtual try-on."
      primaryCta={{ label: "Add Your Store", to: "/book-demo" }}
      secondaryCta={{ label: "Back To Home", to: "/" }}
    />
  ),
});
