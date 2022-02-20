import { useAppContext } from "../../context/AppContext";
import { stringToDate } from "../../utils/stringToDate";
import { InlineTextInput } from "../InlineTextInput/InlineTextInput";

export const TransactionList = () => {
  const { transactionData } = useAppContext();
  const transactionList = transactionData.map((transaction, index) => {
    return (
      <tr key={index}>
        <td>{stringToDate(transaction.date)}</td>
        <td>
          <InlineTextInput transactionIndex={index} />
        </td>
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
