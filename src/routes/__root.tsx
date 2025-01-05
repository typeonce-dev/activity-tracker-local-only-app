import { PGliteProvider } from "@electric-sql/pglite-react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Array, Effect } from "effect";
import { systemTable } from "../db";
import { PgliteDrizzleContext } from "../lib/hooks/use-pglite-drizzle";
import { RuntimeClient } from "../lib/runtime-client";
import { Migrations } from "../lib/services/migrations";
import { Pglite } from "../lib/services/pglite";

export const Route = createRootRoute({
  component: RootComponent,
  loader: () =>
    RuntimeClient.runPromise(
      Effect.gen(function* () {
        const migrations = yield* Migrations;
        const { query, client, orm } = yield* Pglite;

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

        return { client, orm };
      }).pipe(Effect.tapErrorCause(Effect.logError))
    ),
  errorComponent: (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
});

function RootComponent() {
  const { client, orm } = Route.useLoaderData();
  return (
    <div className="bg-midnight text-salt min-h-dvh">
      <PGliteProvider db={client}>
        <PgliteDrizzleContext.Provider value={orm}>
          <Outlet />
          {/* <TanStackRouterDevtools position="bottom-right" /> */}
        </PgliteDrizzleContext.Provider>
      </PGliteProvider>
    </div>
  );
}
