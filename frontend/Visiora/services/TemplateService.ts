import { BASE_URL } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TemplateModel, mapTemplateData } from "../models/ListTemplate";

export interface ApiResponse {
  data: TemplateModel[];
}

export const fetchTemplates = async (category?: string): Promise<TemplateModel[]> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/template`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.data || !Array.isArray(result.data)) {
      return [];
    }

    const templates: TemplateModel[] = result.data.map((item: any) => mapTemplateData(item));
    return category
      ? templates.filter((item) => item.category === category)
      : templates;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
};

export const fetchTemplatesByCategory = async (category: string): Promise<TemplateModel[]> => {
  return fetchTemplates(category);
};

export const useTemplate = async (templateId: number): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/api/template/${templateId}/use`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error using template:", error);
    throw error;
  }
};