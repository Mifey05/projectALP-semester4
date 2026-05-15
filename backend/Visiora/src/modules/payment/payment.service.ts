import * as transactionRepo from "../payment/transaction.repository.js";
import * as subscriptionRepo from "../user/subscription.repository.js";
import * as planRepo from "../user/plan.repository.js";

type Provider = "OVO" | "GoPay" | "Dana" | "ShopeePay";

export const createPayment = async (userId: number, planId: number, provider: Provider) => {
    const plan = await planRepo.findById(planId);
    if (!plan) throw new Error("Plan not found");
    const subscriptionId = await subscriptionRepo.create({
        user_id: userId,
        plan_id: planId,
        status: "INACTIVE",
        start_date: null,
        end_date: null,
    });
    const transactionId = await transactionRepo.create({
        user_id: userId,
        subscription_id: subscriptionId,
        provider,
        amount: plan.price,
        status: "PENDING",
    });
    setTimeout(async () => {
        try {
            await completePayment(transactionId, userId);
        } catch (err) {
            console.error(err);
        }
    }, 3000);
    return {
        transaction_id: transactionId,
        status: "PENDING",
    };
}

export const getPaymentStatus = async (transactionId: number, userId: number) => {
    const transaction = await transactionRepo.findByIdAndUser(transactionId, userId);
    if (!transaction) throw new Error("Transaction not found");
    return {
        transaction_id: transaction.transaction_id,
        status: transaction.status,
    };
}

export const completePayment = async (transactionId: number, userId: number) => {
    const transaction = await transactionRepo.findByIdAndUser(transactionId, userId);
    if (!transaction) throw new Error("Transaction not found");
    if (transaction.status !== "PENDING") throw new Error("Transaction is not pending");

    await transactionRepo.updateStatus(transactionId, "SUCCESS");
    const startDate = new Date();

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    await subscriptionRepo.activate(transaction.subscription_id, startDate, endDate);
    return { message: "Payment completed" };
}

export const failPayment = async (transactionId: number, userId: number) => {
    const transaction = await transactionRepo.findByIdAndUser(transactionId, userId);
    if (!transaction) throw new Error("Transaction not found");
    if (transaction.status !== "PENDING") throw new Error("Transaction is not pending");

    await transactionRepo.updateStatus(transactionId, "FAILED");
    await subscriptionRepo.updateStatus(transaction.subscription_id, "CANCELLED");
    return { message: "Payment failed" };
}