import { CompanyProfileDialog } from "@/components/company-profile-dialog";
import { Button } from "@/components/ui/button";

export function ResultsHeader() {
  return (
    <div className="flex-none p-4 md:p-6 border-b border-border">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <CompanyProfileDialog />
        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          Approve and Start Campaign
        </Button>
      </div>
    </div>
  );
}
