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
        const idParam = req.params.id;
        if (!idParam || typeof idParam !== "string") {
            throw new Error("Template id is required");
        }

        const userId = (req as AuthReq).user.user_id;
        const templateId = parseInt(idParam, 10);

        const result = await service.useTemplate(templateId, userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};
