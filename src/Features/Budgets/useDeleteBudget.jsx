import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBudget as deleteBudgetApi } from "./apiBudget";
import { useUser } from "../Authentication/useUser";
import { toast } from "react-toastify";

export function useDeleteBudget() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: deleteBudget, isLoading } = useMutation({
    mutationFn: ({ budgetId }) => deleteBudgetApi(user.id, budgetId),
    onSuccess: () => {
      toast.success("Budget deleted");
      queryClient.invalidateQueries({ queryKey: ["budgets", user.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteBudget, isLoading };
}
