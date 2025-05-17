import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/shim/school")({
  component: RouteComponent,
});
function RouteComponent() {
  return <div>UNIST!</div>;
}
