import { Layer, ManagedRuntime } from "effect";
import { Dexie } from "./services/dexie";

const MainLayer = Layer.mergeAll(Dexie.Default);

export const RuntimeClient = ManagedRuntime.make(MainLayer);
