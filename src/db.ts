import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

const colorColumn = varchar(); // Enum?

export const categoryTable = pgTable("category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  color: colorColumn.notNull(),
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
