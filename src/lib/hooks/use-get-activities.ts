import { ActivitySelect } from "../schema";
import { useQuery } from "./use-dexie-query";

export const useGetActivities = () => {
  return useQuery(async (_) => {
    const activities = await _.activity.toArray();
    return Promise.all(
      activities.map(async (activity) => {
        const category = await _.category.get(activity.categoryIdRef);
        return {
          activityId: activity.activityId,
          name: activity.name,
          categoryName: category?.name!,
          color: category?.color!,
        };
      })
    );
  }, ActivitySelect);
};
