import { TagManager, FileInput, TransactionList } from "./components";
import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <p>Expenses Analyzer</p>
      <FileInput />
      <TagManager />
      <TransactionList />
      {/* {transactionData.length > 0 && findMostExpensivePurchase(transactionData)} */}
    </div>
  );
};
