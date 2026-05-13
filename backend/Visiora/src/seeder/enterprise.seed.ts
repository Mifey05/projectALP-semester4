import db from "../config/db.js";
import { faker } from "@faker-js/faker";

const ENTERPRISE_TYPES = [
    "FnB",
    "Fashion",
    "Beauty",
    "Agribusiness",
    "Automotive",
    "Trading",
    "Processing Industry",
    "Agriculture",
    "Plantation",
    "Farm",
    "Fishery",
    "Service",
    "Other",
] as const;

export const enterpriseSeeder = async () => {
    const [rows] = await db.query(
        "SELECT user_id FROM users"
    );

    const users = rows as { user_id: number }[];

    for (const user of users) {
        await db.query(
            `INSERT INTO user_enterprises
            (
                user_id,
                enterprise_name,
                enterprise_type,
                address,
                tiktok,
                instagram,
                whatsapp
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                user.user_id,
                faker.company.name(),
                faker.helpers.arrayElement([...ENTERPRISE_TYPES]),
                faker.location.streetAddress(),
                faker.internet.username(),
                faker.internet.username(),
                faker.phone.number(),
            ]
        );
    }

    console.log("Enterprises seeded");
};