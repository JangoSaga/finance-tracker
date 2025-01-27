import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBudget as addBudgetApi } from "./apiBudget";
import { useUser } from "../Authentication/useUser";
import { toast } from "react-toastify";

export function useAddBudget() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: addBudget, isLoading } = useMutation({
    mutationFn: ({ budget }) => addBudgetApi(user.id, budget),
    onSuccess: () => {
      toast.success("Budget added");
      queryClient.invalidateQueries({ queryKey: ["budgets", user.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addBudget, isLoading };
}
