import { Router } from "express";
import multer from "multer";
import * as uploadController from "./upload.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/", authMiddleware, upload.single("image"), uploadController.upload);

export default router;
