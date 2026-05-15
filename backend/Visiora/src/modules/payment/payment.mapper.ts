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

type TransactionStatusResponse = {
    transaction_id: number;
    status: string;
};

export const toTransactionStatusResponse = (
    transaction: Transaction
): TransactionStatusResponse => {
    return {
        transaction_id: transaction.transaction_id,
        status: transaction.status,
    };
};