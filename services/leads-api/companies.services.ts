import { CompanyProfile } from "@/types/company.types";
import leadsApi from ".";

export const getCompanyProfile = async (projectId: string) => {
  const res = await leadsApi.get<CompanyProfile>(`/companies/${projectId}`);
  return res.data;
};

export const createOrUpdateCompanyProfile = async (
  projectId: string,
  data: Partial<CompanyProfile>
) => {
  const res = await leadsApi.post<CompanyProfile>(
    `/companies/${projectId}`,
    data
  );
  return res.data;
};
