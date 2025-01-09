import { Console, Effect } from "effect";
import { useActionState } from "react";
import { RuntimeClient } from "../runtime-client";
import { Dexie } from "../services/dexie";

export const useInsertActivity = () => {
  return useActionState(
    (_: null, formData: FormData) =>
      RuntimeClient.runPromise(
        Effect.gen(function* () {
          const api = yield* Dexie;
          const name = formData.get("name")! as string;
          const categoryId = formData.get("category-id")! as string;
          yield* Console.log("Inserting activity", { name, categoryId });
          yield* api.insertActivity({ name, categoryId: parseInt(categoryId) });
          return null;
        })
      ),
    null
  );
};
