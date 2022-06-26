import { useQuery } from "react-query";
import { fetchData } from "../plugins/fetcher";

export const useMemberData = (id: string | undefined) => {
  return useQuery<any, Error>([`http://localhost:4000/member/`, id], fetchData);
};
