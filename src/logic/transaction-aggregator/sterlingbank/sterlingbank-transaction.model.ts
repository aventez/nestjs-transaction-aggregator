export interface SterlingBankTransaction {
  id: string;
  currency: string;
  amount: number;
  direction: string;
  narrative: string;
  created: string;
  reference: string;
}
