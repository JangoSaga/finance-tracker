import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory as updateCategoryApi } from "./apiCategories";
import { useUser } from "../Authentication/useUser";
import { toast } from "react-hot-toast";
export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const {
    mutate: updateCategory,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ categoryId, category }) => {
      return updateCategoryApi({ userId: user?.id, categoryId, category });
    },
    onSuccess: () => {
      toast.success("Category updated");
      queryClient.invalidateQueries({ queryKey: ["categories", user?.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCategory, isLoading, error };
}
