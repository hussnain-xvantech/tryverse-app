import { createFileRoute } from "@tanstack/react-router";
import { BrandPlaceholder } from "@/components/site/BrandShell";
export const Route = createFileRoute("/dashboard/brands/fabric-studio")({
  component: () => <BrandPlaceholder title="Fabric Studio" description="Upload fabric swatches and turn textile references into realistic clothing visuals." />,
});
