import { Schema } from "effect";

export const Color = Schema.Literal(
  "magenta",
  "dawn",
  "skin",
  "emerald",
  "sky",
  "fuchsia",
  "midnight",
  "salt"
);

const IdPrimaryKey = Schema.Number.annotations({
  message: () => "Id must be a number",
})
  .pipe(
    Schema.nonNegative({
      message: () => "Id must be a positive number",
    })
  )
  .annotations({
    identifier: "IdPrimaryKey",
    title: "id",
  });

export class CategoryTable extends Schema.Class<CategoryTable>("CategoryTable")(
  {
    categoryId: IdPrimaryKey,
    name: Schema.String,
    color: Color,
  }
) {}

export class ActivityTable extends Schema.Class<ActivityTable>("ActivityTable")(
  {
    activityId: IdPrimaryKey,
    name: Schema.String,
    categoryIdRef: IdPrimaryKey,
  }
) {}

export class LogTable extends Schema.Class<LogTable>("LogTable")({
  logId: IdPrimaryKey,
  date: Schema.DateFromString,
  activityIdRef: IdPrimaryKey,
}) {}

export class CategorySelect extends Schema.Class<CategorySelect>(
  "CategorySelect"
)({
  categoryId: IdPrimaryKey,
  name: Schema.String,
  color: Color,
}) {}

export class ActivitySelect extends Schema.Class<ActivitySelect>(
  "ActivitySelect"
)({
  activityId: IdPrimaryKey,
  name: Schema.String,
  categoryName: Schema.String,
  color: Color,
}) {}

export class LogByDateSelect extends Schema.Class<LogByDateSelect>(
  "LogByDateSelect"
)({
  logId: IdPrimaryKey,
  date: Schema.DateFromString,
  name: Schema.String,
  categoryName: Schema.String,
  color: Color,
}) {}
