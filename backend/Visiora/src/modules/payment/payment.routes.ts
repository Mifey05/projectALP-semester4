import express from "express";
import * as paymentController from "./payment.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/pay", authMiddleware, paymentController.createPayment);
router.get("/status/:id", authMiddleware, paymentController.getPaymentStatus);

export default router;
