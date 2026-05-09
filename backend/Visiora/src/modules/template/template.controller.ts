import * as service from "./template.service.js";
import * as mapper from "./template.mapper.js";
import type { Request, Response, NextFunction } from "express";

export const getTemplates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await service.getTemplates();
        res.json({ data: data.map(mapper.toDto) });
    } catch (err) {
        next(err);
    }
};

export const useTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const userId = 1; // temp

        const result = await service.useTemplate(id, userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};