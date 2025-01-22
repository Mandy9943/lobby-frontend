"use client";

import { AccountCard } from "@/components/account-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  subscriptionService,
  type SubscriptionPlans,
} from "@/services/subscription-service";
import { loadStripe } from "@stripe/stripe-js";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const accounts = [
  {
    email: "user@example.com",
    type: "Free" as const,
    dailyEmailsUsed: 20,
    dailyEmailsLimit: 50,
  },
];

export default function Accounts() {
  const [plans, setPlans] = useState<SubscriptionPlans | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  console.log(user);

  const loadPlans = useCallback(async () => {
    try {
      const plansData = await subscriptionService.getPlans();
      setPlans(plansData);
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to load subscription plans",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleUpgrade = async (priceId: string) => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe not loaded");

      const { sessionId } = await subscriptionService.createSubscription(
        priceId
      );

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw new Error(error.message);
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to process subscription",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      setLoading(true);
      await subscriptionService.cancelSubscription();
      toast({
        title: "Success",
        description: "Your subscription has been cancelled",
      });
    } catch (error: unknown) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Connected Accounts</h1>
        <Button style={{ backgroundColor: "#FF5D0A", color: "white" }}>
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
              {plans &&
                Object.entries(plans).map(([, plan]) => (
                  <TableRow key={plan.name}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.emailsPerDay}/day</TableCell>
                    <TableCell>${plan.price}/month</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={
                          loading ||
                          (user?.subscription?.plan?.toLowerCase() ||
                            "free") === plan.name.toLowerCase()
                        }
                        style={
                          plan.name !== "Free"
                            ? { color: "#FF5D0A", borderColor: "#FF5D0A" }
                            : {}
                        }
                        onClick={() =>
                          plan.stripePriceId
                            ? handleUpgrade(plan.stripePriceId)
                            : null
                        }
                      >
                        {loading
                          ? "Processing..."
                          : (user?.subscription?.plan?.toLowerCase() ||
                              "free") === plan.name.toLowerCase()
                          ? "Current Plan"
                          : "Upgrade"}
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
            Manage your subscription and billing information here. For any
            questions, please contact our support team.
          </p>
          <Button variant="outline" disabled={loading} onClick={handleCancel}>
            {loading ? "Processing..." : "Cancel Subscription"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
