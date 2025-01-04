import v0000 from "../../drizzle/0000_material_george_stacy.sql?raw";
import v0001 from "../../drizzle/0001_absurd_mandrill.sql?raw";

import type { PGlite } from "@electric-sql/pglite";
import { Data, Effect } from "effect";
import { Pglite } from "./pglite";

class MigrationsError extends Data.TaggedError("MigrationsError")<{
  cause: unknown;
}> {}

const execute = (client: PGlite) => (sql: string) =>
  Effect.tryPromise({
    try: () => client.exec(sql),
    catch: (error) => new MigrationsError({ cause: error }),
  });

export class Migrations extends Effect.Service<Migrations>()("Migrations", {
  dependencies: [Pglite.Default],
  effect: Effect.gen(function* () {
    const db = yield* Pglite;
    const migrate = execute(db.client);
    return [migrate(v0000), migrate(v0001)] as const;
  }),
}) {}
