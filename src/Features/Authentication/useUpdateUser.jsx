import { useMutation } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "./apiUsers";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ password, fullName, avatar }) =>
      updateUserApi({ password, fullName, avatar }),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { updateUser, isLoading };
}
