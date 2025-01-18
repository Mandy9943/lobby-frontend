import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, MessageSquareIcon, CalendarIcon } from 'lucide-react'

interface ResponderCardProps {
  responder: {
    name: string
    company: string
    jobTitle: string
    message: string
    campaign: string
    responseDate: string
    tags: string[]
    avatar: string
  }
}

export function ResponderCard({ responder }: ResponderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={responder.avatar} alt={responder.name} />
            <AvatarFallback>{responder.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{responder.name}</h3>
                <p className="text-sm text-muted-foreground">{responder.jobTitle} at {responder.company}</p>
              </div>
              <div className="text-sm text-muted-foreground">{responder.responseDate}</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {responder.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">Campaign: {responder.campaign}</p>
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between" size="sm">
                {isExpanded ? 'Hide message' : 'Show message'}
                {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <p className="text-sm">{responder.message}</p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm">
            <MessageSquareIcon className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Follow-up
          </Button>
          <Button variant="outline" size="sm">
            <CheckIcon className="h-4 w-4 mr-2" />
            Mark as Handled
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

