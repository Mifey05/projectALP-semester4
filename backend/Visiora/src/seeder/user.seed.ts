import db from "../config/db.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const userSeeder = async () => {
    const passwordHash = await bcrypt.hash("12345678", 10);
    for (let i = 0; i < 2; i++) {
        await db.query(
            `INSERT INTO users
            (name, email, password_hash)
            VALUES (?, ?, ?)`,
            [
                faker.person.fullName(),
                faker.internet.email(),
                passwordHash,
            ]
        );
    }

    console.log("Users seeded");
};
