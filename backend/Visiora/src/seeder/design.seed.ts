import db from "../config/db.js";
import { faker } from "@faker-js/faker";

const DESIGN_CATEGORIES = [
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
                text: faker.lorem.words(5),
                x: faker.number.int({
                    min: 0,
                    max: 800,
                }),
                y: faker.number.int({
                    min: 0,
                    max: 800,
                }),
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