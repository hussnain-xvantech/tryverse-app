import { createFileRoute } from "@tanstack/react-router";
import { BrandPlaceholder } from "@/components/site/BrandShell";
export const Route = createFileRoute("/dashboard/brands/billing")({
  component: () => <BrandPlaceholder title="Credits & Plan" description="Review your Suite plan, invoices, and add-on credits." />,
});
