import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./useAuth";

export const useProject = () => {
  const { user, error, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = searchParams.get("project");

  const changeProject = (projectId: string) => {
    router.push(`?project=${projectId}`);
  };

  let project;
  if (!projectId) {
    project = user?.projects?.[0];
  } else {
    project = user?.projects?.find((project) => project.id === projectId);
  }

  return { project, error, loading, changeProject };
};