type User = {
	name: string;
	email: string;
    address: string;
    enterprise_name: string;
    enterprise_type: string;
    tiktok: string;
    instagram: string;
    whatsapp: string;
};

export const toUserResponse = (user: User) => {
	return {
		name: user.name,
        email: user.email,
        address: user.address,
        enterprise_name: user.enterprise_name,
        enterprise_type: user.enterprise_type,
        tiktok: user.tiktok,
        instagram: user.instagram,
        whatsapp: user.whatsapp,
    };
};

export const toUserProfileResponse = (user: User, enterprise?: any) => {
	return {
		name: user.name,
        email: user.email,
        address: user.address,
        enterprise_name: enterprise?.name || null,
        enterprise_type: enterprise?.type || null,
        tiktok: user.tiktok,
        instagram: user.instagram,
        whatsapp: user.whatsapp,
    };
};
