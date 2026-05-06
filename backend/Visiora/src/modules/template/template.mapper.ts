type Template = {
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

export type TemplateDto = Omit<Template, "design_json"> & {
	design_json: unknown;
};

export const mapTemplate = (template: Template): TemplateDto => ({
	...template,
	design_json: safeParseJson(template.design_json),
});

export const mapTemplates = (templates: Template[]): TemplateDto[] =>
	templates.map(mapTemplate);

const safeParseJson = (value: string): unknown => {
	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
};
