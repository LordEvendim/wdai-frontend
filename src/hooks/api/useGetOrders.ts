import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";

import { useSession } from "./useSession";

export interface OrderDetails {
  orderId: number;
  productId: number;
  quantity: number;
  productName: string;
  price: number;
}

const fetchData = async (userId: number) => {
  const { data } = await axios.get<OrderDetails[]>(
    `${API_URL}/orders/users/${userId}`
  );

  return data;
};

export const useGetOrders = () => {
  const { session } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.Orders],
    enabled: !!session,
    queryFn: () => fetchData(session!.id),
  });

  return {
    orders: data,
    isLoading,
  };
};
