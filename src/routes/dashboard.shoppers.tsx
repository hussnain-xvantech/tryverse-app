import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ShopperShell } from "@/components/site/ShopperShell";

export const Route = createFileRoute("/dashboard/shoppers")({
  head: () => ({
    meta: [
      { title: "Shopper Dashboard — TryVerse" },
      { name: "description", content: "Your TryVerse shopper dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <ShopperShell>
      <Outlet />
    </ShopperShell>
  ),
});
