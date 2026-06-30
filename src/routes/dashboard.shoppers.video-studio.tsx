import { createFileRoute } from "@tanstack/react-router";
import { DashFeatureStub } from "./dashboard.shoppers.try-on";

export const Route = createFileRoute("/dashboard/shoppers/video-studio")({
  component: () => (
    <DashFeatureStub
      title="Showcase Video"
      desc="Turn any outfit into eye-catching short videos for Instagram Reels, TikTok, and Shorts."
    />
  ),
});
