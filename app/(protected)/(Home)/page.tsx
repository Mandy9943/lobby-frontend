"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  createSearchLeadsJob,
  getSearchJobStatus,
} from "@/services/leads-api/search-leads";
import { ScrapeResult } from "@/types/search-leads.types";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { FeatureCards } from "./components/FeatureCards";
import { LoadingFacts } from "./components/LoadingFacts";
import { ResultsHeader } from "./components/ResultsHeader";
import { ResultsTable } from "./components/ResultsTable";
import { SearchForm } from "./components/SearchForm";
import { SearchSection } from "./components/SearchSection";

export default function EmailValidationTable() {
  const { user } = useAuth();
  const localStorageKey = user ? `searchJob_${user.email}` : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "pending" | "done" | "failed"
  >("idle");

  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const originalResults = useRef<ScrapeResult[]>([]);

  // Load saved job state on mount
  useEffect(() => {
    if (!localStorageKey) return;

    const savedState = localStorage.getItem(localStorageKey);
    console.log("savedState", savedState);

    if (savedState) {
      try {
        const { jobId: savedJobId, query } = JSON.parse(savedState);
        setJobId(savedJobId);
        setSearchQuery(query);
        console.log("savedJobId", savedJobId);

        setSearchStatus("pending"); // Assume it's still pending until we check
      } catch (err) {
        console.error("Error parsing saved job state:", err);
      }
    }
  }, [localStorageKey]);

  // SWR-based re-validation/polling for job status
  const { data: statusData, error: statusError } = useSWR(
    jobId && searchStatus !== "done" && searchStatus !== "failed"
      ? `/api/search-jobs/${jobId}/status`
      : null,
    () => getSearchJobStatus(jobId!),
    {
      refreshInterval: 3000, // Poll every 3 seconds
    }
  );

  // Whenever we get new statusData, update state accordingly
  useEffect(() => {
    if (!statusData) return;
    if (statusData.status === "done") {
      setSearchStatus("done");
      setResults(statusData.result?.data || []);
      originalResults.current = statusData.result?.data || [];
    } else if (statusData.status === "failed") {
      setSearchStatus("failed");
      setError(statusData.result?.message || "Search failed");
      if (localStorageKey) localStorage.removeItem(localStorageKey);
    }
  }, [statusData, localStorageKey]);

  // Handle case where the fetch itself failed (statusError)
  useEffect(() => {
    if (statusError) {
      setSearchStatus("failed");
      setError("Failed to check search status");
    }
  }, [statusError]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchStatus("pending");
    setError(null);

    try {
      const { jobId: newJobId } = await createSearchLeadsJob(searchQuery);
      setJobId(newJobId);

      // Save job info to localStorage
      if (localStorageKey) {
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            jobId: newJobId,
            query: searchQuery,
          })
        );
      }
    } catch (err) {
      console.error("Error starting search:", err);
      setSearchStatus("failed");
      setError("Failed to start search");
    }
  };

  const handleNewSearch = () => {
    setSearchStatus("idle");
    setSearchQuery("");
    setJobId(null);
    setResults([]);
    setError(null);
    if (localStorageKey) {
      localStorage.removeItem(localStorageKey);
    }
  };

  // Allows removing a single row by its domain
  const handleDeleteRow = (domain: string) => {
    setResults((prevResults) => prevResults.filter((r) => r.domain !== domain));
  };

  // Restores all data from the original searchResponse
  const handleRestoreAll = () => {
    console.log("handleRestoreAll", statusData);

    if (originalResults.current) {
      setResults(originalResults.current);
    }
  };

  if (searchStatus === "pending") {
    return (
      <div>
        <ResultsHeader shouldApprove={false} />
        <div className="flex flex-col min-h-screen bg-background p-4 md:p-6 mt-20">
          <LoadingFacts />
          <p className="text-center mt-4">Checking on your results...</p>
        </div>
      </div>
    );
  }

  if (searchStatus === "failed") {
    return (
      <div className="flex flex-col min-h-screen bg-background p-4 md:p-6 mt-20">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            <p>Error: {error}</p>
            <button
              onClick={handleNewSearch}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (searchStatus === "done") {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground">
        <ResultsHeader />
        <div className="max-w-7xl mx-auto mt-6 px-4 text-sm text-muted-foreground">
          <p>Query used: {searchQuery}</p>
          <p>
            Results with email:{" "}
            {results.filter((r) => r.email && r.email.length > 0).length}
          </p>
        </div>

        <ResultsTable
          results={results}
          onNewSearch={handleNewSearch}
          onDeleteRow={handleDeleteRow}
          onRestoreAll={handleRestoreAll}
        />
      </div>
    );
  }

  // Default view (searchStatus === "idle")

  return (
    <div className="flex flex-col min-h-screen bg-background p-4 md:p-6 mt-20">
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <SearchSection />
        <FeatureCards />
        <SearchForm
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={false}
          onSubmit={handleSearch}
        />
      </div>
    </div>
  );
}
