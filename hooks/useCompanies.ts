import { getCompanyProfile } from "@/services/leads-api/companies.services";
import useSWR from "swr";
import { useProject } from "./useProjects";

export const useGetCompanyProfile = () => {
  const { project } = useProject();
  const {
    data: fetchedProfile,
    error,
    isLoading,
    mutate,
  } = useSWR(project ? ["/company-profiles/", project.id] : null, () =>
    getCompanyProfile(project!.id)
  );

  return { fetchedProfile, error, isLoading, mutate };
};
