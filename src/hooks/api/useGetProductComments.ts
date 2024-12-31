import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Comment {
  comment_id: number;
  product_id: number;
  user_id: number;
  body: string;
}

const fetchData = async (productId: number) => {
  const { data } = await axios.get<Comment[]>(
    `${API_URL}/comments/product/${productId}`
  );

  return data;
};

export const useGetProdcutComments = (productId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.Comments, productId],
    queryFn: () => fetchData(productId),
  });

  return {
    comments: data,
    isLoading,
  };
};
