import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Authentication/useUser";
import { deleteExpense as deleteExpenseApi } from "./apiExpenses";
import { toast } from "react-hot-toast";

export function useDeleteExpense() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: deleteExpense, isLoading: isDeleting } = useMutation({
    mutationFn: ({ expenseId }) => deleteExpenseApi(user.id, expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses", user.id] });
      toast.success("Expense deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteExpense, isDeleting };
}
