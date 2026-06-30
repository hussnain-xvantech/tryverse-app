import { createFileRoute } from "@tanstack/react-router";
import { DashFeatureStub } from "./dashboard.shoppers.try-on";

export const Route = createFileRoute("/dashboard/shoppers/ai-stylist")({
  component: () => (
    <DashFeatureStub
      title="AI Fashion Stylist"
      desc="Style advice, trip packing lists, and product search — all powered by Stylo, your personal AI stylist."
    />
  ),
});
