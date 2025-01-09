import { useLiveQuery } from "dexie-react-hooks";
import {
  Data,
  Effect,
  Either,
  flow,
  Match,
  pipe,
  Schema,
  type ParseResult,
} from "effect";
import { RuntimeClient } from "../runtime-client";
import { Dexie } from "../services/dexie";

class DatabaseError extends Data.TaggedError("DatabaseError")<{
  cause: unknown;
}> {}
class MissingData extends Data.TaggedError("MissingData")<{}> {}
class InvalidData extends Data.TaggedError("InvalidData")<{
  parseError: ParseResult.ParseError;
}> {}

export const useQuery = <A, I>(
  query: (db: (typeof Dexie.Service)["db"]) => Promise<I[]>,
  schema: Schema.Schema<A, I>,
  deps: unknown[] = []
) => {
  const results = useLiveQuery(
    () =>
      RuntimeClient.runPromise(
        Effect.gen(function* () {
          const { db } = yield* Dexie;
          return yield* Effect.tryPromise({
            try: () => query(db),
            catch: (error) => new DatabaseError({ cause: error }),
          });
        })
      ),
    deps
  );
  return pipe(
    results,
    Either.fromNullable(() => new MissingData()),
    Either.flatMap(
      flow(
        Schema.decodeEither(Schema.Array(schema)),
        Either.mapLeft((parseError) => new InvalidData({ parseError }))
      )
    ),
    Either.match({
      onLeft: (_) =>
        Match.value(_).pipe(
          Match.tagsExhaustive({
            InvalidData: ({ parseError }) => ({
              error: parseError,
              loading: false as const,
              data: undefined,
            }),
            MissingData: (_) => ({
              loading: true as const,
              data: undefined,
              error: undefined,
            }),
          })
        ),
      onRight: (rows) => ({
        data: rows,
        loading: false as const,
        error: undefined,
      }),
    })
  );
};
