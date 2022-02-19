//prettier-ignore
export interface Transaction {
  date: string;       // Date the transaction was made
  processed: string;  // Date the money was processed
  name: string;       // Transaction name
  amount: number;     // Amount debited or credited
  balance: number;    // Account balance
}
