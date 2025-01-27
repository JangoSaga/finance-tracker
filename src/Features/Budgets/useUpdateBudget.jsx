import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBudget as updateBudgetApi } from "./apiBudget";
import { useUser } from "../Authentication/useUser";
import { toast } from "react-toastify";

export function useUpdateBudget() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: updateBudget, isLoading } = useMutation({
    mutationFn: ({ budgetId, budget }) =>
      updateBudgetApi(user.id, budgetId, budget),
    onSuccess: () => {
      toast.success("Budget updated");
      queryClient.invalidateQueries({ queryKey: ["budgets", user.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateBudget, isLoading };
}
