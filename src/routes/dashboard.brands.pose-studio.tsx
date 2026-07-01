import { createFileRoute } from "@tanstack/react-router";
import { BrandPlaceholder } from "@/components/site/BrandShell";
export const Route = createFileRoute("/dashboard/brands/pose-studio")({
  component: () => <BrandPlaceholder title="Pose Studio" description="Generate premium pose variations for catalog, editorial, and ecommerce from a single photo." />,
});
