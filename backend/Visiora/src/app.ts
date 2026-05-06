import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import templateRoutes from "./modules/template/template.routes.js";
import designRoutes from "./modules/design/design.routes.js";
import courseRoutes from "./modules/course/course.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/templates", templateRoutes);
app.use("/designs", designRoutes);
app.use("/courses", courseRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use(errorHandler);

export default app;