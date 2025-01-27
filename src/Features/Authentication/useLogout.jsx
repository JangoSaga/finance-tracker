import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "./apiUsers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.clear();
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { logout, isLoading };
}
