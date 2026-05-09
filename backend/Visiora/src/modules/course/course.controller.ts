import * as service from "./course.service.js";
import * as mapper from "./course.mapper.js";
import type { Request, Response, NextFunction } from "express";

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const items = await service.getCourses();
		res.json({ data: items.map(mapper.toDto) });
	} catch (err) {
		next(err);
	}
};

export const getCourseById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const item = await service.getCourseById(id);
		if (!item) return res.status(404).json({ message: "Course not found" });
		res.json({ data: mapper.toDto(item) });
	} catch (err) {
		next(err);
	}
};

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload = req.body;
		const created = await service.createCourse(payload);
		res.status(201).json({ data: mapper.toDto(created) });
	} catch (err) {
		next(err);
	}
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const payload = req.body;
		const updated = await service.updateCourse(id, payload);
		res.json({ message: "Course updated", data: mapper.toDto(updated) });
	} catch (err) {
		next(err);
	}
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const result = await service.deleteCourse(id);
		res.json(result);
	} catch (err) {
		next(err);
	}
};
