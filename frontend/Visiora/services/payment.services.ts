import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../constants/api";
import { PaymentMethodModel, mapPaymentMethodData, } from "../models/PaymentMethodModel";

export const PaymentService = {
  async getPaymentMethods(): Promise<PaymentMethodModel[]> {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/payment/methods`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error(`Fetch payment methods failed: ${response.status}`);
      }

      const result = await response.json();
      const methods = Array.isArray(result)
        ? result
        : result?.data ?? [];

      return methods.map(mapPaymentMethodData);
    } catch (error) {
      console.log("PaymentService.getPaymentMethods error:", error);
      const providers = ["OVO", "GoPay", "Dana", "ShopeePay"];
      return providers.map((provider, index) => ({
        id: index + 1,
        name: provider,
        accountNumber: "-",
      }));
    }
  },

  async createPayment(planId: number, provider: string) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/payment/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ plan_id: planId, provider }),
      });

      if (!response.ok) {
        throw new Error(`Create payment failed: ${response.status}`);
      }

      const result = await response.json();
      return result?.data ?? null;
    } catch (error) {
      console.log("PaymentService.createPayment error:", error);
      throw error;
    }
  },

  async getPaymentStatus(transactionId: number) {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/payment/status/${transactionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Get payment status failed: ${response.status}`);
      }

      const result = await response.json();
      return result?.data ?? null;
    } catch (error) {
      console.log("PaymentService.getPaymentStatus error:", error);
      throw error;
    }
  },
};