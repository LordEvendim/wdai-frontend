import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";

export interface ProdcutDetails {
  product_id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  units_in_stock: number;
}

const fetchData = async (productId: number) => {
  const { data } = await axios.get<ProdcutDetails[]>(
    `${API_URL}/products/${productId}`
  );

  return data[0];
};

export const useGetProduct = (prodcutId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.Products, prodcutId],
    enabled: !!prodcutId,
    queryFn: () => fetchData(prodcutId),
  });

  return {
    product: data,
    isLoading,
  };
};
