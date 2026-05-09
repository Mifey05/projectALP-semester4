import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
// import userRoutes from "./modules/user/user.routes.js";
import templateRoutes from "./modules/template/template.routes.js";
// import designRoutes from "./modules/design/design.routes.js";
// import courseRoutes from "./modules/course/course.routes.js";
import uploadRoutes from "./modules/upload/upload.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/templates", templateRoutes);
// app.use("/api/designs", designRoutes);
// app.use("/api/courses", courseRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

export default app;