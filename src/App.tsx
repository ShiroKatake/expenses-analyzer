import { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import Papa from "papaparse";
import "./App.css";

export const App = () => {
  const [csv, setCsv] = useState<FileList | null>();
  const [data, setData] = useState<any>(null);

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      console.log("Finished:", data);
    }
  }, [data]);

  const handleOnSubmit = () => {
    if (csv) {
      Papa.parse(csv[0], {
        header: true,
        complete: function (results) {
          setData(results.data);
        },
      });
    }
  };

  const findMostExpensivePurchase = (resultArray: any[]) => {
    const purchase = resultArray.sort((a, b) => a.Amount - b.Amount)[0];
    const date = purchase.Date;
    const name = purchase.Name;
    const amount = `$${Math.abs(purchase.Amount)}`;
    const balance = `$${Math.abs(purchase.Balance)}`;
    return (
      <p>
        Your most expensive purchase was "{name}" at {amount}
      </p>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Expenses Analyzer</p>
        <input
          type="file"
          name="csv_upload"
          accept=".csv"
          onChange={(e) => {
            setCsv(e.target.files);
          }}
        />
        <button type="button" onClick={handleOnSubmit}>
          Analyze
        </button>
        {data && findMostExpensivePurchase(data)}
      </header>
    </div>
  );
};
