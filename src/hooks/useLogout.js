import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutFn } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLoggingout, mutate: logout } = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      toast.success("Logout success!");
      queryClient.removeQueries(); // clear all query, protecting the route
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Fail to logout, check the network status");
    },
  });

  return { isLoggingout, logout };
}
