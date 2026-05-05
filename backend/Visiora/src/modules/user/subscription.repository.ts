import db from "../../config/db.js";

type UserSubscription = {
    subscription_id: number;
    user_id: number;
    plan_id: number;
    status: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
};

type CreateSubscriptionInput = {
    user_id: number;
    plan_id: number;
    status: string;
    start_date: Date;
    end_date: Date;
};

type UpdateSubscriptionInput = {
    plan_id?: number;
    status?: string;
    start_date?: Date;
    end_date?: Date;
};

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