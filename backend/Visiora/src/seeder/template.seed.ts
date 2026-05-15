import db from "../config/db.js";
import { faker } from "@faker-js/faker";

const TEMPLATE_CATEGORIES = [
    "Business",
    "Promotion",
    "Food",
    "Education",
    "Social Media",
] as const;

const generateDesignJson = () => {
    return JSON.stringify({
        canvas: {
            width: 1080,
            height: 1080,
        },
        elements: [
            {
                type: "text",
                text: faker.lorem.words(3),
                x: faker.number.int({ min: 0, max: 500 }),
                y: faker.number.int({ min: 0, max: 500 }),
                width: faker.number.int({ min: 100, max: 300 }),
                height: faker.number.int({ min: 50, max: 150 }),
            },
            {
                type: "image",
                url: faker.image.url(),
                x: faker.number.int({ min: 0, max: 500 }),
                y: faker.number.int({ min: 0, max: 500 }),
                width: faker.number.int({ min: 100, max: 300 }),
                height: faker.number.int({ min: 50, max: 150 }),
            },
        ],
    });
};

export const templateSeeder = async () => {
    for (let i = 0; i < 5; i++) {
        await db.query(
            `INSERT INTO templates
            (
                title,
                category,
                thumbnail_url,
                design_json,
                caption,
                is_active
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                faker.commerce.productName(),
                faker.helpers.arrayElement([
                    ...TEMPLATE_CATEGORIES,
                ]),
                faker.image.url(),
                generateDesignJson(),
                faker.lorem.sentence(),
                true,
            ]
        );
    }

    console.log("Templates seeded");
};