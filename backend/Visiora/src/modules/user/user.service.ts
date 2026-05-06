import * as userRepo from "./user.repository.js";
import * as planRepo from "./plan.repository.js";
import * as transactionRepo from "./transaction.repository.js";
import * as enterpriseRepo from "./enterprise.repository.js";
import { mapPlan, mapTransaction, mapEnterprise, mapUser } from "./user.mapper.js";

export type UpdateUserInput = {
	name?: string;
	email?: string;
};

export const getUserById = async (userId: number) => {
	const user = await userRepo.findById(userId);
	return user ? mapUser(user) : null;
};

export const updateUser = async (userId: number, data: UpdateUserInput) => {
	await userRepo.update(userId, data);
};

export const getPlans = async () => {
	const plans = await planRepo.findAll();
	return plans.map(mapPlan);
};

export const getTransactionsByUser = async (userId: number) => {
	const transaction = await transactionRepo.findByUser(userId);
	return transaction ? [mapTransaction(transaction)] : [];
};

export const getEnterpriseByUser = async (userId: number) => {
	const enterprise = await enterpriseRepo.findByUserId(userId);
	return enterprise ? mapEnterprise(enterprise) : null;
};
