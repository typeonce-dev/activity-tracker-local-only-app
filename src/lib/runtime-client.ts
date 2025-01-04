import { ConfigProvider, Layer, ManagedRuntime } from "effect";
import { Migrations } from "./services/migrations";
import { Pglite } from "./services/pglite";

const CustomConfigProvider = Layer.setConfigProvider(
  ConfigProvider.fromMap(new Map([["INDEX_DB", "v1"]]))
);

const MainLayer = Layer.mergeAll(Migrations.Default, Pglite.Default).pipe(
  Layer.provide(CustomConfigProvider)
);

export const RuntimeClient = ManagedRuntime.make(MainLayer);
