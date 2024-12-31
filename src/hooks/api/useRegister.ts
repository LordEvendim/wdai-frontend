import { useMutation } from "@tanstack/react-query";

import axios from "axios";
import { API_URL } from "@/utils/api";

interface FetchParams {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const register = async ({ username, password, email, role }: FetchParams) => {
  const result = await axios.post(`${API_URL}/auth/register`, {
    username,
    password,
    email,
    role,
  });

  return result.data;
};

export const useRegister = () => {
  //   const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      //   queryClient.resetQueries({ queryKey: [QueryKey.Session] });
    },
  });

  return {
    register: mutate,
    isPending,
  };
};
