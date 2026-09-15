import queryKeys from "@/shared/constants/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cart from "../@types/Cart.type";

export default function useListCarts() {
  const queryClient = useQueryClient();

  const $queryKey = queryKeys.cart.LIST;

  return useQuery({
    initialData: [],
    queryKey: $queryKey,
    queryFn: async () => {
      const carts = queryClient.getQueryData<Array<Cart>>($queryKey);

      if (!carts) {
        return [];
      }

      return carts;
    }
  });
}