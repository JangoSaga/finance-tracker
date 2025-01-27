import { useQuery } from "@tanstack/react-query";
import { getIncomes } from "./apiIncomes";
import { useUser } from "../Authentication/useUser";
export function useIncomes() {
  const { user } = useUser();
  const { isLoading, data: incomes } = useQuery({
    queryKey: ["incomes", user.id],
    queryFn: () => getIncomes(user.id),
  });
  return { isLoading, incomes };
}
