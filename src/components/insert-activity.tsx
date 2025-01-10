import { useActionState } from "react";
import { Radio } from "react-aria-components";
import { useGetCategories } from "../lib/hooks/use-get-categories";
import { RuntimeClient } from "../lib/runtime-client";
import { Dexie } from "../lib/services/dexie";
import CategoryDot from "./category-dot";
import Loading from "./loading";
import { Button } from "./ui/button";
import { RadioGroup } from "./ui/radio-group";
import { FieldError, Input, Label, TextField } from "./ui/text-field";

type FormName = "name" | "categoryId";

export default function InsertActivity() {
  const { data, error, loading } = useGetCategories();
  const [, action, pending] = useActionState(
    (_: unknown, formData: FormData) =>
      RuntimeClient.runPromise(Dexie.insertActivity(formData)),
    null
  );

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <form action={action} className="flex flex-col gap-y-4">
      <TextField<FormName> name="name">
        <Label hidden>Name</Label>
        <Input />
        <FieldError />
      </TextField>

      <RadioGroup<FormName> className="flex flex-wrap gap-2" name="categoryId">
        <Label hidden>Category</Label>
        {data.map((category) => (
          <Radio
            key={category.categoryId}
            id={`${category.categoryId}`}
            value={`${category.categoryId}`}
            className="data-selected:[&_[data-slot=dot]]:opacity-100 [&_[data-slot=dot]]:opacity-10 data-hovered:cursor-pointer"
          >
            <CategoryDot category={category} />
          </Radio>
        ))}
      </RadioGroup>

      <Button type="submit" isPending={pending}>
        Create
      </Button>
    </form>
  );
}
