import { cva } from "class-variance-authority";
import type { CategorySelect } from "../lib/schema";

const containerColor = cva("", {
  variants: {
    theme: {
      magenta: "bg-magenta",
      dawn: "bg-dawn",
      skin: "bg-skin",
      emerald: "bg-emerald",
      sky: "bg-sky",
      fuchsia: "bg-fuchsia",
      midnight: "bg-midnight",
      salt: "bg-salt",
    },
  },
});

const textColor = cva("", {
  variants: {
    theme: {
      magenta: "text-magenta border-magenta",
      dawn: "text-dawn border-dawn",
      skin: "text-skin border-skin",
      emerald: "text-emerald border-emerald",
      sky: "text-sky border-sky",
      fuchsia: "text-fuchsia border-fuchsia",
      midnight: "text-midnight border-midnight",
      salt: "text-salt border-salt",
    },
  },
});

export default function CategoryDot({
  category,
}: {
  category: CategorySelect;
}) {
  return (
    <div
      className={textColor({
        theme: category.color,
        className: "flex items-center gap-x-2 border rounded-md px-2 py-1",
      })}
    >
      <span
        className={containerColor({
          theme: category.color,
          className: "size-2 inline-block rounded-full",
        })}
      />
      <span>{category.name}</span>
    </div>
  );
}
