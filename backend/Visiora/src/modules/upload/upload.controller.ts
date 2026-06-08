import type { Request, Response, NextFunction } from "express";

import * as uploadService from "./upload.service.js";
import * as bgRemovalService from "./backgroundRemoval.service.js";

export const upload = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const result =
            await uploadService.uploadImage(
                req.file.path
            );

        return res.status(201).json({
            url: result.url,
        });
    } catch (err) {
        next(err);
    }
};

export const uploadDesignElement = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const removedBgResult =
            await bgRemovalService.removeBackground(
                req.file.path
            );

        const uploadedImage =
            await uploadService.uploadElementImage(
                removedBgResult.dataUrl
            );

        return res.status(201).json({
            url: uploadedImage.url,
        });
    } catch (err) {
        next(err);
    }
};