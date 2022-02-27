import { useEffect, useRef } from "react";
import { stringToDate } from "../../utils/stringToDate";
import { InlineTextInput } from "../InlineTextInput/InlineTextInput";
import { Transaction } from "../../types/transaction";

interface ITransactionItemProps {
  transaction: Transaction;
  index: number;
}

export const TransactionItem = ({ transaction, index }: ITransactionItemProps) => {
  const rowRef = useRef<HTMLTableRowElement>(null);
  let isHovered = false;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || !isHovered) {
        return;
      }
      if (event.code === "KeyT") {
        console.log(`Add tag item ${index}`);
      }
    };

    if (rowRef.current !== null) {
      document.addEventListener("keydown", handleKeyDown);
      rowRef.current.addEventListener("mouseenter", () => (isHovered = true));
      rowRef.current.addEventListener("mouseleave", () => (isHovered = false));
    }

    return function cleanup() {
      if (rowRef.current !== null) {
        document.removeEventListener("keydown", handleKeyDown);
        rowRef.current.removeEventListener("mouseenter", () => (isHovered = true));
        rowRef.current.removeEventListener("mouseleave", () => (isHovered = false));
      }
    };
  }, []);

  return (
    <tr ref={rowRef}>
      <td>{stringToDate(transaction.date)}</td>
      <td>
        <InlineTextInput transactionName={transaction.name} transactionIndex={index} />
      </td>
      <td>{transaction.amount}</td>
      <td>{transaction.balance}</td>
      <td></td>
    </tr>
  );
};
