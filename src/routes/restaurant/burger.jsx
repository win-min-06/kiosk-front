import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/chae/school")({
  component: RouteComponent,
});
function RouteComponent() {
  return <div>GIST!</div>;
}
