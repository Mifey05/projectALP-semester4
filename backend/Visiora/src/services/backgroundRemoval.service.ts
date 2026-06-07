/**
 * Backend service untuk remove background dari gambar
 * Menggunakan remove.bg API
 */

import axios from "axios";
import FormData from "form-data";

const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;
const REMOVE_BG_API_URL = "https://api.remove.bg/v1.0/removebg";

export interface RemoveBgResult {
  url: string;
  outputFile?: Buffer;
}

/**
 * Remove background dari gambar menggunakan remove.bg API
 */
export const removeBackground = async (
  imageUrl: string
): Promise<RemoveBgResult> => {
  try {
    if (!REMOVE_BG_API_KEY) {
      throw new Error(
        "REMOVE_BG_API_KEY environment variable is not set"
      );
    }

    const formData = new FormData();

    formData.append("image_url", imageUrl);
    formData.append("size", "auto");

    const response = await axios.post(
      REMOVE_BG_API_URL,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-API-Key": REMOVE_BG_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const outputBuffer = Buffer.from(response.data);

    const base64 = outputBuffer.toString("base64");

    const dataUrl = `data:image/png;base64,${base64}`;

    return {
      url: dataUrl,
      outputFile: outputBuffer,
    };
  } catch (error: any) {
    console.error(
      "Remove background error:",
      error?.response?.data || error.message
    );

    throw new Error(
      `Failed to remove background: ${error.message}`
    );
  }
};

/**
 * Fallback jika remove.bg gagal
 */
export const removeBackgroundFallback = async (
  imageUrl: string
): Promise<RemoveBgResult> => {
  console.warn(
    "Using fallback background removal"
  );

  return {
    url: imageUrl,
  };
};