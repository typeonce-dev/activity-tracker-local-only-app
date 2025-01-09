import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
});

function RootComponent() {
  return (
    <div className="bg-midnight text-salt min-h-dvh">
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </div>
  );
}
