import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";

const FEATURES: Record<string, { title: string; accent: string; description: string }> = {
  "virtual-try-on": {
    title: "Virtual",
    accent: "Try-On",
    description: "See any outfit on yourself before you buy. Powered by TryVerse AI.",
  },
  "ai-photoshoot": {
    title: "AI",
    accent: "Photoshoot",
    description: "Turn flat-lay garment photos into editorial model shots in seconds.",
  },
  "ghost-mannequin": {
    title: "Ghost",
    accent: "Mannequin",
    description: "Clean ghost mannequin product images for your ecommerce store.",
  },
  "pose-studio": {
    title: "Pose",
    accent: "Studio",
    description: "Generate new pose variations of the same outfit, on the same model.",
  },
  "video-studio": {
    title: "Video",
    accent: "Studio",
    description: "Create short showcase videos of any outfit, ready for social and PDP.",
  },
  "stylo-ai-stylist": {
    title: "Stylo",
    accent: "AI Stylist",
    description: "An AI stylist that builds outfits from your wardrobe and favourite stores.",
  },
  "fabric-studio": {
    title: "Fabric",
    accent: "Studio",
    description: "Preserve fabric color, texture, and drape across every generated visual.",
  },
  "brand-widget": {
    title: "Brand",
    accent: "Widget",
    description: "Add a Try-On With TryVerse button to any clothing product page.",
  },
  analytics: {
    title: "Store",
    accent: "Analytics",
    description: "Track try-ons, conversions, and confidence lift across your catalog.",
  },
};

export const Route = createFileRoute("/features/$slug")({
  head: ({ params }) => {
    const f = FEATURES[params.slug];
    const title = f ? `${f.title} ${f.accent} — TryVerse` : "Feature — TryVerse";
    return { meta: [{ title }] };
  },
  component: FeaturePage,
});

function FeaturePage() {
  const { slug } = Route.useParams();
  const f = FEATURES[slug] ?? {
    title: "TryVerse",
    accent: "Feature",
    description: "Details about this TryVerse feature are coming soon.",
  };
  return (
    <Placeholder
      eyebrow="Feature"
      title={f.title}
      accent={f.accent}
      description={f.description}
      primaryCta={{ label: "Try It Free", to: "/signup" }}
      secondaryCta={{ label: "Explore Brand Studio", to: "/for-brands" }}
    />
  );
}
