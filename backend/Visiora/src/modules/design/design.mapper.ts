import type { UpdateDesignInput } from "./design.service.js";

type Design = {
	design_id: number;
	user_id: number;
	template_id: number;
	title: string;
	category: string;
	thumbnail_url: string;
	design_json: string;
	caption: string;
	is_active: boolean;
	created_at: Date;
	updated_at: Date;
};

export type DesignDto = Omit<Design, "design_json"> & {
	design_json: unknown;
};

export const mapDesign = (design: Design): DesignDto => ({
	...design,
	design_json: safeParseJson(design.design_json),
});

export const mapDesigns = (designs: Design[]): DesignDto[] =>
	designs.map(mapDesign);

export const toUpdateDesignInput = (
	designJson: unknown
): UpdateDesignInput => ({
	design_json: designJson,
});

const safeParseJson = (value: string): unknown => {
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
};
