import type { Request, Response, NextFunction } from "express";
import * as userService from "./user.service.js";
import * as userMapper from "./user.mapper.js";

type AuthReq = Request & { user: { user_id: number } };

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as AuthReq).user.user_id;
        const profile = await userService.getProfile(userId);
        res.json({ data: profile });
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as AuthReq).user.user_id;
        const {
            name, email, address, enterprise_name, enterprise_type, tiktok, instagram, whatsapp
        } = req.body;

        const result = await userService.updateProfile(userId, {
            name, email, address, enterprise_name, enterprise_type, tiktok, instagram, whatsapp
        });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const getSubscriptionTier = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as AuthReq).user.user_id;
        const tier = await userService.getSubscriptionTier(userId);
        res.json({ data: userMapper.toSubscriptionTierResponse(tier) });
    } catch (err) {
        next(err);
    }
};

export const pay = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthReq).user.user_id;
        const { planid, provider } = req.body.data[0]; 
        const result = await userService.pay(userId, planid, provider);
        res.json(result);
    } catch (err) { next(err); }
};

export const getSubscriptionPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const plans = await userService.getSubscriptionPlans();
        res.json({ data: plans });
    } catch (err) {
        next(err);
    }
};
