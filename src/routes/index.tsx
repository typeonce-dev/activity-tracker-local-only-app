import { createFileRoute, Link } from "@tanstack/react-router";
import { DateTime, Effect, Either, Schema } from "effect";
import { ArrowLeft, ArrowRight } from "lucide-react";
import InsertActivity from "../components/insert-activity";
import InsertCategory from "../components/insert-category";
import { useGetActivities } from "../lib/hooks/use-get-activities";
import { textColor } from "../styles";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  errorComponent: (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
  validateSearch: (params) =>
    Effect.runSync(
      Schema.decodeUnknown(Schema.Struct({ date: Schema.DateFromString }))(
        params
      ).pipe(
        Effect.map((params) => ({
          date: DateTime.unsafeFromDate(params.date),
        })),
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
        <div className="flex flex-col items-center gap-y-4">
          <Link
            to="."
            className="text-sm text-sky hover:cursor-pointer hover:underline"
          >
            Today
          </Link>
          <div className="flex items-center justify-between gap-x-8">
            <Link
              to="."
              search={(_) => ({
                date: DateTime.formatIsoDate(
                  DateTime.unsafeFromDate(new Date(date)).pipe(
                    DateTime.subtract({ days: 1 })
                  )
                ),
              })}
            >
              <ArrowLeft className="text-sky hover:cursor-pointer" />
            </Link>
            <p className="text-sky text-xl text-center font-bold">
              {new Date(date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <Link
              to="."
              search={(_) => ({
                date: DateTime.formatIsoDate(
                  DateTime.unsafeFromDate(new Date(date)).pipe(
                    DateTime.add({ days: 1 })
                  )
                ),
              })}
            >
              <ArrowRight className="text-sky hover:cursor-pointer" />
            </Link>
          </div>
        </div>

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
