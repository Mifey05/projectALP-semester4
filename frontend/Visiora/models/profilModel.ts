export interface ProfileModel {
  name: string;
  email: string;
  address: string;
  enterpriseName: string;
  enterpriseType: string;
  tiktok: string;
  instagram: string;
  whatsapp: string;
}

export const mapProfileData = (data: any): ProfileModel => {
  return {
    name: data?.name ?? "",
    email: data?.email ?? null,
    address: data?.address ?? "",
    enterpriseName: data?.enterprise_name ?? "",
    enterpriseType: data?.enterprise_type ?? "",
    tiktok: data?.tiktok ?? "",
    instagram: data?.instagram ?? "",
    whatsapp: data?.whatsapp ?? "",
  };
};