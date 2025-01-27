import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Authentication/useUser";
import { addIncome as addIncomeApi } from "./apiIncomes";
import { toast } from "react-hot-toast";
export function useAddIncome() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: addIncome, isLoading } = useMutation({
    mutationFn: (income) => addIncomeApi(income, user.id),
    onSuccess: () => {
      toast.success("Income added");
      queryClient.invalidateQueries({ queryKey: ["incomes", user.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addIncome, isLoading };
}
