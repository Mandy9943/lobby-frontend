import { SearchLeadsResponse } from "@/types/search-leads.types";
import leadsApi from ".";

export const searchLeads = async (query: string) => {
  const res = await leadsApi.post<SearchLeadsResponse>(
    `/search-leads`,
    {
      query,
    },
    {
      withCredentials: true,
    }
  );
  return res.data;
};
