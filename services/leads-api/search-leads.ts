import {
  SearchJobResponse,
  SearchLeadsResponse,
} from "@/types/search-leads.types";
import leadsApi from ".";

export const searchLeads = async (query: string) => {
  const res = await leadsApi.post<SearchLeadsResponse>(`/search-leads`, {
    query,
  });
  return res.data;
};

export const createSearchLeadsJob = async (query: string, page: number = 1) => {
  const res = await leadsApi.post<{ jobId: string }>(`/search-jobs`, {
    query,
    page,
  });
  return res.data;
};

export const getSearchJobStatus = async (jobId: string) => {
  const res = await leadsApi.get<{
    status: "pending" | "done" | "failed";
    result?: SearchLeadsResponse;
  }>(`/search-jobs/status/${jobId}`);
  return res.data;
};

export const getPreviousSearchLeads = async () => {
  const res = await leadsApi.get<
    {
      query: string;
      resultsCount: number;
      id: string;
      status: string;
      date: Date;
    }[]
  >(`/search-jobs/previous`);
  return res.data;
};

export const getPreviousSearchLeadsById = async (id: string) => {
  const res = await leadsApi.get<SearchJobResponse>(
    `/search-jobs/previous/${id}`
  );
  return res.data;
};
