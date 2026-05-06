import type { NextFunction, Request, Response } from "express";
import * as service from "./template.service.js";

export const getTemplates = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const data = await service.getTemplates();
        res.json(data);
    } catch (err) {
        next(err);
    }
};

export const useTemplate = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const { id } = req.params;
        const userId = 1; // temp

        if (!id || typeof id !== "string") {
            return res.status(400).json({ message: "Template id is required" });
        }

        const result = await service.useTemplate(id, userId);
        res.json(result);
    } catch (err) {
        next(err);
    }
};