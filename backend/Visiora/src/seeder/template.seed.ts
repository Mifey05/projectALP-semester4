import db from "../config/db.js";
import { faker } from "@faker-js/faker";

const TEMPLATE_CATEGORIES = [
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

export const templateSeeder = async () => {
    for (let i = 0; i < 20; i++) {
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
                dummyBgImage,
                generateDesignJson(),
                faker.lorem.sentence(),
                true,
            ]
        );
    }

    console.log("Templates seeded");
};