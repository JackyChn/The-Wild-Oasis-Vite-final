import { useMutation } from "@tanstack/react-query";
import { signUp as signUpFn } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading: isSigningup, mutate: signUp } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpFn({ fullName, email, password }),
    onSuccess: (user) => {
      toast.success(
        "Sign up succcessfully! Please proceed to verify your email."
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isSigningup, signUp };
}
