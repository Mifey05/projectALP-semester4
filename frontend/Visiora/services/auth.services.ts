import axios from "axios";

import { BASE_URL } from "@/constants/api";

const API_URL =
  `${BASE_URL}/api/auth`;

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {

  const response = await axios.post(
    `${API_URL}/register`,
    {
      name,
      email,
      password,
    }
  );

  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
) => {

  const response = await axios.post(
    `${API_URL}/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};