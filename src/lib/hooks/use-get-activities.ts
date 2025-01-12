import { Effect } from "effect";
import { RuntimeClient } from "../runtime-client";
import { ActivitySelect } from "../schema";
import { useQuery } from "./use-dexie-query";

export const useGetActivities = () => {
  return useQuery(
    async (_) =>
      RuntimeClient.runPromise(
        Effect.gen(function* () {
          const activities = yield* Effect.promise(() => _.activity.toArray());
          return yield* Effect.all(
            activities.map((activity) =>
              Effect.gen(function* () {
                const category = yield* Effect.promise(() =>
                  _.category.get(activity.categoryIdRef)
                ).pipe(Effect.flatMap(Effect.fromNullable));
                return {
                  activityId: activity.activityId,
                  name: activity.name,
                  categoryName: category.name,
                  color: category.color,
                };
              })
            ),
            { concurrency: "unbounded" }
          );
        })
      ),
    ActivitySelect
  );
};
