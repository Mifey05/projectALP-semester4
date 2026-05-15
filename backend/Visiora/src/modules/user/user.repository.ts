import db from "../../config/db.js";

type User = {
    user_id: number;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
};

type CreateUserInput = {
  email: string;
  name: string;
  password_hash: string;
};

type UpdateUserInput = {
  name?: string;
  email?: string;
};

type SubscriptionPlans = {
    plan_id: number;
    name: string;
    tier: string;
    price: number;
    created_at: Date;
    updated_at: Date;
};

export const findById = async(userId : number) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE user_id = ?", [userId]
    );
    const result = rows as User[];
    return result[0] || null;
};

export const findByEmail = async(email : string) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?", [email]
    );
    const result = rows as User[];
    return result[0] || null;
};

export const create = async({ email, name, password_hash }: CreateUserInput) => {
    const [result] = await db.query(
        "INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)", [email, name, password_hash]
    );
    return (result as any).insertId;
};

export const update = async(userId: number, data: UpdateUserInput) => {
    await db.query(
        "UPDATE users SET name = ?, email = ?, updated_at = NOW() WHERE user_id = ?", [data.name, data.email, userId]
    );
};
