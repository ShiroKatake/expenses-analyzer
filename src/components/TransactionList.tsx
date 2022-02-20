import { Transaction } from "../types/transaction";
import { stringToDate } from "../utils/stringToDate";

interface Transactions {
  transactionData: Transaction[];
}

export const TransactionList = ({ transactionData }: Transactions) => {
  const transactionList = transactionData.map((transaction, index) => {
    return (
      <tr key={index}>
        <td>{stringToDate(transaction.date)}</td>
        <td>{transaction.name}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.balance}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Transaction Name</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>{transactionList}</tbody>
    </table>
  );
};
