export interface CurrentSubscriptionModel {
  planId: number;
  name: string;
  tier: string;
  price: number;
}

export const mapCurrentSubscriptionData = (
  data: any
): CurrentSubscriptionModel => {
  return {
    planId: data?.plan_id ?? 0,
    name: data?.name ?? "",
    tier: data?.tier ?? "",
    price: data?.price ?? 0,
  };
};