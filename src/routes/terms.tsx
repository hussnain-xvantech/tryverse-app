import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — TryVerse" }] }),
  component: () => (
    <Placeholder
      eyebrow="Legal"
      title="Terms"
      accent="Of Service"
      description="The full TryVerse terms of service will appear here soon."
    />
  ),
});
