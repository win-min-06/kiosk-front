import { createFileRoute, Link } from "@tanstack/react-router";
export const Route = createFileRoute("/$number")({
  component: RouteComponent,
});
function RouteComponent() {
  const { number } = Route.useParams();
  return (
    <>
      {number}
      <Link to="/$number/school"> 학교</Link>
      <Link to="/$number/hometown"> 출신</Link>
      <Link to="/$number/birth"> 생일</Link>
    </>
  );
}
