import { createFileRoute } from "@tanstack/react-router";
import { Either } from "effect";
import InsertActivity from "../components/insert-activity";
import InsertCategory from "../components/insert-category";
import Calendar from "../components/ui/calendar";
import { useGetActivities } from "../lib/hooks/use-get-activities";
import { textColor } from "../styles";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const activities = useGetActivities();
  return (
    <div className="mx-auto max-w-[32rem] py-12 flex flex-col gap-y-12">
      <Calendar
        onDayClick={(date) => {
          console.log(date);
        }}
      />

      {Either.isRight(activities) ? (
        <div className="flex flex-wrap gap-2">
          {activities.right.map((activity) => (
            <span
              key={activity.activityId}
              className={textColor({
                theme: activity.color,
                className: "border rounded-md px-2 py-1 text-sm",
              })}
            >
              {activity.name}
            </span>
          ))}
        </div>
      ) : (
        <div>{activities.left._tag}</div>
      )}

      <hr className="text-sky/30" />

      <InsertActivity />
      <InsertCategory />
    </div>
  );
}
