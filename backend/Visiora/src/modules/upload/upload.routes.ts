import { Router } from "express";
import multer from "multer";
import * as uploadController from "./upload.controller.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), uploadController.upload);

export default router;