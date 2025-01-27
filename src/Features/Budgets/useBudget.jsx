import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "./apiBudget";
import { useUser } from "../Authentication/useUser";

export function useBudget() {
  const { user } = useUser();
  const { data: budgets, isLoading } = useQuery({
    queryKey: ["budgets", user.id],
    queryFn: () => getBudgets(user.id),
  });

  return { budgets, isLoading };
}
