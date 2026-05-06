import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error("Cloudinary env variables missing");
}

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    });

    export const uploadImage = async (filePath: string) => {
    const result = await cloudinary.uploader.upload(filePath, {
        folder: "visiora", // optional
    });

    return {
        url: result.secure_url,
        public_id: result.public_id,
    };
};