import * as service from "./user.service.js";
import * as mapper from "./user.mapper.js";
import type { Request, Response, NextFunction } from "express";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const items = await service.getUsers();
		res.json(items.map(mapper.toDto));
	} catch (err) {
		next(err);
	}
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const item = await service.getUserById(id);
		if (!item) return res.status(404).json({ message: "User not found" });
		res.json(mapper.toDto(item));
	} catch (err) {
		next(err);
	}
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload = req.body;
		const created = await service.createUser(payload);
		res.status(201).json(mapper.toDto(created));
	} catch (err) {
		next(err);
	}
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const payload = req.body;
		const updated = await service.updateUser(id, payload);
		res.json(mapper.toDto(updated));
	} catch (err) {
		next(err);
	}
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = String(req.params.id);
		const result = await service.deleteUser(id);
		res.json(result);
	} catch (err) {
		next(err);
	}
};
