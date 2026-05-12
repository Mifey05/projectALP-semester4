import * as service from "./template.service.js";
import type { Request, Response, NextFunction } from "express";

type AuthReq = Request & { user: { user_id: number } };

export const getTemplates = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.getTemplates();
        res.json({ data });
    } catch (err) {
        next(err);
    }
};

export const useTemplate = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const templateId = parseInt(String(req.params.id), 10);
        if (Number.isNaN(templateId)) {
            return res.status(400).json({
                message: "Invalid template id",
            });
        }

        const userId = (req as AuthReq).user.user_id;
        const result = await service.useTemplate(templateId, userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
