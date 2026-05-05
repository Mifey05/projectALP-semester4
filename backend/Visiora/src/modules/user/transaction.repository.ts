import db from "../../config/db.js";

type Transaction = {
    transaction_id: number;
    user_id: number;
    subscription_id: number;
    provider: string;
    amount: number;
    status: string;
    created_at: Date;
    updated_at: Date;
};

type CreateTransactionInput = {
    user_id: number;
    subscription_id: number;
    provider: string;
    amount: number;
    status: string;
};

export const create = async(data: CreateTransactionInput) => {
    const [result] = await db.query(
        `INSERT INTO transactions
     (user_id, subscription_id, provider, amount, status)
     VALUES (?, ?, ?, ?, ?)`, [
            data.user_id,
            data.subscription_id,
            data.provider,
            data.amount,
            data.status,
        ]
    );
    return (result as any).insertId;
};

export const findByUser = async(userId : number) => {
    const [rows] = await db.query(
        "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC", [userId]
    );
    const result = rows as Transaction[];
    return result[0] || null;
};