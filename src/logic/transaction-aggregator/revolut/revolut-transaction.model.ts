export interface RevolutTransaction {
  id: string;
  created_at: string;
  completed_at: string;
  state: string;
  amount: {
    value: number;
    currency: string;
  };
  merchant: any;
  counterparty: {
    id: string;
    name: string;
  };
  reference: string;
}
