import { clsx, type ClassValue } from "clsx";
import { Either, ParseResult, Schema, type Array } from "effect";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LiteralFromString = <
  Literals extends Array.NonEmptyReadonlyArray<string>,
>(
  literal: Schema.Literal<Literals>
) =>
  Schema.String.pipe(
    Schema.transformOrFail(literal, {
      decode: (from, _, ast) =>
        Schema.decodeUnknownEither(literal)(from).pipe(
          Either.match({
            onLeft: (error) =>
              ParseResult.fail(new ParseResult.Type(ast, from, error.message)),
            onRight: ParseResult.succeed,
          })
        ),
      encode: ParseResult.succeed,
    })
  );
