import { PlusIcon } from "lucide-react";
import { useActionState } from "react";
import { Button } from "react-aria-components";
import { useGetActivities } from "../lib/hooks/use-get-activities";
import { RuntimeClient } from "../lib/runtime-client";
import { Dexie } from "../lib/services/dexie";
import { textColor } from "../styles";
import Loading from "./loading";
import SaveInput from "./ui/save-input";

type FormName = "activityId" | "date";

export default function InsertLog({ date }: { date: string }) {
  const { data, error, loading } = useGetActivities();
  const [, action, pending] = useActionState(
    (_: unknown, formData: FormData) =>
      RuntimeClient.runPromise(Dexie.insertLog(formData)),
    null
  );

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <div>{error.message}</div>;
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
