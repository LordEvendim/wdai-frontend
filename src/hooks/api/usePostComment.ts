import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";

interface FetchParams {
  prodcutId: number;
  text: string;
}

const postComment = async ({ prodcutId, text }: FetchParams) => {
  const result = await axios.post(`${API_URL}/comments/${prodcutId}`, {
    text,
  });

  return result.data;
};

export const usePostComments = (productId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QueryKey.Comments, productId] });
    },
  });

  return {
    postComment: mutate,
    isPending,
  };
};
