import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginFn } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoggingin } = useMutation({
    mutationFn: ({ email, password }) => loginFn({ email, password }),
    onSuccess: (user) => {
      toast.success("Login successfull!");
      // queryClient.setQueriesData(["user"], user) ----> manually set some data
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Email or password incorrect!");
    },
  });
  return { login, isLoggingin };
}
