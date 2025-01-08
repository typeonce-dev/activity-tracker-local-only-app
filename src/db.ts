import { date, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { Color } from "./lib/schema";

export const colorColumn = pgEnum("color", Color.literals);

export const categoryTable = pgTable("category", {
  categoryId: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().unique().notNull(),
  color: colorColumn().notNull(),
});

export const activityTable = pgTable("activity", {
  activityId: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().unique().notNull(),
  categoryIdRef: integer("category_id")
    .references(() => categoryTable.categoryId)
    .notNull(),
});

export const logTable = pgTable("log", {
  logId: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: date().notNull(),
  note: varchar(),
  activityIdRef: integer("activity_id")
    .references(() => activityTable.activityId)
    .notNull(),
});

export const systemTable = pgTable("system", {
  version: integer().notNull().default(0),
});
