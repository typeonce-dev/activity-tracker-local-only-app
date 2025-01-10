import * as _Dexie from "dexie";
import { Data, Effect, pipe, Schema } from "effect";
import {
  Color,
  type ActivityTable,
  type CategoryTable,
  type LogTable,
} from "../schema";

class WriteApiError extends Data.TaggedError("WriteApiError")<{
  cause: unknown;
}> {}

const formDataToRecord = (formData: FormData): Record<string, string> => {
  const record: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      record[key] = value;
    }
  }
  return record;
};

export class Dexie extends Effect.Service<Dexie>()("Dexie", {
  effect: Effect.gen(function* () {
    const db = new _Dexie.Dexie("_db") as _Dexie.Dexie & {
      category: _Dexie.EntityTable<typeof CategoryTable.Encoded, "categoryId">;
      activity: _Dexie.EntityTable<typeof ActivityTable.Encoded, "activityId">;
      log: _Dexie.EntityTable<typeof LogTable.Encoded, "logId">;
    };

    db.version(1).stores({
      category: "++categoryId, &name",
      activity: "++activityId, &name",
      log: "++logId, date",
    });

    const execute =
      <F extends Record<string, string>, I, A, T>(
        source: Schema.Schema<I, F>,
        schema: Schema.Schema<A, I>,
        exec: (values: I) => Promise<T>
      ) =>
      <_ extends keyof F>(formData: FormData) =>
        pipe(
          Schema.decodeUnknown(source)(formDataToRecord(formData)),
          Effect.flatMap(Schema.decode(schema)),
          Effect.flatMap(Schema.encode(schema)),
          Effect.tap((encoded) => Effect.log("Insert", encoded)),
          Effect.tapError((error) =>
            Effect.log("Error", error, formDataToRecord(formData))
          ),
          Effect.mapError((error) => new WriteApiError({ cause: error })),
          Effect.flatMap((values) =>
            Effect.tryPromise({
              try: () => exec(values),
              catch: (error) => new WriteApiError({ cause: error }),
            })
          )
        );

    return {
      db,

      insertCategory: execute(
        Schema.Struct({ name: Schema.NonEmptyString, color: Color }),
        Schema.Struct({ name: Schema.NonEmptyString, color: Color }),
        ({ name, color }) => db.category.add({ name, color })
      ),

      insertActivity: execute(
        Schema.Struct({
          name: Schema.NonEmptyString,
          categoryId: Schema.NumberFromString,
        }),
        Schema.Struct({
          name: Schema.NonEmptyString,
          categoryId: Schema.Number,
        }),
        ({ name, categoryId }) =>
          db.activity.add({ name, categoryIdRef: categoryId })
      ),

      insertLog: execute(
        Schema.Struct({
          date: Schema.String,
          activityId: Schema.NumberFromString,
        }),
        Schema.Struct({ date: Schema.String, activityId: Schema.Number }),
        ({ date, activityId }) =>
          db.log.add({ date, activityIdRef: activityId, note: null })
      ),

      deleteLog: execute(
        Schema.Struct({ logId: Schema.NumberFromString }),
        Schema.Struct({ logId: Schema.Number }),
        ({ logId }) => db.log.where("logId").equals(logId).delete()
      ),
    };
  }),
}) {}
