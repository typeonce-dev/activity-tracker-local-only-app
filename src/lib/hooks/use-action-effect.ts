import { Effect, type ManagedRuntime } from "effect";
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
    (_: unknown, formData: FormData) =>
      RuntimeClient.runPromise(effect(formData)),
    null
  );
};
