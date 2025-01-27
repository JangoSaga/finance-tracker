import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncome as updateIncomeApi } from "./apiIncomes";
import { useUser } from "../Authentication/useUser";
import { toast } from "react-hot-toast";
export function useIncomeUpdate() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: updateIncome, isLoading } = useMutation({
    mutationFn: ({ incomeId, income }) => updateIncomeApi(incomeId, income),
    onSuccess: () => {
      toast.success("Income updated");
      queryClient.invalidateQueries({ queryKey: ["incomes", user.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateIncome, isLoading };
}
