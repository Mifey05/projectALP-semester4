import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepo from "../user/user.repository.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const hashed = await bcrypt.hash(data.password, 10);

    const userId = await userRepo.create({
        name: data.name,
        email: data.email,
        password_hash: hashed,
    });

    return userId;
};

export const login = async (email: string, password: string) => {
    const user = await userRepo.findByEmail(email);

    if (!user){
        const err = new Error("Invalid credentials");
        (err as any).statusCode = 401;
        throw err;
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        const err = new Error("Invalid credentials");
        (err as any).statusCode = 401;
        throw err;
    }

    const token = jwt.sign(
        { user_id: user.user_id },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return token;
};