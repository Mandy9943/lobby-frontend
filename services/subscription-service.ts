import leadsApi from "./leads-api";

export interface Plan {
  name: string;
  price: number;
  emailsPerDay: number;
  gmailAccounts: number;
  stripePriceId: string | null;
}

export interface SubscriptionPlans {
  FREE: Plan;
  PRO: Plan;
  SCALE: Plan;
}

export const subscriptionService = {
  async getPlans() {
    const response = await leadsApi.get<SubscriptionPlans>(
      "/subscription/plans"
    );
    return response.data;
  },

  async createSubscription(priceId: string) {
    const response = await leadsApi.post<{ sessionId: string }>(
      "/subscription/create",
      { priceId }
    );
    return response.data;
  },

  async cancelSubscription() {
    const response = await leadsApi.post("/subscription/cancel");
    return response.data;
  },
};