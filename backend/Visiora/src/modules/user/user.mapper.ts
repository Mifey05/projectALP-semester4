type User = {
	user_id: number;
	name: string;
	email: string;
	password_hash: string;
	created_at: Date;
	updated_at: Date;
};

type SubscriptionPlan = {
	plan_id: number;
	name: string;
	tier: number;
	price: number;
	created_at: Date;
	updated_at: Date;
};

type Transaction = {
	transaction_id: number;
	user_id: number;
	subscription_id: number;
	provider: string;
	amount: number;
	status: string;
	created_at: Date;
	updated_at: Date;
};

type Enterprise = {
	enterprise_id: number;
	user_id: number;
	enterprise_name: string;
	enterprise_type: string;
	address: string;
	tiktok: string;
	instagram: string;
	whatsapp: string;
	created_at: Date;
	updated_at: Date;
};

export type UserDto = Omit<User, "password_hash">;
export type SubscriptionPlanDto = SubscriptionPlan;
export type TransactionDto = Transaction;
export type EnterpriseDto = Enterprise;

export const mapUser = (user: User): UserDto => {
	const { password_hash, ...safeUser } = user;
	return safeUser;
};

export const mapPlan = (plan: SubscriptionPlan): SubscriptionPlanDto => plan;

export const mapTransaction = (transaction: Transaction): TransactionDto => transaction;

export const mapEnterprise = (enterprise: Enterprise): EnterpriseDto => enterprise;
