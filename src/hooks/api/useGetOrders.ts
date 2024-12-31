import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "./useSession";

export interface OrderDetails {
  order_id: number;
  order_details_id: number;
  user_id: number;
  product_id: number;
  quantity: number;
}

const fetchData = async (userId: number) => {
  const { data } = await axios.get<OrderDetails[]>(`${API_URL}/orders`, {
    params: {
      user_id: userId,
    },
  });

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
