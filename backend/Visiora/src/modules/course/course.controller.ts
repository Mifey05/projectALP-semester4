import type { NextFunction, Request, Response } from "express";
import * as courseService from "./course.service.js";

export const getCourses = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const courses = await courseService.getCourses();
		res.json(courses);
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
		const courseId = Number(req.params.id);

		if (!Number.isFinite(courseId)) {
			return res.status(400).json({ message: "Invalid course id" });
		}

		const course = await courseService.getCourseById(courseId);

		if (!course) {
			return res.status(404).json({ message: "Course not found" });
		}

		res.json(course);
	} catch (err) {
		next(err);
	}
};
