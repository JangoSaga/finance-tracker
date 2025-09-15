import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory as createCategoryApi } from "./apiCategories";
import { useUser } from "../Authentication/useUser";
import { toast } from "react-hot-toast";
export function useCreateCategory() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: createCategory,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ category, defaultCat }) =>
      createCategoryApi({ userId: user?.id, category }),
    onSuccess: (defaultCat) => {
      console.log(defaultCat);
      if (!defaultCat) toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["categories", user?.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createCategory, isLoading, error };
}
