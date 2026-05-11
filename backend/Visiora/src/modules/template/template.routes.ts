import express from "express";
import * as controller from "./template.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, controller.getTemplates);
router.post("/:id/use", authMiddleware, controller.useTemplate);

export default router;
