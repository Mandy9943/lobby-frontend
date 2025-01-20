"use client";

import { useAuth } from "@/hooks/useAuth";
import { searchLeads } from "@/services/leads-api/search-leads";
import { ScrapeResult, SearchLeadsResponse } from "@/types/search-leads.types";
import { useEffect, useState } from "react";
import { FeatureCards } from "./components/FeatureCards";
import { LoadingFacts } from "./components/LoadingFacts";
import { ResultsHeader } from "./components/ResultsHeader";
import { ResultsTable } from "./components/ResultsTable";
import { SearchForm } from "./components/SearchForm";
import { SearchSection } from "./components/SearchSection";

export default function EmailValidationTable() {
  const { user, loading: authLoading } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<ScrapeResult[]>([]);
  const localStorageKey = user ? `searchResponse_${user.email}` : null;
  const [searchResponse, setSearchResponse] =
    useState<SearchLeadsResponse | null>(null);

  useEffect(() => {
    if (!localStorageKey) return;

    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      try {
        const parsed: SearchLeadsResponse = JSON.parse(savedData);
        // Only restore if the user's email matches the one in localStorageKey
        // (But if you're storing separate keys per user, this is automatically guaranteed.)
        setSearchResponse(parsed);
        setResults(parsed.data);
        setShowResults(true);
      } catch (err) {
        console.error("Error parsing saved search response:", err);
      }
    }
  }, [localStorageKey]);

  useEffect(() => {
    if (searchResponse && localStorageKey) {
      localStorage.setItem(localStorageKey, JSON.stringify(searchResponse));
    }
  }, [searchResponse, localStorageKey]);

  if (authLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background p-4 md:p-6 mt-20">
        <LoadingFacts />
      </div>
    );
  }

  if (!user) {
    // If user is null, you can choose to redirect or
    // simply show an error message
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-center text-xl">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await searchLeads(searchQuery);
      setSearchResponse(res);
      setResults(res.data);
      setShowResults(true);
    } catch (err) {
      console.error("Error searching leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    // 4) Clear out all state and remove from localStorage for this user
    setShowResults(false);
    setSearchQuery("");
    setSearchResponse(null);
    setResults([]);
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
    if (searchResponse) {
      setResults(searchResponse.data);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background p-4 md:p-6 mt-20">
        <LoadingFacts />
      </div>
    );
  }

  if (!showResults) {
    return (
      <div className="flex flex-col min-h-screen bg-background p-4 md:p-6 mt-20">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          <SearchSection />
          <FeatureCards />
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isLoading={isLoading}
            onSubmit={handleSearch}
          />
        </div>
      </div>
    );
  }

  // Compute how many results have at least one email
  const resultsWithEmailCount = results.filter(
    (r) => r.email && r.email.length > 0
  ).length;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <ResultsHeader />
      {searchResponse && (
        <div className="max-w-7xl mx-auto mt-6 px-4 text-sm text-muted-foreground">
          <p>Query used: {searchResponse.query}</p>
          <p>Time taken (ms): {searchResponse.totalTimeMs}</p>
          <p>Results found: {searchResponse.data.length}</p>
          <p>Results containing at least one email: {resultsWithEmailCount}</p>
        </div>
      )}

      <ResultsTable
        results={results}
        onNewSearch={handleNewSearch}
        onDeleteRow={handleDeleteRow}
        onRestoreAll={handleRestoreAll}
      />
    </div>
  );
}
