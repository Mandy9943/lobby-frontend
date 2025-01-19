'use client'

import { useState } from 'react'
import { ResponderCard } from '@/components/responder-card'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from 'lucide-react'

const responders = [
  {
    name: "John Doe",
    company: "Acme Corp",
    jobTitle: "Marketing Manager",
    message: "Thanks for reaching out. I'm interested in learning more about your product. Can we schedule a demo next week?",
    campaign: "Summer Outreach",
    responseDate: "2023-06-15 14:30",
    tags: ["Warm Lead", "Interested"],
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Jane Smith",
    company: "Globex",
    jobTitle: "CTO",
    message: "Your product looks interesting, but we're currently using a competitor's solution. What makes your offering unique?",
    campaign: "New Product Launch",
    responseDate: "2023-06-14 09:15",
    tags: ["Needs Pricing", "Competitor User"],
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    name: "Mike Johnson",
    company: "TechCorp",
    jobTitle: "Sales Director",
    message: "This sounds promising. Please send more details about your enterprise pricing and integration capabilities.",
    campaign: "Q2 Newsletter",
    responseDate: "2023-06-13 16:45",
    tags: ["Enterprise", "Pricing Request"],
    avatar: "/placeholder.svg?height=40&width=40"
  }
]

export default function Responders() {
  const [searchTerm, setSearchTerm] = useState('')
  const [campaignFilter, setCampaignFilter] = useState('All')

  const filteredResponders = responders.filter(responder => 
    (responder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     responder.company.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (campaignFilter === 'All' || responder.campaign === campaignFilter)
  )

  const uniqueCampaigns = ['All', ...new Set(responders.map(r => r.campaign))]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Responders</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={campaignFilter} onValueChange={setCampaignFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by campaign" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCampaigns.map((campaign) => (
              <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResponders.map((responder, index) => (
          <ResponderCard key={index} responder={responder} />
        ))}
      </div>

      {filteredResponders.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No responders found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}

