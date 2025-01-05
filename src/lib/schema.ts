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
  id: Schema.Number,
  name: Schema.String,
  color: Color,
}) {}
