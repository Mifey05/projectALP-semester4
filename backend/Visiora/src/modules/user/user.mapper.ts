export const toDto = (u: any) => {
	if (!u) return null;
	return {
		name: u.name ?? "",
		email: u.email ?? "",
		address: u.address ?? "",
		enterprise_name: u.enterpriseName ?? null,
		enterprise_type: u.enterpriseType ?? null,
		tiktok: u.tiktok ?? null,
		instagram: u.instagram ?? null,
		whatsapp: u.whatsapp ?? null,
	};
};

export const fromDto = (dto: any) => ({
	id: dto.id,
	name: dto.name,
	email: dto.email,
	address: dto.address,
	enterpriseName: dto.enterprise_name,
	enterpriseType: dto.enterprise_type,
	tiktok: dto.tiktok,
	instagram: dto.instagram,
	whatsapp: dto.whatsapp,
});
