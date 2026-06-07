import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
});

async function main() {
    const imageBuffer = fs.readFileSync("./test-image.jpg");

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                inlineData: {
                    data: imageBuffer.toString("base64"),
                    mimeType: "image/png",
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

    console.log(response.text);
}

main().catch(console.error);