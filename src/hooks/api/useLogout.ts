import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";

import { useCart } from "../useCart";

const logout = async () => {
  const result = await axios.delete(`${API_URL}/auth/logout`, {
    withCredentials: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return result.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearCart = useCart((state) => state.clearCart);

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      axios.defaults.headers.Authorization = "";
      clearCart();
      await queryClient.resetQueries({ queryKey: [QueryKey.Session] });
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
