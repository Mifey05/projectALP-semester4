type User = {
	name: string;
	email: string;
    address: string;
    enterprise_name: string;
    enterprise_type: EnterpriseType;
    tiktok: string;
    instagram: string;
    whatsapp: string;
};
type EnterpriseType = "FnB" | "Fashion" | "Beauty" | "Agribusiness" | "Automotive" | "Trading" | "Processing Industry" | "Agriculture" | "Plantation" | "Farm" | "Fishery" | "Service" | "Other";

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

type SubscriptionTier = {
    user_id: number;
    tier: number;
    subscription_status: string | null;
    plan_name: string | null;
    subscription_id?: number;
    start_date?: Date;
    end_date?: Date;
};

export const toSubscriptionTierResponse = (data: SubscriptionTier) => {
    // Mapping angka tier ke detail string
    const tierMapping: Record<number, string> = {
        0: "Free",
        1: "Premium",
        2: "Enterprise"
    };

    return {
        ...data,
        tier: tierMapping[data.tier] || "Free", // timpa variabel tier dengan string
    };
};
