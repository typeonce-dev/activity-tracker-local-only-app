import { eq, sql } from "drizzle-orm";
import { activityTable, categoryTable, logTable } from "../../db";
import { LogByDateSelect } from "../schema";
import { useQuery } from "./use-pglite-query";

export const useGetLogByDate = (date: string) => {
  return useQuery(
    (_) =>
      _.select({
        logId: logTable.logId,
        date: logTable.date,
        note: logTable.note,
        name: activityTable.name,
        categoryName: sql`${categoryTable.name}`.as("categoryName"),
        color: categoryTable.color,
      })
        .from(logTable)
        .where(eq(logTable.date, date))
        .innerJoin(
          activityTable,
          eq(logTable.activityIdRef, activityTable.activityId)
        )
        .innerJoin(
          categoryTable,
          eq(categoryTable.categoryId, activityTable.categoryIdRef)
        )
        .toSQL(),
    LogByDateSelect
  );
};
