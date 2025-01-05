import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/button";
import { Radio, RadioGroup } from "../components/radio-group";
import { FieldError, Input, Label, TextField } from "../components/text-field";
import { useInsertCategory } from "../lib/hooks/use-insert-category";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [, action, pending] = useInsertCategory();
  return (
    <div className="mx-auto max-w-[32rem] py-12">
      <form action={action} className="flex flex-col gap-y-4">
        <TextField name="name">
          <Label hidden>Name</Label>
          <Input />
          <FieldError />
        </TextField>
        <RadioGroup name="color" className="flex gap-1 flex-wrap">
          <Label hidden>Color</Label>
          <Radio value="magenta" theme="magenta" />
          <Radio value="dawn" theme="dawn" />
          <Radio value="skin" theme="skin" />
          <Radio value="emerald" theme="emerald" />
          <Radio value="sky" theme="sky" />
          <Radio value="fuchsia" theme="fuchsia" />
          <Radio value="midnight" theme="midnight" />
          <Radio value="salt" theme="salt" />
        </RadioGroup>
        <Button type="submit" isPending={pending}>
          Save
        </Button>
      </form>
    </div>
  );
}
