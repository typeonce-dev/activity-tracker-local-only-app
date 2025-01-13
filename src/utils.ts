import { clsx, type ClassValue } from "clsx";
import { Schema, type Array } from "effect";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LiteralFromString = <
  Literals extends Array.NonEmptyReadonlyArray<string>,
>(
  literal: Schema.Literal<Literals>
) => Schema.compose(Schema.String, literal);
