import { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import Papa from "papaparse";
import "./App.css";
import { findMostExpensivePurchase } from "./analysis/findMostExpensivePurchase";
import { Transaction } from "./types/transaction";

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        {transactionData.length > 0 && findMostExpensivePurchase(transactionData)}
      </header>
    </div>
  );
};
