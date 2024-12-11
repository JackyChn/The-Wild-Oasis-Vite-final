import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserFun } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUserFun,
    onSuccess: () => {
      toast.success("User account updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
  return { isUpdating, updateUser };
}
