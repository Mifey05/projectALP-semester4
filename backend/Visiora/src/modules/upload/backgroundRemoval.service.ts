import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;
const REMOVE_BG_API_URL = "https://api.remove.bg/v1.0/removebg";

if (!REMOVE_BG_API_KEY) {
    throw new Error("REMOVE_BG_API_KEY is not defined");
}

export interface RemoveBgResult {
    dataUrl: string;
    buffer?: Buffer;
}

export const removeBackground = async (
    filePath: string
): Promise<RemoveBgResult> => {
    try {
        const formData = new FormData();

        formData.append("image_file", fs.createReadStream(filePath));
        formData.append("size", "auto");

        const response = await axios.post<ArrayBuffer>(
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

        const buffer = Buffer.from(response.data);
        const dataUrl = `data:image/png;base64,${buffer.toString("base64")}`;

        return {
            dataUrl,
            buffer,
        };
    } catch (error: unknown) {
        console.error("Remove background error:", error);

        const err = new Error("Background removal failed");
        (err as any).statusCode = 502;
        throw err;
    }
};