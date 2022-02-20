import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";
import "./App.css";
import { findMostExpensivePurchase } from "./analysis/findMostExpensivePurchase";
import { Transaction } from "./types/transaction";
import { TransactionList } from "./components/TransactionList";

export const App = () => {
  const [csv, setCsv] = useState<FileList | null>();
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      console.log("Finished:", transactionData);
    }
  }, [transactionData]);

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
      <TransactionList transactionData={transactionData} />
      {transactionData.length > 0 && findMostExpensivePurchase(transactionData)}
    </div>
  );
};
