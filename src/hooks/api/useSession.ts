import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { API_URL } from "@/utils/api";
import { QueryKey } from "@/utils/query";

export interface UserSession {
  id: number;
  username: string;
  email: string;
  role: string;
}

const fetchSession = async () => {
  console.log("fetching session");

  const result = await axios.get<
    { message: string; user: UserSession } | undefined
  >(`${API_URL}/auth/`);

  return result.data?.user;
};

export const useSession = () => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.Session],
    queryFn: () => fetchSession(),
    retry: 0,
  });

  return {
    session: data,
    isLoading,
  };
};
