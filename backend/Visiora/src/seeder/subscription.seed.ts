import db from "../config/db.js";
import { faker } from "@faker-js/faker";

const SUBSCRIPTION_STATUSES = [
    "INACTIVE",
    "ACTIVE",
    "EXPIRED",
    "CANCELLED",
] as const;

export const subscriptionSeeder = async () => {
    const [userRows] = await db.query(
        "SELECT user_id FROM users"
    );

    const [planRows] = await db.query(
        "SELECT plan_id FROM subscription_plans"
    );

    const users = userRows as {
        user_id: number;
    }[];

    const plans = planRows as {
        plan_id: number;
    }[];

    for (const user of users) {
        const plan =
            faker.helpers.arrayElement(plans);

        const status =
            faker.helpers.arrayElement([
                ...SUBSCRIPTION_STATUSES,
            ]);

        const startDate =
            status === "INACTIVE"
                ? null
                : faker.date.recent();

        const endDate =
            status === "INACTIVE"
                ? null
                : faker.date.future();

        await db.query(
            `INSERT INTO user_subscriptions
            (
                user_id,
                plan_id,
                status,
                start_date,
                end_date
            )
            VALUES (?, ?, ?, ?, ?)`,
            [
                user.user_id,
                plan.plan_id,
                status,
                startDate,
                endDate,
            ]
        );
    }

    console.log("Subscriptions seeded");
};