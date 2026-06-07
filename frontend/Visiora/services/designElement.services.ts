/**
 * Service untuk upload dan manage design elements
 * Supports:
 * - Background upload
 * - Image element upload dengan background removal
 * - Element management
 */

import { BASE_URL } from "@/constants/api";
import { DesignElement } from "@/models/EditDesainModel";

const API_URL = `${BASE_URL}/api/upload`;

/**
 * Upload image sebagai background design
 */
export const uploadDesignBackground = async (
  token: string,
  imageUri: string
): Promise<{
  url: string;
  type: "background";
  public_id: string;
}> => {
  const formData = new FormData();

  // Convert URI ke Blob
  const response = await fetch(imageUri);
  const blob = await response.blob();

  formData.append("image", blob, "background.jpg");

  const uploadResponse = await fetch(`${API_URL}/design/background`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload background");
  }

  return uploadResponse.json();
};

/**
 * Upload image sebagai element (makanan, benda, dll)
 * Otomatis mencoba remove background
 */
export const uploadDesignElement = async (
  token: string,
  imageUri: string
): Promise<{
  url: string;
  removedBgUrl: string | null;
  type: "element";
  public_id: string;
  success: boolean;
}> => {
  const formData = new FormData();

  // Convert URI ke Blob
  const response = await fetch(imageUri);
  const blob = await response.blob();

  formData.append("image", blob, "element.jpg");

  const uploadResponse = await fetch(`${API_URL}/design/element`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload element");
  }

  return uploadResponse.json();
};

/**
 * Upload dengan deteksi tipe gambar
 */
export const uploadWithDetection = async (
  token: string,
  imageUri: string,
  removeBackground: boolean = false
): Promise<{
  url: string;
  imageType: "background" | "object";
  originalUrl: string;
  public_id: string;
}> => {
  const formData = new FormData();

  // Convert URI ke Blob
  const response = await fetch(imageUri);
  const blob = await response.blob();

  formData.append("image", blob, "upload.jpg");

  const params = new URLSearchParams();
  if (removeBackground) {
    params.append("removeBackground", "true");
  }

  const uploadResponse = await fetch(
    `${API_URL}/with-detection?${params.toString()}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload with detection");
  }

  return uploadResponse.json();
};
