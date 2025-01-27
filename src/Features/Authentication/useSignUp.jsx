import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "./apiUsers";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
function useSignUp() {
  const navigate = useNavigate();
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpApi({ email, password, fullName }),
    onSuccess: () => {
      navigate("/login");
      toast.success("Sign up successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signUp, isLoading };
}
export { useSignUp };
