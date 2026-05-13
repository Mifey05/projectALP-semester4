import db from "../config/db.js";
import { faker } from "@faker-js/faker";

export const userSeeder = async () => {
    for (let i = 0; i < 2; i++) {
        await db.query(
            `INSERT INTO users
            (name, email, password_hash)
            VALUES (?, ?, ?)`,
            [
                faker.person.fullName(),
                faker.internet.email(),
                "$2b$10$examplehash",
            ]
        );
    }

    console.log("Users seeded");
};
