import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import templateRoutes from "./modules/template/template.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import designRoutes from "./modules/design/design.routes.js";
import courseRoutes from "./modules/course/course.routes.js";
import uploadRoutes from "./modules/upload/upload.routes.js";
import * as authController from "./modules/auth/auth.controller.js";
import * as authCompat from "./modules/auth/auth.routes.js";
import * as userService from "./modules/user/user.service.js";
import * as userMapper from "./modules/user/user.mapper.js";
import * as userCompat from "./modules/user/user.routes.js";
import * as designService from "./modules/design/design.service.js";
import * as designMapper from "./modules/design/design.mapper.js";
import * as designCompat from "./modules/design/design.routes.js";
import * as templateController from "./modules/template/template.controller.js";
import * as templateCompat from "./modules/template/template.routes.js";
import * as courseController from "./modules/course/course.controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/upload", uploadRoutes);

// Frontend-contract aliases / convenience endpoints
// Mount compatibility routers under /api so frontend paths work
app.use("/api", authCompat.compatRouter);
app.use("/api", templateCompat.compatRouter);
app.use("/api", userCompat.compatRouter);
app.use("/api", designCompat.compatRouter);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;