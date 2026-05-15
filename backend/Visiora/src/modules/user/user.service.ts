import * as userRepo from "./user.repository.js";
import * as subscriptionRepo from "./subscription.repository.js";
import * as planRepo from "./plan.repository.js";
import * as enterpriseRepo from "./enterprise.repository.js";

type EnterpriseType = "FnB" | "Fashion" | "Beauty" | "Agribusiness" | "Automotive" | "Trading" | "Processing Industry" | "Agriculture" | "Plantation" | "Farm" | "Fishery" | "Service" | "Other";

export const getProfile = async (userId: number) => {
    const user = await userRepo.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const enterprise = await enterpriseRepo.findByUserId(userId);

    return {
        name: user.name,
        email: user.email,
        address: enterprise?.address || "",
        enterprise_name: enterprise?.enterprise_name || "",
        enterprise_type: enterprise?.enterprise_type || "Other",
        tiktok: enterprise?.tiktok || "",
        instagram: enterprise?.instagram || "",
        whatsapp: enterprise?.whatsapp || ""
    };
};

export const updateProfile = async (
    userId: number,
    data: { 
        name?: string; email?: string; address?: string; 
        enterprise_name?: string; enterprise_type?: EnterpriseType; 
        tiktok?: string; instagram?: string; whatsapp?: string; 
    }
) => {
    const user = await userRepo.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    await userRepo.update(userId, {
        name: data.name ?? user.name,
        email: data.email ?? user.email,
    });

    await enterpriseRepo.upsert({
        user_id: userId,
        enterprise_name: data.enterprise_name ?? "",
        enterprise_type: data.enterprise_type ?? "Other",
        address: data.address ?? "",
        tiktok: data.tiktok ?? "",
        instagram: data.instagram ?? "",
        whatsapp: data.whatsapp ?? ""
    });

    return {
        message: "Profile updated successfully",
    };
};

export const getSubscriptionTier = async (userId: number) => {
    const user = await userRepo.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const subscription = await subscriptionRepo.findActiveByUser(userId);

    if (!subscription) {
        return {
            user_id: userId,
            tier: 0,
            subscription_status: null,
            plan_name: null,
        };
    }

    const plan = await planRepo.findById(subscription.plan_id);

    return {
        user_id: userId,
        tier: Number(plan?.tier) || 0,
        subscription_status: subscription.status,
        plan_name: plan?.name || null,
        subscription_id: subscription.subscription_id,
        start_date: subscription.start_date,
        end_date: subscription.end_date,
    };
};

export const pay = async (userId: number, planId: number, provider: string) => {
    const plan = await planRepo.findById(planId);
    if (!plan) throw new Error("Plan not found");

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const subscriptionId = await subscriptionRepo.create({
        user_id: userId,
        plan_id: planId,
        status: "ACTIVE",
        start_date: startDate,
        end_date: endDate,
    });

    await transactionRepo.create({
        user_id: userId,
        subscription_id: subscriptionId,
        provider,
        amount: plan.price,
        status: "SUCCESS",
    });

    return { message: "Payment successful" };
};


export const getSubscriptionPlans = async () => {
    return await userRepo.getSubscriptionPlans();
};
