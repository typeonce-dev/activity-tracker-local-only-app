import type { CategorySelect } from "../lib/schema";
import { containerColor, textColor } from "../styles";

export default function CategoryDot({
  category,
}: {
  category: CategorySelect;
}) {
  return (
    <span
      className={textColor({
        theme: category.color,
        className: "flex items-center gap-x-2 border rounded-md px-2 py-1",
      })}
    >
      <span
        data-slot="dot"
        className={containerColor({
          theme: category.color,
          className: "size-2 inline-block rounded-full",
        })}
      />
      <span className="select-none text-sm">{category.name}</span>
    </span>
  );
}
