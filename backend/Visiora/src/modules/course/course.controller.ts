
import type { Request, Response, NextFunction } from "express";
import * as courseService from "./course.service.js";

type AuthReq = Request & { user: { user_id: number } };

export const getCourses = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const courses = await courseService.getCourses();
        res.json({ data: courses });
    } catch (err) {
        next(err);
    }
};

export const getCourseById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const idParam = req.params.id;
        if (!idParam || typeof idParam !== "string") {
            throw new Error("Course id is required and must be a string");
        }
        const course = await courseService.getCourseById(parseInt(idParam, 10));
        res.json({ data: course });
    } catch (err) {
        next(err);
    }
};

