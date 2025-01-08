import { useLiveQuery } from "@electric-sql/pglite-react";
import type { Query } from "drizzle-orm";
import {
  Data,
  Either,
  flow,
  Match,
  pipe,
  Schema,
  type ParseResult,
} from "effect";
import { usePgliteDrizzle } from "./use-pglite-drizzle";

class MissingData extends Data.TaggedError("MissingData")<{}> {}
class InvalidData extends Data.TaggedError("InvalidData")<{
  parseError: ParseResult.ParseError;
}> {}

export const useQuery = <A, I>(
  query: (orm: ReturnType<typeof usePgliteDrizzle>) => Query,
  schema: Schema.Schema<A, I>
) => {
  const orm = usePgliteDrizzle();
  const { params, sql } = query(orm);
  const results = useLiveQuery<I>(sql, params);
  return pipe(
    results?.rows,
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
