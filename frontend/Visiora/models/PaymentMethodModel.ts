export interface PaymentMethodModel {
  id: number;
  name: string;
  accountNumber: string;
}

export const mapPaymentMethodData = (
  data: any
): PaymentMethodModel => {
  return {
    id: data?.id ?? null,
    name: data?.name ?? "",
    accountNumber: data?.account_number ?? "",
  };
};