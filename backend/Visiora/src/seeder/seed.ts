import { userSeeder } from "./user.seed.js";
import { enterpriseSeeder } from "./enterprise.seed.js";
import { templateSeeder } from "./template.seed.js";
import { planSeeder } from "./plan.seed.js";
import { courseSeeder } from "./course.seed.js";
import { designSeeder } from "./design.seed.js";
import { subscriptionSeeder } from "./subscription.seed.js";
import { transactionSeeder } from "./transaction.seed.js";

const runSeeders = async () => {
    try {
        console.log("Starting database seeding...");
        await userSeeder();
        await enterpriseSeeder();
        await templateSeeder();
        await planSeeder();
        await courseSeeder();
        await designSeeder();
        await subscriptionSeeder();
        await transactionSeeder();

        console.log("Database seeding completed");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed");
        console.error(err);
        process.exit(1);
    }
};

runSeeders();