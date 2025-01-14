import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";

interface FetchParams {
  username: string;
  password: string;
}

const login = async ({ username, password }: FetchParams) => {
  const result = await axios.post(
    `${API_URL}/auth/login`,
    {
      username,
      password,
    },
    {
      withCredentials: true,
    }
  );

  console.log("setting token");
  axios.defaults.headers.common["Authorization"] =
    `Bearer ${result.data.accessToken}`;

  return result.data;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: [QueryKey.Session] });
    },
  });

  return {
    login: mutate,
    isPending,
  };
};
