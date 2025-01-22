export interface SubscriptionStatus {
  id: string;
  status: "ACTIVE" | "CANCELED" | "PAST_DUE" | "UNPAID" | "TRIAL";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  plan: "FREE" | "PRO" | "SCALE";
}

export interface CreateSubscriptionResponse {
  subscriptionId: string;
  clientSecret: string;
}
