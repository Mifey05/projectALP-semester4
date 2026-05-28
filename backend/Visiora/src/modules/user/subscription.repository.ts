import db from "../../config/db.js";

type UserSubscription = {
    subscription_id: number;
    user_id: number;
    plan_id: number;
    status: SubscriptionStatus;
    start_date: Date | null;
    end_date: Date | null;
    created_at: Date;
    updated_at: Date;
};

type CreateSubscriptionInput = {
    user_id: number;
    plan_id: number;
    status: SubscriptionStatus;
    start_date: Date | null;
    end_date: Date | null;
};

type SubscriptionPlan = {
    plan_id: number;
    name: string;
    tier: number;
    price: number;
    created_at: Date;
    updated_at: Date;
};

type SubscriptionStatus = "INACTIVE" | "ACTIVE" | "EXPIRED" | "CANCELLED";

export const findByUser = async(userId : number) => {
    const [rows] = await db.query(
        "SELECT * FROM user_subscriptions WHERE user_id = ? ORDER BY created_at DESC", [userId]
    );
    const result = rows as UserSubscription[];
    return result[0] || null;
};

export const findActiveByUser = async(userId : number) => {
    const [rows] = await db.query(
        "SELECT * FROM user_subscriptions WHERE user_id = ? AND status = 'ACTIVE'", [userId]
    );
    const result = rows as UserSubscription[];
    return result[0] || null;
};

export const create = async(data: CreateSubscriptionInput) => {
    const [result] = await db.query(
        `INSERT INTO user_subscriptions 
        (user_id, plan_id, status, start_date, end_date)
        VALUES (?, ?, ?, ?, ?)`, [
            data.user_id,
            data.plan_id,
            data.status,
            data.start_date,
            data.end_date,
        ]
    );
    return (result as any).insertId;
};

export const updateStatus = async(subscriptionId: number, status: SubscriptionStatus) => {
    await db.query(
        "UPDATE user_subscriptions SET status = ?, updated_at = NOW() WHERE subscription_id = ?", [status, subscriptionId]
    );
}

export const activate = async (subscriptionId: number, startDate: Date, endDate: Date) => {
    await db.query(
        `UPDATE user_subscriptions
         SET status = ?, start_date = ?, end_date = ?, updated_at = NOW()
         WHERE subscription_id = ?`,
        ["ACTIVE", startDate, endDate, subscriptionId]
    );
};

export const findCurrentByUser = async(userId : number) => {
    const [rows] = await db.query(
        `SELECT sp.* FROM subscription_plans sp
         JOIN user_subscriptions s ON sp.plan_id = s.plan_id
         WHERE s.user_id = ? AND s.status = 'ACTIVE'`
    , [userId]);
    const result = rows as SubscriptionPlan[];
    return result[0] || null;
};