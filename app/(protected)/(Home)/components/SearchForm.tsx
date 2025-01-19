import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function SearchForm({
  searchQuery,
  setSearchQuery,
  isLoading,
  onSubmit,
}: SearchFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div className="relative">
        <Input
          placeholder="(e.g., Manufacturing companies in New York)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-14 pl-5 pr-36 text-lg rounded-xl border-2 border-border focus:border-primary"
        />
        <Button
          type="submit"
          className="absolute right-2 top-2 h-10"
          disabled={isLoading || !searchQuery.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Find Companies
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
