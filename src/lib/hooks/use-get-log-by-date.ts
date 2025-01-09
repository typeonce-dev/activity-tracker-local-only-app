import { LogByDateSelect } from "../schema";
import { useQuery } from "./use-dexie-query";

export const useGetLogByDate = (date: string) => {
  return useQuery(
    async (_) => {
      const logs = await _.log.where("date").equals(date).toArray();
      const logsWithActivity = await Promise.all(
        logs.map(async (log) => {
          const activity = await _.activity.get(log.activityIdRef);
          return {
            logId: log.logId,
            date: log.date,
            note: log.note,
            name: activity?.name!,
            categoryIdRef: activity?.categoryIdRef!,
          };
        })
      );
      return Promise.all(
        logsWithActivity.map(async (withActivity) => {
          const category = await _.category.get(withActivity.categoryIdRef);
          return {
            logId: withActivity.logId,
            date: withActivity.date,
            note: withActivity.note,
            name: withActivity.name,
            categoryName: category?.name!,
            color: category?.color!,
          };
        })
      );
    },
    LogByDateSelect,
    [date]
  );
};
