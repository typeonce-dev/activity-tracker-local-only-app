import { Data, Effect, flow, Schema } from "effect";
import { categoryTable } from "../../db";
import { Color } from "../schema";
import { Pglite } from "./pglite";

class WriteApiError extends Data.TaggedError("WriteApiError")<{
  cause: unknown;
}> {}

export class WriteApi extends Effect.Service<WriteApi>()("WriteApi", {
  dependencies: [Pglite.Default],
  effect: Effect.gen(function* () {
    const { query } = yield* Pglite;

    const execute = <A, I, T, E>(
      schema: Schema.Schema<A, I>,
      exec: (values: I) => Effect.Effect<T, E>
    ) =>
      flow(
        Schema.decode(schema),
        Effect.flatMap(Schema.encode(schema)),
        Effect.tap((encoded) => Effect.log("Insert", encoded)),
        Effect.mapError((error) => new WriteApiError({ cause: error })),
        Effect.flatMap(exec)
      );

    return {
      insertCategory: execute(
        Schema.Struct({ name: Schema.NonEmptyString, color: Color }),
        ({ name, color }) =>
          query((_) => _.insert(categoryTable).values({ name, color }))
      ),
    };
  }),
}) {}
