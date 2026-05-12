
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
        const courseId = parseInt(String(req.params.id), 10);
        if (Number.isNaN(courseId)) {
            return res.status(400).json({
                message: "Invalid course id",
            });
        }
        const course = await courseService.getCourseById(courseId);
        res.json({ data: course });
    } catch (err) {
        next(err);
    }
};

