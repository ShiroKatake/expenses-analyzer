import { useEffect, useState } from "react";
import logo from "./logo.svg";
import Papa from "papaparse";
import "./App.css";

export const App = () => {
  const [csv, setCsv] = useState<FileList | null>();
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("Finished:", data);
  }, [data]);

  const handleOnSubmit = () => {
    if (csv) {
      Papa.parse(csv[0], {
        complete: function (results) {
          setData(results.data);
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
          type="file"
          name="csv_upload"
          accept=".csv"
          onChange={(e) => {
            setCsv(e.target.files);
          }}
        />
        <button type="button" onClick={handleOnSubmit}>
          Submit
        </button>
      </header>
    </div>
  );
};
