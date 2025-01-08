import { Console, Effect } from "effect";
import { useActionState } from "react";
import { RuntimeClient } from "../runtime-client";
import { WriteApi } from "../services/write-api";

export const useInsertLog = (date: string) => {
  return useActionState(
    (_: null, formData: FormData) =>
      RuntimeClient.runPromise(
        Effect.gen(function* () {
          const api = yield* WriteApi;
          const activityId = formData.get("activity-id")! as string;
          yield* Console.log("Inserting log", { date, activityId });
          yield* api.insertLog({ date, activityId: parseInt(activityId) });
          return null;
        })
      ),
    null
  );
};
