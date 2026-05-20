import { SubscriptionPlanModel, mapSubscriptionPlanData } from "../models/SubscriptionPlanModel";

const BASE_URL = "http://172.20.10.14:3000";
//tarik dari constants

export const SubscriptionService = {
  async getSubscriptionPlans(token: string): Promise<SubscriptionPlanModel[]> {
    try {
      const response = await fetch(`${BASE_URL}/subscription/plans`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const json = await response.json();

      return Array.isArray(json)
        ? json.map(mapSubscriptionPlanData)
        : [];
    } catch (error) {
      console.error("SubscriptionService error:", error);
      throw error;
    }
  },
};