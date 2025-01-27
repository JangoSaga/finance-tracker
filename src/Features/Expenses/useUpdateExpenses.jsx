import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Authentication/useUser";
import { updateExpense as updateExpenseApi } from "./apiExpenses";
import { toast } from "react-hot-toast";

export function useUpdateExpense() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: updateExpense, isLoading: isUpdating } = useMutation({
    mutationFn: ({ expenseId, expense }) =>
      updateExpenseApi(user.id, expenseId, expense),
    onSuccess: () => {
      toast.success("Expense updated successfully");
      queryClient.invalidateQueries({ queryKey: ["expenses", user.id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateExpense, isUpdating };
}
