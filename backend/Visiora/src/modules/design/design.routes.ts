import express from "express";
import * as designController from "./design.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = express.Router();

router.post("/", authMiddleware, designController.createDesign);
router.get("/history", authMiddleware, designController.getUserDesigns);
router.get("/:id", authMiddleware, designController.getDesignById);
router.put("/:id", authMiddleware, designController.updateDesign);
router.post("/generate-caption", authMiddleware, upload.single("image"), designController.generateCaption);
router.post("/generate-design", authMiddleware, designController.generateDesign);

export default router;
