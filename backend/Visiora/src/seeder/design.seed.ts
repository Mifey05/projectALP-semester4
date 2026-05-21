import db from "../config/db.js";
import { faker } from "@faker-js/faker";

const DESIGN_CATEGORIES = [
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

export const designSeeder = async () => {
    const [userRows] = await db.query(
        "SELECT user_id FROM users"
    );

    const [templateRows] = await db.query(
        "SELECT template_id FROM templates"
    );

    const users = userRows as {
        user_id: number;
    }[];

    const templates = templateRows as {
        template_id: number;
    }[];

    for (let i = 0; i < 5; i++) {
        const user =
            faker.helpers.arrayElement(users);

        const template =
            faker.helpers.arrayElement(
                templates
            );

        await db.query(
            `INSERT INTO designs
            (
                user_id,
                template_id,
                title,
                category,
                thumbnail_url,
                design_json,
                caption,
                is_active
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user.user_id,
                template.template_id,
                faker.commerce.productName(),
                faker.helpers.arrayElement([
                    ...DESIGN_CATEGORIES,
                ]),
                faker.image.url(),
                generateDesignJson(),
                faker.lorem.sentence(),
                true,
            ]
        );
    }

    console.log("Designs seeded");
};