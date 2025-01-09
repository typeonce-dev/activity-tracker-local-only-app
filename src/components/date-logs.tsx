import { XIcon } from "lucide-react";
import { Button } from "react-aria-components";
import { useDeleteLog } from "../lib/hooks/use-delete-log";
import { useGetLogByDate } from "../lib/hooks/use-get-log-by-date";
import { textColor } from "../styles";
import Spinner from "./spinner";

export default function DateLogs({ date }: { date: string }) {
  const [_, action, pending] = useDeleteLog();
  const { error, data, loading } = useGetLogByDate(date);

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {data.length === 0 ? (
        <span className="text-sm text-fuchsia/50">No activity</span>
      ) : (
        data.map((log) => (
          <div
            key={log.logId}
            className={textColor({
              theme: log.color,
              className:
                "border rounded-md inline-flex items-center gap-x-2 px-2 py-1",
            })}
          >
            <form
              action={action}
              className="inline-flex items-center justify-center"
            >
              <input type="hidden" value={log.logId} name="log-id" />
              <Button
                type="submit"
                isDisabled={pending}
                className="text-sm hover:cursor-pointer"
              >
                <XIcon
                  size={16}
                  className="hover:scale-125 transition-transform duration-150"
                />
              </Button>
            </form>
            <span>{log.name}</span>
          </div>
        ))
      )}
    </div>
  );
}
