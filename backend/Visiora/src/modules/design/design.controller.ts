
import type { Request, Response, NextFunction } from "express";
import * as designService from "./design.service.js";

type AuthReq = Request & { user: { user_id: number } };

export const createDesign = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as AuthReq).user.user_id;
        const { template_id, title, category, thumbnail_url, design_json, caption } = req.body;

        const result = await designService.createDesign(userId, {
            template_id,
            title,
            category,
            thumbnail_url,
            design_json,
            caption,
        });

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

export const getUserDesigns = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as AuthReq).user.user_id;
        const designs = await designService.getUserDesigns(userId);
        res.json({ data: designs }); 
    } catch (err) {
        next(err);
    }
};

export const getDesignById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idParam = req.params.id;
        if (!idParam || typeof idParam !== "string") {
            throw new Error("Design id is required");
        }
        const design = await designService.getDesignById(parseInt(idParam, 10));
        res.json({ data: design });
    } catch (err) {
        next(err);
    }
};

export const updateDesign = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idParam = req.params.id;
        if (!idParam || typeof idParam !== "string") {
            throw new Error("Design id is required");
        }
        
        const { template_id, title, category, thumbnail_url, design_json, caption } = req.body;
        const designId = parseInt(idParam, 10);
        const result = await designService.updateDesign(designId, {
            template_id,
            title,
            category,
            thumbnail_url,
            design_json,
            caption,
        });
        res.json(result);
    } catch (err) {
        next(err);
    }
};

