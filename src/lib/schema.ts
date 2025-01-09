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

export class CategoryTable extends Schema.Class<CategoryTable>("CategoryTable")(
  {
    categoryId: Schema.Number,
    name: Schema.String,
    color: Color,
  }
) {}

export class ActivityTable extends Schema.Class<ActivityTable>("ActivityTable")(
  {
    activityId: Schema.Number,
    name: Schema.String,
    categoryIdRef: Schema.Number,
  }
) {}

export class LogTable extends Schema.Class<LogTable>("LogTable")({
  logId: Schema.Number,
  date: Schema.DateFromString,
  note: Schema.NullOr(Schema.String),
  activityIdRef: Schema.Number,
}) {}

export class CategorySelect extends Schema.Class<CategorySelect>(
  "CategorySelect"
)({
  categoryId: Schema.Number,
  name: Schema.String,
  color: Color,
}) {}

export class ActivitySelect extends Schema.Class<ActivitySelect>(
  "ActivitySelect"
)({
  activityId: Schema.Number,
  name: Schema.String,
  categoryName: Schema.String,
  color: Color,
}) {}

export class LogByDateSelect extends Schema.Class<LogByDateSelect>(
  "LogByDateSelect"
)({
  logId: Schema.Number,
  date: Schema.DateFromString,
  note: Schema.NullOr(Schema.String),
  name: Schema.String,
  categoryName: Schema.String,
  color: Color,
}) {}
