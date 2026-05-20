export const PaymentService = {
  getPaymentMethods() {
    return [
      { id: 1, name: "GoPay", accountNumber: "628987****1" },
      { id: 2, name: "ShopeePay", accountNumber: "628987****1" },
      { id: 3, name: "OVO", accountNumber: "628987****1" },
      { id: 4, name: "DANA", accountNumber: "628987****1" },
    ];
  },

  async pay(planId: number, provider: string) {
    const response = await fetch("http://192.168.1.90:3000/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            planid: planId,
            provider: provider,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Pembayaran gagal");
    }

    return response.json();
  },
};