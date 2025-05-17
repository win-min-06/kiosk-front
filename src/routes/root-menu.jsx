import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { useState } from "react";
export const Route = createRootRoute({
  component: RootComponent,
});
function RootComponent() {
  const [page, setPage] = useState(1);
  return (
    <React.Fragment>
      <div className="card flex gap-4 justify-between">
        <Link
          to="/chae"
          className="p-6 w-full rounded-lg bg-gray-300 text-black"
        >
          채수연
        </Link>
        <Link
          to="/shim"
          className="p-6 w-full rounded-lg bg-gray-300 text-black"
        >
          심진서
        </Link>
        <Link
          to="/lee"
          className="p-6 w-full rounded-lg bg-gray-300 text-black"
        >
          이보성
        </Link>
      </div>
      <Outlet />
    </React.Fragment>
  );
}
