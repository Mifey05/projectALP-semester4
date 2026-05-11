type Template = {
	template_id: number;
	title: string;
	thumbnail_url: string;
	caption: string;
	category: string;
};

export const toTemplateResponse = (template: Template) => {
	return {
		template_id: template.template_id,
        title: template.title,
        thumbnail_url: template.thumbnail_url,
        caption: template.caption,
        category: template.category,
	};
};

export const toTemplateListResponse = (templates: Template[]) => {
	return templates.map(toTemplateResponse);
};
