import type { Request, Response, NextFunction } from "express";
import * as uploadService from "./upload.service.js";

export const upload = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.file);
    try {
        if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await uploadService.uploadImage(req.file.path);
        console.log(req.file);

        res.status(201).json({
        url: result.url,
        });
    } catch (err) {
        next(err);
    }

};