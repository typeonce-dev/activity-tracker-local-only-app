import { categoryTable } from "../../db";
import { CategorySelect } from "../schema";
import { useQuery } from "./use-pglite-query";

export const useGetCategories = () => {
  return useQuery(
    (_) => _.select().from(categoryTable).toSQL(),
    CategorySelect
  );
};
