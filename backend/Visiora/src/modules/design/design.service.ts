import * as designRepo from "./design.repository.js";
import * as designMapper from "./design.mapper.js";

export const createDesign = async (
    userId: number,
    data: {
        template_id: number;
        title: string;
        category: string;
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

export const getDesignById = async (designId: number) => {
    const design = await designRepo.findById(designId);
    if (!design) {
        throw new Error("Design not found");
    }
    return designMapper.toDesignDetailResponse(design);
};

export const updateDesign = async (
    designId: number,
    data: {
        template_id: number;
        title: string;
        category: string;
        thumbnail_url: string;
        design_json: unknown;
        caption: string;
    }
) => {
    await designRepo.update(designId, {
        template_id: data.template_id,
        title: data.title,
        category: data.category,
        thumbnail_url: data.thumbnail_url,
        design_json: data.design_json,
        caption: data.caption,
    });
    return {
        message: "Design updated successfully",
    };
}