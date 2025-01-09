import { Console, Effect } from "effect";
import { useActionState } from "react";
import { RuntimeClient } from "../runtime-client";
import type { Color } from "../schema";
import { Dexie } from "../services/dexie";

export const useInsertCategory = () => {
  return useActionState(
    (_: null, formData: FormData) =>
      RuntimeClient.runPromise(
        Effect.gen(function* () {
          const api = yield* Dexie;
          const name = formData.get("name")! as string;
          const color = formData.get("color")! as typeof Color.Type;
          yield* Console.log("Inserting category", { name, color });
          yield* api.insertCategory({ name, color });
          return null;
        })
      ),
    null
  );
};
