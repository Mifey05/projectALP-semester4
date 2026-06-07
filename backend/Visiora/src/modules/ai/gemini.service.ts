import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

export const generateCaption = async (
    imageBase64: string,
    mimeType: string
) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                inlineData: {
                    data: imageBase64,
                    mimeType,
                },
            },
            {
                text: `
                You are a marketing caption generator.

                Analyze the uploaded image.

                If the image contains a promotional design, advertisement, product, service, business, event, or marketing material:
                - Generate ONE promotional caption in Indonesian.

                If the image is not promotional or marketing-related:
                - Return exactly:
                Gambar tidak mengandung materi promosi.

                Rules:
                - Return only the final result.
                - No explanations.
                - No markdown.
                - No headings.
                - No labels.
                `,
            },
        ],
    });
    const caption = response.text?.trim();

    if (!caption) {
        const err = new Error("Failed to generate caption");
        (err as any).statusCode = 503;
        throw err;
    }

    return caption;
};