import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";

const refresh = async () => {
  const result = await axios.get(`${API_URL}/auth/refresh`, {
    withCredentials: true,
  });

  console.log(result.data);

  axios.defaults.headers.common["Authorization"] =
    `Bearer ${result.data.accessToken}`;

  return result.data;
};

export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: refresh,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QueryKey.Session] });
    },
  });

  return {
    refresh: mutate,
    isPending,
  };
};
