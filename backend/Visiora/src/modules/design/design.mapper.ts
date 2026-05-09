export const toDto = (d: any) => {
	if (!d) return null;
	return {
		design_id: d.id ?? null,
		title: d.name ?? "",
		thumbnail_url: d.thumbnailUrl ?? null,
		created_at: d.createdAt ?? null,
	};
};

export const fromDto = (dto: any) => ({
	id: dto.design_id,
	name: dto.title,
	thumbnailUrl: dto.thumbnail_url,
	createdAt: dto.created_at,
});
