import app from "./app.js";
import db from "./config/db.js";

const PORT = process.env.PORT || 3000;

const start = async() => {
    try {
        await db.query("SELECT 1"); // test DB
        console.log("DB connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1);
    }
};

start();