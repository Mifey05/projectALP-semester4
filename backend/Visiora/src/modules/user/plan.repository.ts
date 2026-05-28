import db from "../../config/db.js";

type SubscriptionPlan = {
    plan_id: number;
    name: string;
    tier: number;
    price: number;
    created_at: Date;
    updated_at: Date;
};

export const findAll = async() => {
    const [rows] = await db.query(
        "SELECT * FROM subscription_plans"
    );
    return rows as SubscriptionPlan[];
};

export const findById = async(planId : number) => {
    const [rows] = await db.query(
        "SELECT * FROM subscription_plans WHERE plan_id = ?", [planId]
    );
    const result = rows as SubscriptionPlan[];
    return result[0] || null;
};

export const findCurrentByUser = async(userId : number) => {
    const [rows] = await db.query(
        `SELECT sp.* FROM subscription_plans sp
         JOIN user_subscriptions s ON sp.plan_id = s.plan_id
         WHERE s.user_id = ? AND s.status = 'active'`
    , [userId]);
    const result = rows as SubscriptionPlan[];
    return result[0] || null;
};
