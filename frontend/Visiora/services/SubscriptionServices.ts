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

  // TAMBAHAN METHOD INI
  async getCurrentSubscription(
    token: string
  ): Promise<CurrentSubscriptionModel | null> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/subscription/current`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 404) {
        // User belum punya langganan aktif
        return null;
      }

      if (!response.ok) {
        console.log("Fetch current subscription failed:", response.status);
        return null;
      }

      const result = await response.json();
      const data = result?.data ?? result;

      return mapCurrentSubscriptionData(data);
    } catch (error) {
      console.log("getCurrentSubscription error:", error);
      return null;
    }
  },
};