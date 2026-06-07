
import { BASE_URL } from "@/constants/api";

const API_URL = `${BASE_URL}/api/upload`;

export const uploadDesignBackground = async (
  token: string,
  imageUri: string
) => {
  const formData = new FormData();

  formData.append("image", {
    uri: imageUri,
    name: "background.jpg",
    type: "image/jpeg",
  } as any);
  
  console.log(
  "BACKGROUND API URL",
  `${API_URL}/design/background`
);
  const response = await fetch(
    `${API_URL}/design/background`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  console.log("BACKGROUND RESPONSE", data);

  if (!response.ok) {
    throw new Error(
      data?.message || "Upload background gagal"
    );
  }

  return data;
};

export const uploadDesignElement = async (
  token: string,
  imageUri: string
) => {
  const formData = new FormData();

  formData.append("image", {
    uri: imageUri,
    name: "element.jpg",
    type: "image/jpeg",
  } as any);

  const response = await fetch(
    `${API_URL}/design/element`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const data = await response.json();

  console.log("ELEMENT RESPONSE", data);

  if (!response.ok) {
    throw new Error(
      data?.message || "Upload element gagal"
    );
  }

  return data;
};

