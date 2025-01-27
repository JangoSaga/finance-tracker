import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "./apiUsers";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Login successful");
      queryClient.setQueryData(["user"], user.user);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isLoading };
}
export { useLogin };
