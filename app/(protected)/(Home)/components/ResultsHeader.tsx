import { CompanyProfileDialog } from "@/components/company-profile-dialog";
import { Button } from "@/components/ui/button";
import { useGetCompanyProfile } from "@/hooks/useCompanies";

export function ResultsHeader({
  shouldApprove = true,
}: {
  shouldApprove?: boolean;
}) {
  const { fetchedProfile } = useGetCompanyProfile();
  console.log(fetchedProfile);

  return (
    <div className="flex items-center w-full px-4  h-[65px] border-b border-border">
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <CompanyProfileDialog />

        {shouldApprove && (
          <Button
            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            disabled={!fetchedProfile}
          >
            Approve and Start Campaign
          </Button>
        )}
      </div>
    </div>
  );
}
