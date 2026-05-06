import type { NextFunction, Request, Response } from "express";
import * as designService from "./design.service.js";

export const getDesigns = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = Number(req.query.userId);

		if (!Number.isFinite(userId)) {
			return res.status(400).json({ message: "userId is required" });
		}

		const designs = await designService.getDesignsByUser(userId);
		res.json(designs);
	} catch (err) {
		next(err);
	}
};

export const createDesign = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const designId = await designService.createDesign(req.body);
		res.status(201).json({ message: "Design created", design_id: designId });
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
		const designId = Number(req.params.id);

		if (!Number.isFinite(designId)) {
			return res.status(400).json({ message: "Invalid design id" });
		}

		await designService.updateDesign(designId, req.body);
		res.json({ message: "Design updated" });
	} catch (err) {
		next(err);
	}
};
