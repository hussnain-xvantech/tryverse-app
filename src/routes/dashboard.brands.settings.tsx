import { createFileRoute } from "@tanstack/react-router";
import { BrandPlaceholder } from "@/components/site/BrandShell";
export const Route = createFileRoute("/dashboard/brands/settings")({
  component: () => <BrandPlaceholder title="Brand Settings" description="Manage your brand profile, team members, and studio preferences." />,
});
