import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — TryVerse" }] }),
  component: () => (
    <Placeholder
      eyebrow="Legal"
      title="Privacy"
      accent="Policy"
      description="The full TryVerse privacy policy will appear here soon."
    />
  ),
});
