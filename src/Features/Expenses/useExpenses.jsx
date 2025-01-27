import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "./apiExpenses";
import { useUser } from "../Authentication/useUser";

export function useExpenses() {
  const { user } = useUser();
  const { data: expenses, isLoading } = useQuery({
    queryKey: ["expenses", user.id],
    queryFn: () => getExpenses(user.id),
    onError: (error) => {
      console.log(error);
    },
  });
  return { expenses, isLoading };
}
