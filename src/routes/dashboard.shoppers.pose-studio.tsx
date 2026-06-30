import { createFileRoute } from "@tanstack/react-router";
import { DashFeatureStub } from "./dashboard.shoppers.try-on";

export const Route = createFileRoute("/dashboard/shoppers/pose-studio")({
  component: () => (
    <DashFeatureStub
      title="Pose Studio"
      desc="Transform your outfit photos into professional fashion poses — catalog, editorial, lifestyle, and more."
    />
  ),
});
