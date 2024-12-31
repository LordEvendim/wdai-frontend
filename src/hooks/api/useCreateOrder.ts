import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";
import { useCart } from "../useCart";

interface FetchParams {
  products: {
    product_id: number;
    quantity: number;
  }[];
  userId: number;
}

const createOrder = async ({ products, userId }: FetchParams) => {
  const result = await axios.post(`${API_URL}/orders/`, {
    products: products.map((product) => ({
      product_id: product.product_id,
      quantity: product.quantity,
    })),
    user_id: userId,
  });

  return result.data;
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const clearCart = useCart((state) => state.clearCart);

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      clearCart();
      queryClient.resetQueries({ queryKey: [QueryKey.Orders] });
    },
  });

  return {
    createOrder: mutate,
    isPending,
  };
};
