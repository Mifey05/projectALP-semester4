import { PaymentMethodModel } from "../models/PaymentMethodModel";

export const PaymentService = {
  async getPaymentMethods(): Promise<PaymentMethodModel[]> {
    const providers = ["OVO", "GoPay", "Dana", "ShopeePay"];

    return providers.map((provider, index) => ({
      id: index + 1,
      name: provider,
      accountNumber: "-",
    }));
  },
};