import { Button } from "../components/ui/button";
import { Radio, RadioGroup } from "../components/ui/radio-group";
import {
  FieldError,
  Input,
  Label,
  TextField,
} from "../components/ui/text-field";
import { useInsertCategory } from "../lib/hooks/use-insert-category";

export default function InsertCategory() {
  const [, action, pending] = useInsertCategory();
  return (
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
  );
}
