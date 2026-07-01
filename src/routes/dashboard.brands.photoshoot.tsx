import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/brands/photoshoot")({
  head: () => ({ meta: [{ title: "AI Photoshoot — TryVerse Brand Studio" }] }),
  component: () => <Outlet />,
});
