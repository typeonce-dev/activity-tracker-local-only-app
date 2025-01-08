import { Either } from "effect";
import { Button } from "react-aria-components";
import { useGetActivities } from "../lib/hooks/use-get-activities";
import { useInsertLog } from "../lib/hooks/use-insert-log";
import { textColor } from "../styles";

export default function InsertLog({ date }: { date: string }) {
  const activities = useGetActivities();
  const [, action, pending] = useInsertLog(date);
  return Either.isRight(activities) ? (
    <div className="flex flex-wrap gap-2">
      {activities.right.map((activity) => (
        <form
          key={activity.activityId}
          action={action}
          className={textColor({
            theme: activity.color,
            className: "border rounded-md",
          })}
        >
          <Button
            type="submit"
            isDisabled={pending}
            className="px-2 py-1 text-sm hover:cursor-pointer"
          >
            <input
              type="hidden"
              value={activity.activityId}
              name="activity-id"
            />
            {activity.name}
          </Button>
        </form>
      ))}
    </div>
  ) : (
    <div>{activities.left._tag}</div>
  );
}
