import { Console, Effect } from "effect";
import { useActionState } from "react";
import { RuntimeClient } from "../runtime-client";
import { Dexie } from "../services/dexie";

export const useDeleteLog = () => {
  return useActionState(
    (_: null, formData: FormData) =>
      RuntimeClient.runPromise(
        Effect.gen(function* () {
          const api = yield* Dexie;
          const logId = formData.get("log-id")! as string;
          yield* Console.log("Deleting log", { logId });
          yield* api.deleteLog({ logId: parseInt(logId) });
          return null;
        })
      ),
    null
  );
};
