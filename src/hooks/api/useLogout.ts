import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const logout = async () => {
  const result = await axios.delete(`${API_URL}/auth/logout`);

  return result.data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      axios.defaults.headers.Authorization = "";
      queryClient.resetQueries({ queryKey: [QueryKey.Session] });
    },
  });

  return {
    logout: mutate,
    isPending,
  };
};
