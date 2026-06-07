import { Router } from "express";
import multer from "multer";

import * as uploadController from "./upload.controller.js";
import * as uploadEnhancedController from "./upload-enhanced.controller.js";

import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

const upload = multer({
  dest: "uploads/",
});

/**
 * Upload biasa
 */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  uploadController.upload
);

/**
 * Upload dengan deteksi gambar
 */
router.post(
  "/with-detection",
  authMiddleware,
  upload.single("image"),
  uploadEnhancedController.uploadWithDetection
);

/**
 * Upload background
 */
router.post(
  "/design/background",
  authMiddleware,
  upload.single("image"),
  uploadEnhancedController.uploadDesignBackground
);

/**
 * Upload element
 */
router.post(
  "/design/element",
  authMiddleware,
  upload.single("image"),
  uploadEnhancedController.uploadDesignElement
);

export default router;