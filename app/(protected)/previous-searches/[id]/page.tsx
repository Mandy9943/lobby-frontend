"use client";

import { getPreviousSearchLeadsById } from "@/services/leads-api/search-leads";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import useSWR from "swr";

export default function SearchDetails({ params }: { params: { id: string } }) {
  const {
    data: search,
    error,
    isLoading,
  } = useSWR(`/api/search-leads/previous/${params.id}`, () =>
    getPreviousSearchLeadsById(params.id)
  );

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
        <p className="text-red-500">Error loading search details</p>
      </div>
    );
  }

  if (!search) {
    return (
      <div className="p-4">
        <p className="text-red-500">No search results found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8 bg-card p-6 rounded-lg border">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <div className="flex flex-col gap-2 text-muted-foreground">
          <p className="flex items-center">
            <span className="font-medium mr-2">Query:</span> {search?.query}
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2">Date:</span>
            {format(new Date(search?.createdAt), "PPp")}
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2">Results:</span>
            {search?.result?.data.length || 0} companies found
          </p>
        </div>
      </div>

      {search?.result ? (
        <div className="grid gap-6">
          {search?.result.data.map((company) => (
            <div
              key={company.domain}
              className="bg-card border rounded-xl p-6 space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {company.title}
                  </h2>
                  <a
                    href={`https://${company.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm inline-flex items-center"
                  >
                    {company.domain}
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>
              </div>

              {company.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {company.description}
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {company.email && company.email.length > 0 && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                      Email Contacts
                    </h3>
                    <div className="space-y-1">
                      {company.email.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="text-primary hover:underline block text-sm"
                        >
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {company.phone && company.phone.length > 0 && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide">
                      Phone Numbers
                    </h3>
                    <div className="space-y-1">
                      {company.phone.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="text-primary hover:underline block text-sm"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {Object.keys(company.social_links).length > 0 && (
                <div className="pt-2">
                  <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                    Social Profiles
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(company.social_links).map(
                      ([platform, urls]) =>
                        urls.map((url) => (
                          <a
                            key={url}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                          >
                            {platform}
                          </a>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p>No search results found</p>
        </div>
      )}
    </div>
  );
}
