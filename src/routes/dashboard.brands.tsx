import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/brands")({
  head: () => ({
    meta: [
      { title: "Brand Studio — TryVerse" },
      { name: "description", content: "Your TryVerse Brand Studio dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => <Outlet />,
});
