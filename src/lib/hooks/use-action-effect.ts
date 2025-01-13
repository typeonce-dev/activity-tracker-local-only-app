import { Effect, Function, type ManagedRuntime } from "effect";
import { useActionState } from "react";
import { RuntimeClient } from "../runtime-client";

export const useActionEffect = <A, E>(
  effect: (
    formData: FormData
  ) => Effect.Effect<
    A,
    E,
    ManagedRuntime.ManagedRuntime.Context<typeof RuntimeClient>
  >
) => {
  return useActionState(
    (_: E | null, formData: FormData) =>
      RuntimeClient.runPromise(
        effect(formData).pipe(
          Effect.match({
            onFailure: Function.identity,
            onSuccess: Function.constNull,
          })
        )
      ),
    null
  );
};
