import { createFileRoute } from "@tanstack/react-router";
import { BrandPlaceholder } from "@/components/site/BrandShell";
export const Route = createFileRoute("/dashboard/brands/analytics")({
  component: () => <BrandPlaceholder title="Analytics" description="Track engagement, try-ons, conversions, and top-performing clothing visuals." />,
});
