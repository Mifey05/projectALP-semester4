import type { Request, Response, NextFunction } from "express";
import * as paymentService from "./payment.service.js";

type AuthReq = Request & { user: { user_id: number } };

type Provider = "OVO" | "GoPay" | "Dana" | "ShopeePay";

export const createPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as AuthReq).user.user_id;

        const { plan_id, provider } = req.body;

        if (!plan_id || typeof plan_id !== "number") {
            throw new Error("plan_id is required");
        }

        if (!provider || typeof provider !== "string") {
            throw new Error("provider is required");
        }

        const result = await paymentService.createPayment(userId, plan_id, provider as Provider);

        res.status(201).json({data: result});
    } catch (err) {
        next(err);
    }
};

export const getPaymentStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as AuthReq).user.user_id;

        const idParam = req.params.id;

        if (!idParam || typeof idParam !== "string") {
            throw new Error("Transaction id is required");
        }

        const transactionId = parseInt(idParam, 10);

        const result = await paymentService.getPaymentStatus(transactionId, userId);

        res.json({data: result});
    } catch (err) {
        next(err);
    }
};