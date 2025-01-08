import { eq, sql } from "drizzle-orm";
import { activityTable, categoryTable } from "../../db";
import { ActivitySelect } from "../schema";
import { useQuery } from "./use-pglite-query";

export const useGetActivities = () => {
  return useQuery(
    (_) =>
      _.select({
        activityId: activityTable.activityId,
        name: activityTable.name,
        categoryName: sql`${categoryTable.name}`.as("categoryName"),
        color: categoryTable.color,
      })
        .from(activityTable)
        .innerJoin(
          categoryTable,
          eq(categoryTable.categoryId, activityTable.categoryIdRef)
        )
        .toSQL(),
    ActivitySelect
  );
};
