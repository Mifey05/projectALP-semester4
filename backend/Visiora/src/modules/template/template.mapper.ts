export const toDto = (t: any) => {
	if (!t) return null;
	return {
		template_id: t.id ?? null,
		title: t.name ?? "",
		thumbnail_url: t.previewUrl ?? null,
		caption: t.caption ?? "",
		category: t.category ?? null,
	};
};

export const fromDto = (dto: any) => ({
	id: dto.template_id,
	name: dto.title,
	previewUrl: dto.thumbnail_url,
	caption: dto.caption,
	category: dto.category,
});
