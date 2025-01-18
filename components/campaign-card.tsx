import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, ChevronRightIcon, CopyIcon, PauseIcon, PlayIcon, MonitorStopIcon as StopIcon } from 'lucide-react'

interface CampaignCardProps {
  campaign: {
    id: string
    name: string
    description: string
    status: 'Running' | 'Paused' | 'Completed'
    startDate: string
    nextFollowUp: string
    totalLeads: number
    emailsSent: number
    openRate: number
    replyRate: number
    conversions: number
    bounces: number
  }
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const statusColor = {
    Running: 'bg-green-500',
    Paused: 'bg-yellow-500',
    Completed: 'bg-blue-500'
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">{campaign.name}</CardTitle>
          <Badge className={`${statusColor[campaign.status]} text-white`}>
            {campaign.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <p className="text-sm text-muted-foreground mb-4">{campaign.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>Started: {campaign.startDate}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>Next follow-up: {campaign.nextFollowUp}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Emails Sent</span>
            <span className="font-semibold">{campaign.emailsSent}/{campaign.totalLeads}</span>
          </div>
          <Progress value={(campaign.emailsSent / campaign.totalLeads) * 100} className="h-2" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[
            { label: 'Open Rate', value: `${campaign.openRate}%` },
            { label: 'Reply Rate', value: `${campaign.replyRate}%` },
            { label: 'Conversions', value: campaign.conversions },
            { label: 'Bounces', value: campaign.bounces },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <div className="flex space-x-2">
          {campaign.status === 'Running' ? (
            <Button variant="outline" size="sm">
              <PauseIcon className="w-4 h-4 mr-2" />
              Pause
            </Button>
          ) : campaign.status === 'Paused' ? (
            <Button variant="outline" size="sm">
              <PlayIcon className="w-4 h-4 mr-2" />
              Resume
            </Button>
          ) : null}
          {campaign.status !== 'Completed' && (
            <Button variant="outline" size="sm">
              <StopIcon className="w-4 h-4 mr-2" />
              End
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <CopyIcon className="w-4 h-4 mr-2" />
            Duplicate
          </Button>
          <Button variant="outline" size="sm">
            View Stats
            <ChevronRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

