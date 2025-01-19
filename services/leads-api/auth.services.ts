import { IUser } from "@/types/auth.types";
import leadsApi, { baseUrl } from ".";

export const signIn = async () => {
  window.location.href = `${baseUrl}/api/auth/google`;
};

export const signOut = async () => {
  await leadsApi.post("/auth/logout", null, {
    withCredentials: true,
  });
};

export const getUser = async () => {
  const res = await leadsApi.get<IUser>("/auth/me", {
    withCredentials: true,
  });
  return res.data;
};
