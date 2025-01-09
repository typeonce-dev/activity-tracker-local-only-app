import { CategorySelect } from "../schema";
import { useQuery } from "./use-dexie-query";

export const useGetCategories = () => {
  return useQuery((_) => _.category.toArray(), CategorySelect);
};
