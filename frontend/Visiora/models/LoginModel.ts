export interface LoginModel {
  email: string;
  password: string;
}

export const mapLoginData = (
  data: any
): LoginModel => {
  return {
    email: data?.email ?? "",
    password: data?.password ?? "",
  };
};