import { Effect, Schema } from "effect";
import { PlusIcon } from "lucide-react";
import { Button } from "react-aria-components";
import { useActionEffect } from "../lib/hooks/use-action-effect";
import { useGetActivities } from "../lib/hooks/use-get-activities";
import { Dexie } from "../lib/services/dexie";
import { textColor } from "../styles";
import Loading from "./loading";
import SaveInput from "./ui/save-input";

type FormName = "activityId" | "date";

export default function InsertLog({ date }: { date: string }) {
  const { data, error, loading } = useGetActivities();
  const [, action, pending] = useActionEffect((formData) =>
    Effect.gen(function* () {
      const api = yield* Dexie;
      const query = api.insertLog<FormName>(
        Schema.Struct({
          date: Schema.String,
          activityId: Schema.NumberFromString,
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
    <div className="flex flex-wrap gap-2">
      {data.map((activity) => (
        <div
          key={activity.activityId}
          className={textColor({
            theme: activity.color,
            className:
              "border rounded-md inline-flex items-center gap-x-2 px-2 py-1",
          })}
        >
          <form
            action={action}
            className="inline-flex items-center justify-center"
          >
            <SaveInput<FormName>
              type="hidden"
              value={activity.activityId}
              name="activityId"
            />
            <SaveInput<FormName> type="hidden" value={date} name="date" />
            <Button
              type="submit"
              isDisabled={pending}
              className="hover:cursor-pointer"
            >
              <PlusIcon
                size={16}
                className="hover:scale-125 transition-transform duration-150"
              />
            </Button>
          </form>
          <span className="text-sm">{activity.name}</span>
        </div>
      ))}
    </div>
  );
}
