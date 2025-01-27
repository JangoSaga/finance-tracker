import { updateSavings as updateSavingsApi } from "./apiSavings";
import { useUser } from "../Authentication/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useUpdateSavings() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: updateSavings, isLoading } = useMutation({
    mutationFn: ({ savingsId, savings }) =>
      updateSavingsApi(savingsId, savings, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings", user.id] });
      toast.success("Savings updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateSavings, isLoading };
}
