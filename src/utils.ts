import { clsx, type ClassValue } from "clsx";
import { Schema } from "effect";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class SaveFormData<Name extends string = never> {
  constructor(readonly formData: FormData) {}

  entriesSchema<A, I>(schema: Schema.Schema<A, I>) {
    return Schema.decodeUnknownSync(schema)(this.formData.entries());
  }
}
