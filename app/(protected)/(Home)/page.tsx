"use client";

import { searchLeads } from "@/services/leads-api/search-leads";
import { ScrapeResult } from "@/types/search-leads.types";
import { useState } from "react";
import { FeatureCards } from "./components/FeatureCards";
import { LoadingFacts } from "./components/LoadingFacts";
import { ResultsHeader } from "./components/ResultsHeader";
import { ResultsTable } from "./components/ResultsTable";
import { SearchForm } from "./components/SearchForm";
import { SearchSection } from "./components/SearchSection";

export default function EmailValidationTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<ScrapeResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await searchLeads(searchQuery);
    setResults(res.data);
    console.log(res);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setShowResults(true);
    setIsLoading(false);
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setSearchQuery("");
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

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <ResultsHeader />

      {/* Example tip area */}
      {showResults && (
        <div className="max-w-7xl mx-auto mt-6 px-4 text-sm text-muted-foreground">
          <p>
            Tip: Narrow your query for better results, like &quot;Tech startups
            in Berlin using AI.&quot;
          </p>
        </div>
      )}

      <ResultsTable results={results} onNewSearch={handleNewSearch} />
    </div>
  );
}
