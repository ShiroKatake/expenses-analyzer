import { TagManager, FileInput } from "./components";
import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <p>Expenses Analyzer</p>
      <FileInput />
      <TagManager />
      {/* {transactionData.length > 0 && <TransactionList />}
      {transactionData.length > 0 && findMostExpensivePurchase(transactionData)} */}
    </div>
  );
};
