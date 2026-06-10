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

const dummyBgImage = "https://res.cloudinary.com/dtwwce194/image/upload/v1781073689/Screenshot_from_2026-06-10_14-41-10_naxhq7.png";

const generateDesignJson = () => {
    return JSON.stringify({
        canvasBg: dummyBgImage,
        elements: [
            {
                id: Date.now(),
                type: "text",
                text: faker.commerce.productName(),
                color: "#000000",
                fontFamily: "System",
                x: faker.number.float({ min: 0, max: 800 }),
                y: faker.number.float({ min: 0, max: 800 }),
                selected: false,
            },
            {
                id: Date.now() + 1,
                type: "emoji",
                emoji: "🔥",
                x: faker.number.float({ min: 0, max: 800 }),
                y: faker.number.float({ min: 0, max: 800 }),
                selected: false,
            },
            {
                id: Date.now() + 2,
                type: "square",
                color: faker.color.rgb(),
                x: faker.number.float({ min: 0, max: 800 }),
                y: faker.number.float({ min: 0, max: 800 }),
                width: faker.number.float({ min: 50, max: 300 }),
                height: faker.number.float({ min: 50, max: 300 }),
                selected: false,
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