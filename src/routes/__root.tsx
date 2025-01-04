import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Array, Effect } from "effect";
import { systemTable } from "../db";
import { RuntimeClient } from "../lib/runtime-client";
import { Migrations } from "../lib/services/migrations";
import { Pglite } from "../lib/services/pglite";

export const Route = createRootRoute({
  component: RootComponent,
  loader: () =>
    RuntimeClient.runPromise(
      Effect.gen(function* () {
        const migrations = yield* Migrations;
        const { query } = yield* Pglite;

        const latestVersion = migrations.length;
        const { version } = yield* query((_) =>
          _.select().from(systemTable).limit(1)
        ).pipe(
          Effect.flatMap(Array.head),
          Effect.catchTags({
            PgliteError: () => Effect.succeed({ version: 0 }),
          })
        );

        yield* Effect.all(migrations.slice(version));

        if (version === 0) {
          yield* query((_) => _.insert(systemTable).values({ version: 0 }));
        }

        yield* query((_) =>
          _.update(systemTable).set({ version: latestVersion })
        );

        yield* Effect.log(
          version === latestVersion
            ? "Database up to date"
            : `Migrations done (from ${version} to ${latestVersion})`
        );

        return latestVersion;
      }).pipe(Effect.tapErrorCause(Effect.logError))
    ),
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
