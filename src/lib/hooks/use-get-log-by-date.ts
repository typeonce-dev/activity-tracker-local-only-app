import { Effect } from "effect";
import { RuntimeClient } from "../runtime-client";
import { LogByDateSelect } from "../schema";
import { useQuery } from "./use-dexie-query";

export const useGetLogByDate = (date: string) => {
  return useQuery(
    async (_) =>
      RuntimeClient.runPromise(
        Effect.gen(function* () {
          const logs = yield* Effect.promise(() =>
            _.log.where("date").equals(date).toArray()
          );

          const logsWithActivity = yield* Effect.all(
            logs.map((log) =>
              Effect.gen(function* () {
                const activity = yield* Effect.promise(() =>
                  _.activity.get(log.activityIdRef)
                ).pipe(Effect.flatMap(Effect.fromNullable));
                return {
                  logId: log.logId,
                  date: log.date,
                  name: activity.name,
                  categoryIdRef: activity.categoryIdRef,
                };
              })
            ),
            { concurrency: "unbounded" }
          );

          return yield* Effect.all(
            logsWithActivity.map((withActivity) =>
              Effect.gen(function* () {
                const category = yield* Effect.promise(() =>
                  _.category.get(withActivity.categoryIdRef)
                ).pipe(Effect.flatMap(Effect.fromNullable));
                return {
                  logId: withActivity.logId,
                  date: withActivity.date,
                  name: withActivity.name,
                  categoryName: category.name,
                  color: category.color,
                };
              })
            ),
            { concurrency: "unbounded" }
          );
        })
      ),
    LogByDateSelect,
    [date]
  );
};
