import { Effect, Schema } from "effect";
import { Radio } from "react-aria-components";
import { useActionEffect } from "../lib/hooks/use-action-effect";
import { useGetCategories } from "../lib/hooks/use-get-categories";
import { Dexie } from "../lib/services/dexie";
import CategoryDot from "./category-dot";
import Loading from "./loading";
import { Button } from "./ui/button";
import { RadioGroup } from "./ui/radio-group";
import { FieldError, Input, Label, TextField } from "./ui/text-field";

type FormName = "name" | "categoryId";

export default function InsertActivity() {
  const { data, error, loading } = useGetCategories();
  const [, action, pending] = useActionEffect((formData) =>
    Effect.gen(function* () {
      const api = yield* Dexie;
      const query = api.insertActivity<FormName>(
        Schema.Struct({
          name: Schema.NonEmptyString,
          categoryId: Schema.NumberFromString,
        })
      );
      return yield* query(formData);
    })
  );

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <div>{error.reason}</div>;
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
