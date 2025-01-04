import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const activityTable = pgTable("activity", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
});

export const systemTable = pgTable("system", {
  version: integer().notNull().default(0),
});
