import db from "../config/db.js";
import { faker } from "@faker-js/faker";

const TRANSACTION_STATUSES = [
    "PENDING",
    "SUCCESS",
    "FAILED",
] as const;

const PROVIDERS = [
    "OVO",
    "GoPay",
    "Dana",
    "ShopeePay",
] as const;

export const transactionSeeder = async () => {
    const [subscriptionRows] = await db.query(
        `SELECT subscription_id, user_id
        FROM user_subscriptions`
    );

    const subscriptions = subscriptionRows as {
        subscription_id: number;
        user_id: number;
    }[];

    for (const subscription of subscriptions) {
        await db.query(
            `INSERT INTO transactions
            (
                user_id,
                subscription_id,
                provider,
                amount,
                status
            )
            VALUES (?, ?, ?, ?, ?)`,
            [
                subscription.user_id,
                subscription.subscription_id,
                faker.helpers.arrayElement([
                    ...PROVIDERS,
                ]),
                faker.number.int({
                    min: 49000,
                    max: 149000,
                }),
                faker.helpers.arrayElement([
                    ...TRANSACTION_STATUSES,
                ]),
            ]
        );
    }

    console.log("Transactions seeded");
};