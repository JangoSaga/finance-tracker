import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Authentication/useUser";
import { deleteCategory as deleteCategoryApi } from "./apiCategories";
import { toast } from "react-hot-toast";
export function useDeleteCategory() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    mutate: deleteCategory,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (categoryId) =>
      deleteCategoryApi({ userId: user?.id, categoryId }),
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["categories", user?.id] });
    },
    onError: () => {
      toast.error(
        "Error while deleting category, maybe the categories are in use"
      );
    },
  });
  return { deleteCategory, isLoading, error };
}
