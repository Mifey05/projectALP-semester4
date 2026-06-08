import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    const err = new Error("Cloudinary env variables missing");
    (err as any).statusCode = 500;
    throw err;
}

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

export const uploadImage = async (filePath: string) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "visiora",
        });

        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } finally {
        await fs.unlink(filePath).catch(() => {});
    }
};

export const uploadElementImage = async (
    dataUrl: string
) => {
    const result = await cloudinary.uploader.upload(
        dataUrl,
        {
            folder: "visiora/elements",
            format: "png",
        }
    );

    return {
        url: result.secure_url,
        public_id: result.public_id,
    };
};