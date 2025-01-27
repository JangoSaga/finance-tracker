import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Authentication/useUser";
import { addExpense as addExpenseApi } from "./apiExpenses";
import { toast } from "react-hot-toast";

export function useAddExpense() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: addExpense, isLoading: isAdding } = useMutation({
    mutationFn: ({ expense }) => addExpenseApi(user.id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses", user.id] });
      toast.success("Expense added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addExpense, isAdding };
}
