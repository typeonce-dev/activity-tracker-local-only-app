import { date, integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { Color } from "./lib/schema";

export const colorColumn = pgEnum("color", Color.literals);

export const categoryTable = pgTable("category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  color: colorColumn().notNull(),
});

export const activityTable = pgTable("activity", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  idCategory: integer("category_id").references(() => categoryTable.id),
});

export const logTable = pgTable("log", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date: date().notNull(),
  activityId: integer("activity_id")
    .references(() => activityTable.id)
    .notNull(),
  note: varchar(),
});

export const systemTable = pgTable("system", {
  version: integer().notNull().default(0),
});
