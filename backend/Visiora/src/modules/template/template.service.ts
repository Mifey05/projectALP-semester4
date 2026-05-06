import * as templateRepo from "./template.repository.js";
import * as designRepo from "../design/design.repository.js";
import { mapTemplates } from "./template.mapper.js";

export const getTemplates = async () => {
    const templates = await templateRepo.findAll();
    return mapTemplates(templates);
};

export const useTemplate = async (templateId: string | number, userId: number) => {
    const templateIdNum = Number(templateId);
    
    if (!Number.isFinite(templateIdNum)) {
        throw new Error("Invalid template id");
    }

    const template = await templateRepo.findById(templateIdNum);
    
    if (!template) {
        throw new Error("Template not found");
    }

    const designId = await designRepo.create({
        user_id: userId,
        template_id: templateIdNum,
        title: template.title,
        category: template.category,
        thumbnail_url: template.thumbnail_url,
        design_json: JSON.parse(template.design_json),
        caption: template.caption,
        is_active: true,
    });

    return { design_id: designId, template_id: templateIdNum };
};