'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Triangle } from 'lucide-react'

const integrations = [
  {
    name: "Cal.com",
    description: "Integrate your Cal.com account to schedule your meetings.",
    icon: Zap,
    iconColor: "text-emerald-500",
    buttonText: "Connect to Cal.com",
    buttonAction: () => console.log("Connect to Cal.com clicked")
  },
  {
    name: "Telegram",
    description: "Connect your Telegram account to receive notifications",
    icon: Triangle,
    iconColor: "text-white",
    buttonText: "Go to Telegram Integration",
    buttonAction: () => console.log("Go to Telegram Integration clicked")
  }
]

export default function Integrations() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-4">
      {integrations.map((integration) => (
        <Card key={integration.name} className="border border-border/40 bg-card">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`${integration.iconColor}`}>
                <integration.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{integration.name}</h2>
                  <p className="text-muted-foreground mt-1">{integration.description}</p>
                </div>
                <Button 
                  variant="secondary" 
                  className="bg-secondary/50 hover:bg-secondary"
                  onClick={integration.buttonAction}
                >
                  {integration.buttonText}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

