import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — TryVerse" }] }),
  component: () => (
    <Placeholder
      eyebrow="Free to start"
      title="Join TryVerse"
      accent="Today"
      description="Signups open soon. Brands can book a demo to get early access to Brand Studio."
      primaryCta={{ label: "Book Brand Demo", to: "/book-demo" }}
      secondaryCta={{ label: "Back To Home", to: "/" }}
    />
  ),
});
