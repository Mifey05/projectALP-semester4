import express from "express";
import * as userController from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile", authMiddleware, userController.updateProfile);
router.get("/subscription/tier", authMiddleware, userController.getSubscriptionTier);
router.get("/subscription/plans", authMiddleware, userController.getSubscriptionPlans);
router.get("/subscription/current", authMiddleware, userController.getSubscriptionCurrent);

export default router;
