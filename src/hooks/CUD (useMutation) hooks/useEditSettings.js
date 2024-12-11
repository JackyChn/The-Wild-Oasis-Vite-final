import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSettings() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings edit successfully!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });
  return { isEditing, editSettings };
}
