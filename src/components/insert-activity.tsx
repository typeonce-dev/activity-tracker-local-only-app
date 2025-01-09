import { Radio } from "react-aria-components";
import { useGetCategories } from "../lib/hooks/use-get-categories";
import { useInsertActivity } from "../lib/hooks/use-insert-activity";
import CategoryDot from "./category-dot";
import Spinner from "./spinner";
import { Button } from "./ui/button";
import { RadioGroup } from "./ui/radio-group";
import { FieldError, Input, Label, TextField } from "./ui/text-field";

export default function InsertActivity() {
  const [, action, pending] = useInsertActivity();
  const { data, error, loading } = useGetCategories();

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <form action={action} className="flex flex-col gap-y-4">
      <TextField name="name">
        <Label hidden>Name</Label>
        <Input />
        <FieldError />
      </TextField>

      <RadioGroup className="flex flex-wrap gap-2" name="category-id">
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
