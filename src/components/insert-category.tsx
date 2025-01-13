import { Effect, Schema } from "effect";
import { Button } from "../components/ui/button";
import { Radio, RadioGroup } from "../components/ui/radio-group";
import {
  FieldError,
  Input,
  Label,
  TextField,
} from "../components/ui/text-field";
import { useActionEffect } from "../lib/hooks/use-action-effect";
import { Color } from "../lib/schema";
import { Dexie } from "../lib/services/dexie";
import { LiteralFromString } from "../utils";

type FormName = "name" | "color";

export default function InsertCategory() {
  const [, action, pending] = useActionEffect((formData) =>
    Effect.gen(function* () {
      const api = yield* Dexie;
      const query = api.insertCategory<FormName>(
        Schema.Struct({
          name: Schema.NonEmptyString,
          color: LiteralFromString(Color),
        })
      );
      return yield* query(formData);
    })
  );
  return (
    <form action={action} className="flex flex-col gap-y-4">
      <TextField<FormName> name="name">
        <Label hidden>Name</Label>
        <Input />
        <FieldError />
      </TextField>

      <RadioGroup<FormName> name="color" className="flex gap-1 flex-wrap">
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
