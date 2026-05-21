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
            const err = new Error("plan_id is required");
            (err as any).statusCode = 400;
            throw err;
        }

        if (!provider || typeof provider !== "string") {
            const err = new Error("provider is required");
            (err as any).statusCode = 400;
            throw err;
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
            const err = new Error("Transaction id is required");
            (err as any).statusCode = 400;
            throw err;
        }

        const transactionId = parseInt(idParam, 10);

        const result = await paymentService.getPaymentStatus(transactionId, userId);

        res.json({data: result});
    } catch (err) {
        next(err);
    }
};