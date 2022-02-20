import { useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { findMostExpensivePurchase } from "./analysis/findMostExpensivePurchase";
import { Transaction } from "./types/transaction";
import { TransactionList } from "./components/TransactionList/TransactionList";
import { useAppContext } from "./context/AppContext";

export const App = () => {
  const [csv, setCsv] = useState<FileList | null>();

  const { transactionData, setTransactionData } = useAppContext();

  const handleOnSubmit = () => {
    if (csv) {
      Papa.parse(csv[0], {
        header: true,
        complete: function (results) {
          setTransactionData(results.data as Transaction[]);
        },
      });
    }
  };

  return (
    <div className="App">
      <p>Expenses Analyzer</p>
      <input
        data-testid="csv-input"
        type="file"
        name="csv_upload"
        accept=".csv"
        onChange={(e) => {
          setCsv(e.target.files);
        }}
      />
      <button data-testid="submit" type="button" onClick={handleOnSubmit}>
        Analyze
      </button>
      {transactionData.length > 0 && <TransactionList />}
      {transactionData.length > 0 && findMostExpensivePurchase(transactionData)}
    </div>
  );
};
