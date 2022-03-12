import { useEffect, useRef } from "react";
import { stringToDate } from "../../utils/stringToDate";
import { InlineTextInput } from "..";
import { Transaction } from "../../types/transaction";
import { useAppContext } from "../../context/AppContext";

interface ITransactionItemProps {
  transaction: Transaction;
  index: number;
}

export const TransactionItem = ({ transaction, index }: ITransactionItemProps) => {
  const { setIsHidden } = useAppContext();
  const rowRef = useRef<HTMLTableRowElement>(null);
  let isHovered = false;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isHovered || event.repeat) {
        return;
      }
      if (event.code === "KeyT") {
        console.log(`Add tag item ${index}`);
        setIsHidden(false);
        // Set position
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    if (rowRef.current) {
      rowRef.current.addEventListener("mouseenter", () => (isHovered = true));
      rowRef.current.addEventListener("mouseleave", () => (isHovered = false));
    }

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
      /* istanbul ignore next */
      if (rowRef.current) {
        rowRef.current.removeEventListener("mouseenter", () => (isHovered = true));
        rowRef.current.removeEventListener("mouseleave", () => (isHovered = false));
      }
    };
  }, []);

  return (
    <tr ref={rowRef}>
      <td data-testid="date">{stringToDate(transaction.date)}</td>
      <td data-testid="name">
        <InlineTextInput transactionName={transaction.name} transactionIndex={index} />
      </td>
      <td data-testid="amount">{transaction.amount}</td>
      <td data-testid="balance">{transaction.balance}</td>
      <td></td>
    </tr>
  );
};
