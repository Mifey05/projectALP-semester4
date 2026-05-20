import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "@/constants/api";

const API_URL =
  `${BASE_URL}/api/profile`;

export const updateProfile =
  async (data: any) => {

    const token =
      await AsyncStorage.getItem("token");

    const response =
      await axios.put(
        API_URL,
        data,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};

export const getProfile =
  async () => {

    const token =
      await AsyncStorage.getItem("token");

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};