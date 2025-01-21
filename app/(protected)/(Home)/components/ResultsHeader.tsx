import { Button } from "@/components/ui/button";
import { useGetCompanyProfile } from "@/hooks/useCompanies";
import dynamic from "next/dynamic";
import { useState } from "react";

const CompanyProfileDialog = dynamic(
  () => import("@/components/company-profile-dialog"),
  { ssr: false }
);

export function ResultsHeader({
  shouldApprove = true,
}: {
  shouldApprove?: boolean;
}) {
  const { fetchedProfile } = useGetCompanyProfile();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center w-full px-4   border-b border-border">
      <div className="w-full max-w-7xl h-[65px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Your Company Profile
        </Button>
        {open && <CompanyProfileDialog open={open} setOpen={setOpen} />}

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
