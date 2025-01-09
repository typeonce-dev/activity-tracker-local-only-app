import { XIcon } from "lucide-react";
import { useActionState } from "react";
import { Button } from "react-aria-components";
import { useGetLogByDate } from "../lib/hooks/use-get-log-by-date";
import { RuntimeClient } from "../lib/runtime-client";
import { Dexie } from "../lib/services/dexie";
import { textColor } from "../styles";
import { SaveFormData } from "../utils";
import Loading from "./loading";
import SaveInput from "./ui/save-input";

type FormName = "log-id";

export default function DateLogs({ date }: { date: string }) {
  const { error, data, loading } = useGetLogByDate(date);
  const [_, action, pending] = useActionState(
    (_: unknown, formData: FormData) =>
      RuntimeClient.runPromise(
        Dexie.deleteLog(new SaveFormData<FormName>(formData).entriesSchema)
      ),
    null
  );

  if (loading) {
    return <Loading />;
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
              <SaveInput<FormName>
                type="hidden"
                value={log.logId}
                name="log-id"
              />
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
