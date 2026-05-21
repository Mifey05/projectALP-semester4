import * as templateRepo from "./template.repository.js";
import * as designRepo from "../design/design.repository.js";
import * as templateMapper from "./template.mapper.js";

export const getTemplates = async () => {
    const templates = await templateRepo.findAll();
    return templateMapper.toTemplateListResponse(templates);
};

export const useTemplate = async (templateId: number, userId: number) => {
    const template = await templateRepo.findById(templateId);
    let designJson;

    try {
        designJson = JSON.parse(template?.design_json || "");
    } catch {
        const err = new Error("Invalid template design JSON");
        (err as any).statusCode = 400;
        throw err;
    }

    if (!template) {
        const err = new Error("Template not found");
        (err as any).statusCode = 404;
        throw err;
    }

    const designId = await designRepo.create({
        user_id: userId,
        template_id: templateId,
        title: template.title,
        category: template.category,
        thumbnail_url: template.thumbnail_url,
        design_json: designJson,
        caption: template.caption,
        is_active: true,
    });

    return {
        design_id: designId,
        message: "Design created from template",
    };
};
