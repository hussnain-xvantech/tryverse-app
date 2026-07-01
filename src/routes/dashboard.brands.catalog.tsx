import { createFileRoute } from "@tanstack/react-router";
import { BrandPlaceholder } from "@/components/site/BrandShell";
export const Route = createFileRoute("/dashboard/brands/catalog")({
  component: () => <BrandPlaceholder title="Catalog" description="Manage products, collections, brand assets, and generated visuals." />,
});
