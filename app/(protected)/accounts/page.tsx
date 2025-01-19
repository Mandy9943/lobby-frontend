import { AccountCard } from '@/components/account-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon } from 'lucide-react'

const accounts = [
  { email: 'user@example.com', type: 'Free', dailyEmailsUsed: 20, dailyEmailsLimit: 50 },
  { email: 'premium@example.com', type: 'Paid', dailyEmailsUsed: 250, dailyEmailsLimit: 500, subscriptionStatus: 'Active', renewalDate: '2023-07-15' },
]

const plans = [
  { name: 'Free', dailyLimit: 50, price: '$0/month' },
  { name: 'Basic', dailyLimit: 500, price: '$49/month' },
  { name: 'Pro', dailyLimit: 1000, price: '$99/month' },
]

export default function Accounts() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Connected Accounts</h1>
        <Button style={{ backgroundColor: '#FF5D0A', color: 'white' }}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Account
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account, index) => (
          <AccountCard key={index} account={account} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Daily Email Limit</TableHead>
                <TableHead>Price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.name}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>{plan.dailyLimit}/day</TableCell>
                  <TableCell>{plan.price}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      style={plan.name !== 'Free' ? { color: '#FF5D0A', borderColor: '#FF5D0A' } : {}}
                    >
                      {plan.name === 'Free' ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing & Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Manage your subscription and billing information here. For any questions, please contact our support team.
          </p>
          <Button variant="outline">Manage Subscription</Button>
        </CardContent>
      </Card>
    </div>
  )
}

