import { Either } from "effect";
import { XIcon } from "lucide-react";
import { Button } from "react-aria-components";
import { useDeleteLog } from "../lib/hooks/use-delete-log";
import { useGetLogByDate } from "../lib/hooks/use-get-log-by-date";
import { textColor } from "../styles";

export default function DateLogs({ date }: { date: string }) {
  const [_, action, pending] = useDeleteLog();
  const logByDate = useGetLogByDate(date);
  return Either.isRight(logByDate) ? (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {logByDate.right.map((log) => (
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
              <XIcon size={16} />
            </Button>
          </form>
          <span>{log.name}</span>
        </div>
      ))}
    </div>
  ) : (
    <div>{logByDate.left._tag}</div>
  );
}
