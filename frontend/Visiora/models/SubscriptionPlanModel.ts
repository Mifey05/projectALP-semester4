export interface SubscriptionPlanModel {
  id: number;
  name: string;
  tier: string;
}

export const mapSubscriptionPlanData = (
  data: any
): SubscriptionPlanModel => {
  return {
    id: data?.plan_id ?? 0,
    name: data?.name ?? "",
    tier: data?.tier ?? "",
  };
};