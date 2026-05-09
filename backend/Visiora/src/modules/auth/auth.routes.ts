import express from "express";
import * as authController from "./auth.controller.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Compatibility router for top-level paths (mounted at /api)
export const compatRouter = express.Router();
compatRouter.post("/register", authController.register);
compatRouter.post("/login", authController.login);

export default router;