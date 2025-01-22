import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, Mail } from "lucide-react";

interface AccountCardProps {
  account: {
    email: string;
    type: "Free" | "Paid";
    dailyEmailsUsed: number;
    dailyEmailsLimit: number;
    subscriptionStatus?: string;
    renewalDate?: string;
  };
}

export function AccountCard({ account }: AccountCardProps) {
  const usagePercentage =
    (account.dailyEmailsUsed / account.dailyEmailsLimit) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{account.email}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {account.dailyEmailsUsed} of {account.dailyEmailsLimit}
        </div>
        <p className="text-xs text-muted-foreground">Daily emails used</p>
        <Progress
          value={usagePercentage}
          className={`mt-2 ${usagePercentage > 90 ? "bg-red-500" : ""}`}
        />
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Mail className="mr-2 h-4 w-4 text-[#FF5D0A]" />
          <span>
            You&apos;ve sent {account.dailyEmailsUsed} of{" "}
            {account.dailyEmailsLimit} daily emails
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="ml-2 h-4 w-4 text-[#FF5D0A] cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Current plan allows up to {account.dailyEmailsLimit}/day.</p>
                <p>Maximum is 500/day per Gmail account.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
