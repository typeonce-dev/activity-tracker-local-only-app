import { PlusIcon } from "lucide-react";
import { Button } from "react-aria-components";
import { useGetActivities } from "../lib/hooks/use-get-activities";
import { useInsertLog } from "../lib/hooks/use-insert-log";
import { textColor } from "../styles";
import Spinner from "./spinner";

export default function InsertLog({ date }: { date: string }) {
  const [, action, pending] = useInsertLog(date);
  const { data, error, loading } = useGetActivities();

  if (loading) {
    return <Spinner />;
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
            <input
              type="hidden"
              value={activity.activityId}
              name="activity-id"
            />
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
