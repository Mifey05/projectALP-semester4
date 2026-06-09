import * as designRepo from "./design.repository.js";
import * as designMapper from "./design.mapper.js";
import * as geminiService from "../ai/gemini.service.js";

type Category = "FnB" | "Fashion" | "Beauty" | "Agribusiness" | "Automotive" | "Trading" | "Processing Industry" | "Agriculture" | "Plantation" | "Farm" | "Fishery" | "Service" | "Other";

export const createDesign = async (
    userId: number,
    data: {
        template_id: number;
        title: string;
        category: Category;
        thumbnail_url: string;
        design_json: unknown;
        caption: string;
    }
) => {
    const designId = await designRepo.create({
        user_id: userId,
        template_id: data.template_id,
        title: data.title,
        category: data.category,
        thumbnail_url: data.thumbnail_url,
        design_json: data.design_json,
        caption: data.caption,
        is_active: true,
    });

    return {
        design_id: designId,
        message: "Design created successfully",
    };
};

export const getUserDesigns = async (userId: number) => {
    const designs = await designRepo.findByUser(userId);
    return designMapper.toDesignListResponse(designs);
};

export const getDesignById = async (userId: number, designId: number) => {
    const design = await designRepo.findById(designId);
    if (!design) {
        const err = new Error("Design not found");
        (err as any).statusCode = 404;
        throw err;
    }
    return designMapper.toDesignDetailResponse(design);
};

export const updateDesign = async (
    userId: number,
    designId: number,
    data: {
        template_id: number;
        title: string;
        category: Category;
        thumbnail_url: string;
        design_json: unknown;
        caption: string;
    }
) => {
    const existingDesign =
        await designRepo.findByIdAndUser(
            designId,
            userId
        );

    if (!existingDesign) {
        const err = new Error("Design not found");
        (err as any).statusCode = 404;
        throw err;
    }

    await designRepo.update(designId, data);

    return {
        message: "Design updated successfully",
    };
};

export const generateCaption = async (
    buffer: Buffer,
    mimeType: string
) => {

    const imageBase64 =
        buffer.toString("base64");

    return await geminiService.generateCaption(
        imageBase64,
        mimeType
    );
};

export const generateDesign = async (
    prompt: string
) => {
    return await geminiService.generateDesign(
        prompt
    );
};