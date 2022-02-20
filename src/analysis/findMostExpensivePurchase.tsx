import { Transaction } from "../types/transaction";
import { stringToDate } from "../utils/stringToDate";

// Might need to convert this to component instead of function
export const findMostExpensivePurchase = (resultArray: Transaction[]) => {
  const deepCopy = JSON.parse(JSON.stringify(resultArray)) as Transaction[];
  const purchase = deepCopy.sort((a, b) => a.amount - b.amount)[0];
  const date = stringToDate(purchase.date);
  const amount = `$${Math.abs(purchase.amount)}`;
  return (
    <p data-testid="most-expensive">
      Most expensive purchase: "{purchase.name}" on {date} for {amount}
    </p>
  );
};
