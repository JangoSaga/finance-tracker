import { deleteSavings as deleteSavingsApi } from "./apiSavings";
import { useUser } from "../Authentication/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useDeleteSavings() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: deleteSavings, isLoading } = useMutation({
    mutationFn: (savingsId) => deleteSavingsApi(savingsId, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings", user.id] });
      toast.success("Savings deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteSavings, isLoading };
}
