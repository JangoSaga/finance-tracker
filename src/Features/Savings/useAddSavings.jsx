import { addSavings as addSavingsApi } from "./apiSavings";
import { useUser } from "../Authentication/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useAddSavings() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { mutate: addSavings, isLoading } = useMutation({
    mutationFn: (savings) => addSavingsApi(savings, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings", user.id] });
      toast.success("Savings added");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addSavings, isLoading };
}
