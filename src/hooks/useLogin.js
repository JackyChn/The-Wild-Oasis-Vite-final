import { useMutation } from "@tanstack/react-query";
import { login as loginFn } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoggingin } = useMutation({
    mutationFn: ({ email, password }) => loginFn({ email, password }),
    onSuccess: (user) => {
      toast.success("Login successfull!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Email of password incorrect!");
    },
  });
  return { login, isLoggingin };
}
