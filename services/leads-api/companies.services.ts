import { CompanyProfile } from "@/types/company.types";
import leadsApi from ".";

export const getCompanyProfile = async (projectId: string) => {
  const res = await leadsApi.get<CompanyProfile>(
    `/company-profiles/${projectId}`
  );
  return res.data;
};

export const createOrUpdateCompanyProfile = async (
  projectId: string,
  data: Partial<CompanyProfile>
) => {
  const res = await leadsApi.post<CompanyProfile>(
    `/company-profiles/${projectId}`,
    data
  );
  return res.data;
};
