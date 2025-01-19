'use client'

import { Search, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function EmailDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold">Emails</h1>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-background border-input"
          />
        </div>
        <Select defaultValue="all-time">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All time</SelectItem>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-statuses">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-statuses">All Statuses</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="clicked">Clicked</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-keys">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All API Keys" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-keys">All API Keys</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-purple-600 dark:text-purple-400"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <rect height="16" rx="2" width="20" x="2" y="4" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    {email.to}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={
                      email.status === 'Delivered' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    }
                  >
                    {email.status}
                  </Badge>
                </TableCell>
                <TableCell>{email.subject}</TableCell>
                <TableCell>{email.sent}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const emails = [
  {
    id: 1,
    to: 'cesrmartn@yahoo.es',
    status: 'Delivered',
    subject: 'Magic Link',
    sent: '2 months ago'
  },
  {
    id: 2,
    to: 'armandoc9943@gmail.com',
    status: 'Clicked',
    subject: 'Magic Link',
    sent: '2 months ago'
  },
  {
    id: 3,
    to: 'bucur.andrei.teodor@gmail.com',
    status: 'Clicked',
    subject: 'Magic Link',
    sent: '3 months ago'
  },
  {
    id: 4,
    to: 'armandoc9943@gmail.com',
    status: 'Clicked',
    subject: 'Magic Link',
    sent: '3 months ago'
  },
  {
    id: 5,
    to: 'bortomiklos7@gmail.com',
    status: 'Clicked',
    subject: 'Welcome to Dapfy ⚡️',
    sent: '3 months ago'
  },
  {
    id: 6,
    to: 'bucur.andrei.teodor@gmail.com',
    status: 'Clicked',
    subject: 'Magic Link',
    sent: '4 months ago'
  }
]

