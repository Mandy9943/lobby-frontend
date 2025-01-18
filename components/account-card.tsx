import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, Mail } from 'lucide-react'

interface AccountCardProps {
  account: {
    email: string
    type: 'Free' | 'Paid'
    dailyEmailsUsed: number
    dailyEmailsLimit: number
    subscriptionStatus?: string
    renewalDate?: string
  }
}

export function AccountCard({ account }: AccountCardProps) {
  const usagePercentage = (account.dailyEmailsUsed / account.dailyEmailsLimit) * 100

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {account.email}
        </CardTitle>
        <Badge variant={account.type === 'Paid' ? "default" : "secondary"}>
          {account.type}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{account.dailyEmailsUsed} of {account.dailyEmailsLimit}</div>
        <p className="text-xs text-muted-foreground">Daily emails used</p>
        <Progress
          value={usagePercentage}
          className={`mt-2 ${usagePercentage > 90 ? "bg-red-500" : ""}`}
        />
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Mail className="mr-2 h-4 w-4 text-[#FF5D0A]" />
          <span>You've sent {account.dailyEmailsUsed} of {account.dailyEmailsLimit} daily emails</span>
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
        {account.subscriptionStatus && (
          <div className="mt-2 text-sm text-muted-foreground">
            Status: {account.subscriptionStatus}
            {account.renewalDate && ` (Renews: ${account.renewalDate})`}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={account.type === 'Free' ? "default" : "secondary"}
          style={account.type === 'Free' ? { backgroundColor: '#FF5D0A', color: 'white' } : {}}
        >
          {account.type === 'Free' ? 'Upgrade Account' : 'Manage Subscription'}
        </Button>
      </CardFooter>
    </Card>
  )
}

