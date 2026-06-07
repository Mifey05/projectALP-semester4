import { BASE_URL } from "../constants/api";
import { SubscriptionPlanModel, mapSubscriptionPlanData } from "../models/SubscriptionPlanModel";
import { CurrentSubscriptionModel, mapCurrentSubscriptionData } from "../models/SubscriptionCurrentModel";

export const SubscriptionService = {
  async getSubscriptionPlans(
    token: string
  ): Promise<SubscriptionPlanModel[]> {
    try {
      const response = await fetch(
         `${BASE_URL}/api/subscription/plans`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Fetch plans failed:", response.status);
        return [];
      }

      const result = await response.json();
      const plans = Array.isArray(result)
        ? result
        : result?.data ?? [];

      return plans.map(mapSubscriptionPlanData);
    } catch (error) {
      console.log("SubscriptionService error:", error);
      return [];
    }
  },
};