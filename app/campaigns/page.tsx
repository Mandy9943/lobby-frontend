'use client'

import { useState } from 'react'
import { CampaignCard } from '@/components/campaign-card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusIcon, SearchIcon } from 'lucide-react'

const campaigns = [
  {
    id: '1',
    name: 'Summer Outreach',
    description: 'Targeting potential clients for our new summer product line.',
    status: 'Running',
    startDate: '2023-06-01',
    nextFollowUp: '2023-06-15',
    totalLeads: 1000,
    emailsSent: 750,
    openRate: 35,
    replyRate: 12,
    conversions: 25,
    bounces: 15,
  },
  {
    id: '2',
    name: 'New Product Launch',
    description: 'Introducing our latest innovation to existing customers.',
    status: 'Paused',
    startDate: '2023-05-15',
    nextFollowUp: '2023-06-10',
    totalLeads: 5000,
    emailsSent: 2500,
    openRate: 42,
    replyRate: 18,
    conversions: 75,
    bounces: 50,
  },
  {
    id: '3',
    name: 'Q2 Newsletter',
    description: 'Quarterly update for all subscribers.',
    status: 'Completed',
    startDate: '2023-04-01',
    nextFollowUp: 'N/A',
    totalLeads: 10000,
    emailsSent: 10000,
    openRate: 38,
    replyRate: 5,
    conversions: 150,
    bounces: 200,
  },
] as const

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'All' || campaign.status === statusFilter)
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            <SelectItem value="Running">Running</SelectItem>
            <SelectItem value="Paused">Paused</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No campaigns found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}

