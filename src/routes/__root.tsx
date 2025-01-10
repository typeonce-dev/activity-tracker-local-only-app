import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
  head: () => ({
    scripts: [{ src: "https://unpkg.com/react-scan/dist/auto.global.js" }],
  }),
});

function RootComponent() {
  return (
    <div className="bg-midnight text-salt min-h-dvh">
      <Outlet />
    </div>
  );
}
