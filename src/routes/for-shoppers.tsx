import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/for-shoppers")({
  component: () => <Navigate to="/" replace />,
});
