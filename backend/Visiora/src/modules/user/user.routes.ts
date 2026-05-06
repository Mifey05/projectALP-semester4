import express from "express";
import * as userController from "./user.controller.js";

const router = express.Router();

router.get("/plans", userController.getPlans);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.get("/:id/transactions", userController.getTransactionsByUser);
router.get("/:id/enterprise", userController.getEnterpriseByUser);

export default router;
