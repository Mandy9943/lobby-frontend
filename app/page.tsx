"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from 'lucide-react'
import { CompanyProfileDialog } from "@/components/company-profile-dialog"

export default function EmailValidationTable() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="flex-none p-4 md:p-6 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <CompanyProfileDialog />
          <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">Approve and Start Campaign</Button>
        </div>
      </div>
      
      <div className="flex-grow overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold">We found 20 companies</h1>
          
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border">
                    <TableHead className="text-muted-foreground">#</TableHead>
                    <TableHead className="text-muted-foreground">Name</TableHead>
                    <TableHead className="text-muted-foreground">URL</TableHead>
                    <TableHead className="text-muted-foreground">Description</TableHead>
                    <TableHead className="text-muted-foreground">Email address</TableHead>
                    <TableHead className="text-muted-foreground">Email text</TableHead>
                    <TableHead className="text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Perplexity</TableCell>
                    <TableCell><a href="https://www.perplexity.ai/" className="text-blue-400">https://www.perplexity.ai/</a></TableCell>
                    <TableCell className="text-sm max-w-xs">AI-powered search engine with a focus on delivering accurate and concise answers.</TableCell>
                    <TableCell>contact@perplexity.ai</TableCell>
                    <TableCell className="text-sm text-muted-foreground p-0">
                      <textarea
                        defaultValue="Hello Perplexity team, I'm impressed by your innovative approach to AI-powered search. Would you be open to discussing how we could potentially collaborate on enhancing user experience?"
                        className="w-full h-full min-h-[100px] bg-transparent text-muted-foreground text-sm p-2 border-0 focus:ring-0 resize-none"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-200">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>E2B.Dev</TableCell>
                    <TableCell><a href="https://e2b.dev" className="text-blue-400">https://e2b.dev</a></TableCell>
                    <TableCell className="text-sm max-w-xs">Platform for building and deploying AI agents with advanced development tools.</TableCell>
                    <TableCell>info@e2b.dev</TableCell>
                    <TableCell className="text-sm text-muted-foreground p-0">
                      <textarea
                        defaultValue="Hello E2B.Dev team, Your work on developer tools for AI agents is fascinating. I'd love to explore how we might integrate our solutions to streamline the development process. Would you be interested in a brief discussion?"
                        className="w-full h-full min-h-[100px] bg-transparent text-muted-foreground text-sm p-2 border-0 focus:ring-0 resize-none"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-200">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3</TableCell>
                    <TableCell>AgentOps</TableCell>
                    <TableCell><a href="https://www.agentops.ai/" className="text-blue-400">https://www.agentops.ai/</a></TableCell>
                    <TableCell className="text-sm max-w-xs">Provides infrastructure and tools for deploying, monitoring, and scaling AI agents.</TableCell>
                    <TableCell>hello@agentops.ai</TableCell>
                    <TableCell className="text-sm text-muted-foreground p-0">
                      <textarea
                        defaultValue="Hello AgentOps team, I've been following your progress in AI agent infrastructure. I believe our services could complement your offering. Would you be interested in a quick call to discuss potential synergies?"
                        className="w-full h-full min-h-[100px] bg-transparent text-muted-foreground text-sm p-2 border-0 focus:ring-0 resize-none"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-200">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

