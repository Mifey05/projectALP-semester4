import { BASE_URL } from "../constants/api";
import {SubscriptionPlanModel, mapSubscriptionPlanData, } from "../models/SubscriptionPlanModel";

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

  async getSubscriptionTier(
    token: string
  ): Promise<string> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/subscription/tier`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log("Fetch subscription tier failed:", response.status);
        return "Free";
      }

      const result = await response.json();
      return result?.data?.tier ?? "Free";
    } catch (error) {
      console.log("SubscriptionService error:", error);
      return "Free";
    }
  },
};