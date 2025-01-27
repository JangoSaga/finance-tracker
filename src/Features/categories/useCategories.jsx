import { useQuery } from "@tanstack/react-query";
import { useUser } from "../Authentication/useUser";
import { getCategories as getCategoriesApi } from "./apiCategories";

export function useCategories() {
  const { user } = useUser();
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", user?.id],
    queryFn: () => getCategoriesApi({ userId: user?.id }),
  });
  return { categories, isLoading, error };
}
