import * as designRepo from "./design.repository.js";
import { mapDesign, mapDesigns } from "./design.mapper.js";

export type CreateDesignInput = {
	user_id: number;
	template_id: number;
	title: string;
	category: string;
	thumbnail_url: string;
	design_json: unknown;
	caption: string;
	is_active: boolean;
};

export type UpdateDesignInput = {
	design_json: unknown;
};

export const getDesignsByUser = async (userId: number) => {
	const design = await designRepo.findByUser(userId);
	return design ? [mapDesign(design)] : [];
};

export const createDesign = async (data: CreateDesignInput) => {
	return designRepo.create(data);
};

export const updateDesign = async (
	designId: number,
	data: UpdateDesignInput
) => {
	await designRepo.update(designId, data);
};
