import * as service from "./design.service.js";
import * as mapper from "./design.mapper.js";
import type { Request, Response, NextFunction } from "express";

export const getDesigns = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const items = await service.getDesigns();
		res.json({ data: items.map(mapper.toDto) });
	} catch (err) {
		next(err);
	}
};

export const getDesignById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const item = await service.getDesignById(id);
		if (!item) return res.status(404).json({ message: "Design not found" });
		res.json({ data: mapper.toDto(item) });
	} catch (err) {
		next(err);
	}
};

export const createDesign = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload = req.body;
		const created = await service.createDesign(payload);
		res.status(201).json({ data: mapper.toDto(created) });
	} catch (err) {
		next(err);
	}
};

export const updateDesign = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const payload = req.body;
		const updated = await service.updateDesign(id, payload);
		res.json({ message: "Design updated successfully", data: mapper.toDto(updated) });
	} catch (err) {
		next(err);
	}
};

export const deleteDesign = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const result = await service.deleteDesign(id);
		res.json(result);
	} catch (err) {
		next(err);
	}
};
