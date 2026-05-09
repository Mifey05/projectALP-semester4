export const toDto = (course: any) => {
	if (!course) return null;
	return {
		course_id: course.id ?? null,
		title: course.title ?? "",
		thumbnail_url: course.thumbnailUrl ?? null,
		description: course.description ?? "",
	};
};

export const fromDto = (dto: any) => ({
	id: dto.course_id,
	title: dto.title,
	thumbnailUrl: dto.thumbnail_url,
	description: dto.description,
});
