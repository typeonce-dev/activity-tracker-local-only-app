import { Data, Effect, flow, Schema } from "effect";
import { activityTable, categoryTable, logTable } from "../../db";
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
        Effect.tapError((error) => Effect.log("Error", error)),
        Effect.mapError((error) => new WriteApiError({ cause: error })),
        Effect.flatMap(exec)
      );

    return {
      insertCategory: execute(
        Schema.Struct({ name: Schema.NonEmptyString, color: Color }),
        ({ name, color }) =>
          query((_) => _.insert(categoryTable).values({ name, color }))
      ),

      insertActivity: execute(
        Schema.Struct({
          name: Schema.NonEmptyString,
          categoryId: Schema.Number,
        }),
        ({ name, categoryId }) =>
          query((_) =>
            _.insert(activityTable).values({ name, categoryIdRef: categoryId })
          )
      ),

      insertLog: execute(
        Schema.Struct({ date: Schema.String, activityId: Schema.Number }),
        ({ date, activityId }) =>
          query((_) =>
            _.insert(logTable).values({ date, activityIdRef: activityId })
          )
      ),
    };
  }),
}) {}
