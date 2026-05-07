export interface RegisterModel {
  nama: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const mapRegisterData = (
  data: any
): RegisterModel => {
  return {
    nama: data?.nama ?? "",
    email: data?.email ?? "",
    password: data?.password ?? "",
    confirmPassword: data?.confirmPassword ?? "",
  };
};