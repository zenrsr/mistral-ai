const data = [
  {
    transaction_id: "T1001",
    cutomer_id: "C001",
    payment_amount: 125.5,
    payment_date: "2021-01-01",
    payment_status: "Paid"
  },
  {
    transaction_id: "T1002",
    cutomer_id: "C002",
    payment_amount: 150.75,
    payment_date: "2021-01-02",
    payment_status: "Paid"
  },
  {
    transaction_id: "T1003",
    cutomer_id: "C003",
    payment_amount: 200.0,
    payment_date: "2021-01-03",
    payment_status: "Paid"
  },
  {
    transaction_id: "T1004",
    cutomer_id: "C004",
    payment_amount: 75.25,
    payment_date: "2021-01-04",
    payment_status: "Paid"
  },
  {
    transaction_id: "T1005",
    cutomer_id: "C005",
    payment_amount: 100.5,
    payment_date: "2021-01-05",
    payment_status: "Paid"
  }
];

export function getPaymentStatus({ transactionId }) {
  const transaction = data.find((row) => row.transaction_id === transactionId);
  if (transaction) {
    return JSON.stringify({ status: transaction.payment_status });
  }
  return JSON.stringify({ error: "transaction id not found." });
}

export function getPaymentDate({ transactionId }) {
  const transaction = data.find((row) => row.transaction_id === transactionId);
  if (transaction) {
    return JSON.stringify({ date: transaction.payment_date });
  }
  return JSON.stringify({ error: "transaction id not found." });
}

export const tools = [
  {
    type: "function",
    function: {
      name: "getPaymentStatus",
      description: "Get payment status of a transaction",
      parameters: {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            description: "The transaction id."
          }
        },
        required: ["transactionId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getPaymentDate",
      description: "Get payment date of a transaction",
      parameters: {
        type: "object",
        properties: {
          transactionId: {
            type: "string",
            description: "The transaction id."
          }
        },
        required: ["transactionId"]
      }
    }
  }
];
