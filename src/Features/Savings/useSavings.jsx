import { useUser } from "../Authentication/useUser";
import { getSavings as getSavingsApi } from "./apiSavings";
import { useQuery } from "@tanstack/react-query";

export function useSavings() {
  const { user } = useUser();
  const {
    data: savings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["savings", user.id],
    queryFn: () => getSavingsApi(user.id),
  });
  return { savings, isLoading, error };
}
