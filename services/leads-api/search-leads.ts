import { SearchLeadsResponse } from "@/types/search-leads.types";
import leadsApi from ".";

export const searchLeads = async (query: string) => {
  const res = await leadsApi.post<SearchLeadsResponse>(`/search-leads`, {
    query,
  });
  return res.data;
};

export const createSearchLeadsJob = async (query: string) => {
  const res = await leadsApi.post<{ jobId: string }>(`/search-jobs`, {
    query,
  });
  return res.data;
};

export const getSearchJobStatus = async (jobId: string) => {
  const res = await leadsApi.get<{
    status: "pending" | "done" | "failed";
    result?: SearchLeadsResponse;
  }>(`/search-jobs/${jobId}/status`);
  return res.data;
};
