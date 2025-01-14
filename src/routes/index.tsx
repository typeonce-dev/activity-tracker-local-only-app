import { createFileRoute, Link } from "@tanstack/react-router";
import { DateTime, Effect, Schema } from "effect";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import DateLogs from "../components/date-logs";
import InsertActivity from "../components/insert-activity";
import InsertCategory from "../components/insert-category";
import InsertLog from "../components/insert-log";

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
  const isToday = date === DateTime.formatIsoDate(DateTime.unsafeNow());
  return (
    <div className="mx-auto max-w-[32rem] py-12 flex flex-col gap-y-12">
      <div className="flex flex-col gap-y-12 items-center">
        <div className="flex flex-col items-center gap-y-4">
          <Link
            to="."
            disabled={isToday}
            data-disabled={isToday}
            className="text-sm text-sky hover:cursor-pointer hover:underline inline-flex items-center gap-x-2 group data-[disabled=true]:opacity-10 hover:data-[disabled=false]:[&>[data-slot=icon]]:-rotate-180 [&>[data-slot=icon]]:transition-transform [&>[data-slot=icon]]:duration-300"
          >
            <span>Today</span>
            <RotateCcw size={12} data-slot="icon" />
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

        <DateLogs date={date} />

        <InsertLog date={date} />
      </div>

      <hr className="text-sky/30" />

      <InsertActivity />

      <hr className="text-emerald/30" />

      <InsertCategory />
    </div>
  );
}
