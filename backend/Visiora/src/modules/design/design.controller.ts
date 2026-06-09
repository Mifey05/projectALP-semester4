
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
        const userId = (req as AuthReq).user.user_id;
        const designId = parseInt(String(req.params.id), 10);

        const design = await designService.getDesignById(userId, designId);
        if (Number.isNaN(designId)) {
            return res.status(400).json({
                message: "Invalid design id",
            });
        }
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
        const designId = parseInt(String(req.params.id), 10);
        if (Number.isNaN(designId)) {
            return res.status(400).json({
                message: "Invalid design id",
            });
        }
        
        const { template_id, title, category, thumbnail_url, design_json, caption } = req.body;
        const userId = (req as AuthReq).user.user_id;
        const result = await designService.updateDesign(
            userId,
            designId,
            {
                template_id,
                title,
                category,
                thumbnail_url,
                design_json,
                caption,
            }
        );
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const generateCaption = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                message: "Image is required",
            });
        }

        const caption =
            await designService.generateCaption(
                req.file.buffer,
                req.file.mimetype
            );

        res.status(200).json({
            data: {
                caption,
            },
        });

    } catch (err) {
        next(err);
    }
};

export const generateDesign = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                message: "Prompt is required",
            });
        }

        const design =
            await designService.generateDesign(
                prompt
            );

        return res.status(200).json({
            data: design,
        });

    } catch (err) {
        next(err);
    }
};