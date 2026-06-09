import { BASE_URL } from "@/constants/api";

const API_URL = `${BASE_URL}/api/upload`;

/**
 * Upload background
 */
export const uploadDesignBackground = async (
  token: string,
  imageUri: string
): Promise<{
  url: string;
}> => {
  const formData = new FormData();

  const response = await fetch(imageUri);
  const blob = await response.blob();

  formData.append(
    "image",
    blob,
    "background.jpg"
  );

  const uploadResponse = await fetch(
    API_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    throw new Error(
      "Failed to upload background"
    );
  }

  return uploadResponse.json();
};

/**
 * Upload element
 * Backend otomatis remove background
 */
export const uploadDesignElement = async (
  token: string,
  imageUri: string
): Promise<{
  url: string;
}> => {
  const formData = new FormData();

  const response = await fetch(imageUri);
  const blob = await response.blob();

  formData.append(
    "image",
    blob,
    "element.jpg"
  );

  const uploadResponse = await fetch(
    `${API_URL}/element`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!uploadResponse.ok) {
    throw new Error(
      "Failed to upload element"
    );
  }

  return uploadResponse.json();
};