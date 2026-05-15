import db from "../config/db.js";

export const planSeeder = async () => {
    const plans = [
        {
            name: "Free",
            tier: 0,
            price: 0,
        },
        {
            name: "Premium",
            tier: 1,
            price: 49000,
        },
        {
            name: "Enterprise",
            tier: 2,
            price: 149000,
        },
    ];

    for (const plan of plans) {
        await db.query(
            `INSERT INTO subscription_plans
            (name, tier, price)
            VALUES (?, ?, ?)`,
            [
                plan.name,
                plan.tier,
                plan.price,
            ]
        );
    }

    console.log("Plans seeded");
};