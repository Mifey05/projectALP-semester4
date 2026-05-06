import type { NextFunction, Request, Response } from "express";
import * as userService from "./user.service.js";

export const getUserById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = Number(req.params.id);

		if (!Number.isFinite(userId)) {
			return res.status(400).json({ message: "Invalid user id" });
		}

		const user = await userService.getUserById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.json(user);
	} catch (err) {
		next(err);
	}
};

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = Number(req.params.id);

		if (!Number.isFinite(userId)) {
			return res.status(400).json({ message: "Invalid user id" });
		}

		await userService.updateUser(userId, req.body);
		res.json({ message: "User updated" });
	} catch (err) {
		next(err);
	}
};

export const getPlans = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const plans = await userService.getPlans();
		res.json(plans);
	} catch (err) {
		next(err);
	}
};

export const getTransactionsByUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = Number(req.params.id);

		if (!Number.isFinite(userId)) {
			return res.status(400).json({ message: "Invalid user id" });
		}

		const transactions = await userService.getTransactionsByUser(userId);
		res.json(transactions);
	} catch (err) {
		next(err);
	}
};

export const getEnterpriseByUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = Number(req.params.id);

		if (!Number.isFinite(userId)) {
			return res.status(400).json({ message: "Invalid user id" });
		}

		const enterprise = await userService.getEnterpriseByUser(userId);
		res.json(enterprise);
	} catch (err) {
		next(err);
	}
};
