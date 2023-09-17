type TransactionType = "DEBIT" | "CREDIT";

export interface UnifiedTransaction {
  id: string;
  created: string;
  description?: string;
  amount: {
    value: string;
    currency: string;
  };
  type: TransactionType;
  reference: string;
  metadata: {
    source: string;
  };
}
