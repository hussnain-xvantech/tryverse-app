import { createFileRoute } from "@tanstack/react-router";
import { BrandPlaceholder } from "@/components/site/BrandShell";
export const Route = createFileRoute("/dashboard/brands/widget")({
  component: () => <BrandPlaceholder title="Try-On Widget" description="Add virtual try-on to your online store and let shoppers preview clothing before buying." />,
});
