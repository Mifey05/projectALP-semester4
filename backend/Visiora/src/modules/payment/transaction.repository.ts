import db from "../../config/db.js";

type Transaction = {
    transaction_id: number;
    user_id: number;
    subscription_id: number;
    provider: Provider;
    amount: number;
    status: TransactionStatus;
    created_at: Date;
    updated_at: Date;
};

type CreateTransactionInput = {
    user_id: number;
    subscription_id: number;
    provider: Provider;
    amount: number;
    status: TransactionStatus;
};

type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED";
type Provider = "OVO" | "GoPay" | "Dana" | "ShopeePay";

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
    return result;
};

export const findById = async(transactionId: number) => {
    const [rows] = await db.query(
        "SELECT * FROM transactions WHERE transaction_id = ?", [transactionId]
    );
    const result = rows as Transaction[];
    return result[0] || null;
};


export const findByIdAndUser = async(transactionId: number, userId: number) => {
    const [rows] = await db.query(
        "SELECT * FROM transactions WHERE transaction_id = ? AND user_id = ?", [transactionId, userId]
    );
    const result = rows as Transaction[];
    return result[0] || null;
};

export const updateStatus = async(transactionId: number, status: TransactionStatus) => {
    await db.query(
        "UPDATE transactions SET status = ?, updated_at = NOW() WHERE transaction_id = ?", [status, transactionId]
    );
};