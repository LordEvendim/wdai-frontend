import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";

interface FetchParams {
  prodcutId: number;
  commentId: number;
}

const deleteComment = async ({ commentId, prodcutId }: FetchParams) => {
  await axios.delete(`${API_URL}/comments/${commentId}`);

  return { prodcutId };
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      void queryClient.resetQueries({
        queryKey: [QueryKey.Comments, data.prodcutId],
      });
    },
  });

  return {
    deleteComment: mutate,
    isPending,
  };
};
