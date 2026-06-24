import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — TryVerse" }] }),
  component: () => (
    <Placeholder
      eyebrow="Welcome back"
      title="Sign In To"
      accent="TryVerse"
      description="Login is coming soon. Create a free account to get notified when it goes live."
      primaryCta={{ label: "Create Account", to: "/signup" }}
      secondaryCta={{ label: "Back To Home", to: "/" }}
    />
  ),
});
