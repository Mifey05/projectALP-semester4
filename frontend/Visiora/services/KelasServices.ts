import { BASE_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KelasModel, mapKelasData } from "../models/KelasModel";

export const CourseService = {
  async getCourses(): Promise<KelasModel[]> {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch courses (${response.status}): ${errorText}`
      );
    }

    const json = await response.json();
    if (!json.data || !Array.isArray(json.data)) {
      return [];
    }
    return json.data.map((item: any) => mapKelasData(item));
  },

  async getCourseById(id: number) {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/api/courses/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch course detail (${response.status}): ${errorText}`
      );
    }

    const json = await response.json();
    return json.data;
  },
};