import db from "../config/db.js";
import { faker } from "@faker-js/faker";

const DELIVERY_TYPES = [
    "ONLINE",
    "OFFLINE",
    "HYBRID",
] as const;

export const courseSeeder = async () => {
    for (let i = 0; i < 5; i++) {
        const startDate = faker.date.soon();
        const endDate = faker.date.future({
            refDate: startDate,
        });

        const deliveryType =
            faker.helpers.arrayElement([
                ...DELIVERY_TYPES,
            ]);

        await db.query(
            `INSERT INTO courses
            (
                title,
                description,
                thumbnail_url,
                tier_required,
                delivery_type,
                location,
                meeting_url,
                start_date,
                end_date
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                faker.company.catchPhrase(),
                faker.lorem.paragraph(),
                faker.image.url(),
                faker.number.int({
                    min: 0,
                    max: 2,
                }),
                deliveryType,
                deliveryType === "ONLINE"
                    ? "-"
                    : faker.location.city(),
                deliveryType === "OFFLINE"
                    ? "-"
                    : faker.internet.url(),
                startDate,
                endDate,
            ]
        );
    }

    console.log("Courses seeded");
};