import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export function useCabinQuery() {
  const {
    isLoading: isLoadingCabins,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isLoadingCabins, cabins, error };
}
