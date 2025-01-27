import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIncome as deleteIncomeApi } from "./apiIncomes";
import { useUser } from "../Authentication/useUser";
import { toast } from "react-hot-toast";
export function useDeleteIncome() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: deleteIncome, isLoading } = useMutation({
    mutationFn: (incomeId) => deleteIncomeApi(incomeId),
    onSuccess: () => {
      toast.success("Income deleted");
      queryClient.invalidateQueries({ queryKey: ["incomes", user.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteIncome, isLoading };
}
