"use client";

import { getPreviousSearchLeads } from "@/services/leads-api/search-leads";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

export default function PreviousSearches() {
  const {
    data: previousSearches,
    error,
    isLoading,
  } = useSWR("/api/search-leads/previous", getPreviousSearchLeads);
  console.log(previousSearches);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading previous searches</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Previous Searches</h1>
      <div className="grid gap-4">
        {previousSearches?.map((search) => (
          <div
            key={search.id}
            className="border rounded-lg p-4 hover:bg-accent transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold">Query: {search.query}</h2>
                <p className="text-sm text-muted-foreground">
                  Results: {search.resultsCount} domains
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {format(new Date(search.date), "PPp")}
                </p>
              </div>
              <Link
                href={`/previous-searches/${
                  search.id
                }?query=${encodeURIComponent(search.query)}`}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                View Results
              </Link>
            </div>
          </div>
        ))}
        {previousSearches?.length === 0 && (
          <p className="text-center text-muted-foreground">
            No previous searches found
          </p>
        )}
      </div>
    </div>
  );
}
