import { createFileRoute } from "@tanstack/react-router";
import { BrandPlaceholder } from "@/components/site/BrandShell";
export const Route = createFileRoute("/dashboard/brands/product-design")({
  component: () => <BrandPlaceholder title="Product Design" description="Remove backgrounds, add text, apply styles, and craft polished clothing product visuals." />,
});
