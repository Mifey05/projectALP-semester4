export interface SubscriptionPlanModel {
  id: number;
  name: string;
  tier: string;
  price: number;
}

export const mapSubscriptionPlanData = (
  data: any
): SubscriptionPlanModel => {
  return {
    id: data?.plan_id ?? 0,
    name: data?.name ?? "",
    tier: data?.tier ?? "",
    price: data?.price ?? 0,
  };
};