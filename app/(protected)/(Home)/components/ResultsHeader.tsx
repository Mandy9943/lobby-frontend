import { Button } from "@/components/ui/button";
import { useGetCompanyProfile } from "@/hooks/useCompanies";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AICustomizationDialog } from "./AiCustomizationDialog";

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <div className="flex items-center w-full px-4   border-b border-border">
      <div className="w-full max-w-7xl h-[65px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => setProfileOpen(true)}>
            Your Company Profile
          </Button>
          <Button variant="outline" onClick={() => setAiOpen(true)}>
            Customize AI Writer
          </Button>
        </div>
        {profileOpen && (
          <CompanyProfileDialog open={profileOpen} setOpen={setProfileOpen} />
        )}
        <AICustomizationDialog open={aiOpen} setOpen={setAiOpen} />

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
