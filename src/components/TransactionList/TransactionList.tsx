import { TransactionItem } from "..";
import { useAppContext } from "../../context/AppContext";
import { StyledTable } from "./TransactionList.styled";

export const TransactionList = () => {
  const { transactionData } = useAppContext();

  const transactionItems = transactionData.map((transaction, index) => (
    <TransactionItem key={index} transaction={transaction} index={index} />
  ));

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Date</th>
          <th>Transaction Name</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Tag</th>
        </tr>
      </thead>
      <tbody>{transactionItems}</tbody>
    </StyledTable>
  );
};
