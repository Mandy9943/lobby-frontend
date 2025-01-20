import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchLeadsResponse } from "@/types/search-leads.types";
import { ArrowLeft, Share2, Trash2 } from "lucide-react";
import { socialIcons } from "./socialIcons";

interface ResultsTableProps {
  results: SearchLeadsResponse["data"];
  onNewSearch: () => void;
  onDeleteRow: (domain: string) => void;
  onRestoreAll: () => void;
}

export function ResultsTable({
  results,
  onNewSearch,
  onDeleteRow,
  onRestoreAll,
}: ResultsTableProps) {
  return (
    <div className="flex-grow overflow-auto p-4 md:p-6 fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">
          {results.length
            ? `We found ${results.length} companies`
            : "No results found"}
        </h1>

        {results.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Try refining your search.
            </p>
            <Button variant="outline" onClick={onNewSearch}>
              New Search
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="text-muted-foreground">#</TableHead>
                    <TableHead className="text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="text-muted-foreground">URL</TableHead>
                    <TableHead className="text-muted-foreground">
                      Description
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Email
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Socials
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result, index) => (
                    <ResultRow
                      key={result.domain}
                      index={index + 1}
                      result={result}
                      onDeleteRow={onDeleteRow}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-8 gap-2">
          <Button onClick={onRestoreAll} variant="outline">
            Restore All
          </Button>
          <Button onClick={onNewSearch} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            New Search
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ResultRowProps {
  index: number;
  result: SearchLeadsResponse["data"][0];
  onDeleteRow: (domain: string) => void;
}

function ResultRow({ index, result, onDeleteRow }: ResultRowProps) {
  const socialLinks = Object.entries(result.social_links || {}).filter(
    ([, urls]) => urls && urls.length > 0
  );
  const hasSocials = socialLinks.length > 0;

  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell className="max-w-[200px]">
        <div className="truncate" title={result.title || result.domain}>
          {result.title || result.domain}
        </div>
      </TableCell>
      <TableCell className="max-w-[200px]">
        <a
          href={`https://${result.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline truncate block"
          title={result.domain}
        >
          {result.domain}
        </a>
      </TableCell>
      <TableCell className="max-w-[300px]">
        <div className="truncate" title={result.description}>
          {result.description}
        </div>
      </TableCell>
      <TableCell>
        {result.email?.[0] && (
          <a
            href={`mailto:${result.email[0]}`}
            className="text-blue-400 hover:underline"
          >
            {result.email[0]}
          </a>
        )}
      </TableCell>
      <TableCell>
        {hasSocials ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {socialLinks.length} platforms
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid grid-cols-2 gap-2">
                {socialLinks.map(([platform, urls]) => (
                  <a
                    key={platform}
                    href={urls[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent"
                  >
                    {socialIcons[platform as keyof typeof socialIcons]}
                    <span className="capitalize">{platform}</span>
                  </a>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <span className="text-muted-foreground text-sm">
            No socials found
          </span>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-200"
          onClick={() => onDeleteRow(result.domain)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
