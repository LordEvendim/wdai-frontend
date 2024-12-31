import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface ProdcutDetails {
  product_id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  units_in_stock: number;
}

const fetchData = async () => {
  const { data } = await axios.get<ProdcutDetails[]>(`${API_URL}/products`);

  return data;
};

export const useGetProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.Products],
    queryFn: () => fetchData(),
  });

  return {
    products: data,
    isLoading,
  };
};
