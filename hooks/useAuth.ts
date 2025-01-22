"use client";

import { getUser, signIn, signOut } from "@/services/leads-api/auth.services";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  projects?: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    gmailAccounts: string[];
  }[];

  subscription?: {
    plan: string;
    currentPeriodEnd: string;
    status: string;
    id: string;
  };
}

export function useAuth() {
  const router = useRouter();
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
    getUser,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Don't retry on 401 Unauthorized
        if (error.status === 401) return;

        // Retry up to 3 times for other errors
        if (retryCount >= 3) return;

        // Retry after 5 seconds
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  const logout = async () => {
    await signOut();
    await mutate(undefined); // Clear the user data in SWR cache
    router.push("/login");
  };

  return {
    user: user || null,
    loading: isLoading,
    error,
    login: signIn,
    logout,
  };
}
