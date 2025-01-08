import { createFileRoute } from "@tanstack/react-router";
import { DateTime, Effect, Either, Schema } from "effect";
import InsertActivity from "../components/insert-activity";
import InsertCategory from "../components/insert-category";
import { useGetActivities } from "../lib/hooks/use-get-activities";
import { textColor } from "../styles";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  errorComponent: (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
  validateSearch: (params) =>
    Effect.runSync(
      Schema.decodeUnknown(Schema.Struct({ date: Schema.DateTimeUtcFromSelf }))(
        params
      ).pipe(
        Effect.orElse(() =>
          DateTime.now.pipe(Effect.map((date) => ({ date })))
        ),
        Effect.map((params) => ({ date: DateTime.formatIsoDate(params.date) }))
      )
    ),
});

function HomeComponent() {
  const { date } = Route.useSearch();
  const activities = useGetActivities();
  return (
    <div className="mx-auto max-w-[32rem] py-12 flex flex-col gap-y-12">
      <div className="flex flex-col gap-y-8 items-center">
        <p className="text-sky text-center font-bold">{date}</p>

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
      </div>

      <hr className="text-sky/30" />

      <InsertActivity />

      <hr className="text-emerald/30" />

      <InsertCategory />
    </div>
  );
}
