import express from "express";
import * as designController from "./design.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, designController.createDesign);
router.get("/history", authMiddleware, designController.getUserDesigns);
router.get("/:id", authMiddleware, designController.getDesignById);
router.put("/:id", authMiddleware, designController.updateDesign);

export default router;
