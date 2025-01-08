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
