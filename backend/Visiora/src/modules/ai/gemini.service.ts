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

export const generateDesign = async (
    prompt: string
) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        You are a social media design generator.

        Generate a design JSON for a 1080x1080 marketing poster.

        Return ONLY valid JSON.

        Schema:
        {
            "canvasBg": "#FFFFFF",
            "elements": [
                {
                "id": 1,
                "type": "text",
                "text": "PROMO",
                "color": "#000000",
                "x": 100,
                "y": 100,
                "width": 300,
                "height": 80
                }
            ]
        }

        Allowed element types:
        - text
        - emoji
        - square
        - circle
        - star
        - line

        For text:
        {
        "type": "text",
        "text": "...",
        "color": "#000000",
        "fontFamily": "System",
        "x": 100,
        "y": 100
        }

        For emoji:
        {
        "type": "emoji",
        "emoji": "🔥",
        "x": 100,
        "y": 100
        }

        For shapes:
        {
        "type": "square",
        "color": "#FF0000",
        "x": 50,
        "y": 50,
        "width": 200,
        "height": 80
        }

        Rules:
        - Maximum 10 elements
        - Do not generate image elements
        - x and y must be between 0 and 1080
        - Use Indonesian marketing language
        - Return JSON only
        - No markdown
        - No explanations
        - No code fences

        User prompt:
        ${prompt}
        `,
    });

    const result = response.text?.trim();

    if (!result) {
        const err = new Error("Failed to generate design");
        (err as any).statusCode = 503;
        throw err;
    }

    try {
        const design = JSON.parse(result);

        if (
            !design ||
            typeof design !== "object" ||
            !Array.isArray(design.elements)
        ) {
            throw new Error();
        }

        return design;
    } catch {
        const err = new Error(
            "Gemini returned invalid design JSON"
        );
        (err as any).statusCode = 502;
        throw err;
    }
};