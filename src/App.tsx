import { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import Papa from "papaparse";
import "./App.css";

export const App = () => {
  const [csv, setCsv] = useState<FileList | null>();
  const [data, setData] = useState<any>(null);
  const [output, setOutput] = useState<any>({
    mostExpensive: {},
  });

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      console.log("Finished:", data);
      setOutput((prevState: any) => ({
        ...prevState,
        mostExpensive: findMostExpensive(data),
      }));
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

  const findMostExpensive = (resultArray: any[]) => {
    return resultArray.sort((a, b) => a.Amount - b.Amount)[0];
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
        {data && (
          <p>
            Your most expensive purchase was "{output.mostExpensive.Name}" at{" "}
            {`$${Math.abs(output.mostExpensive.Amount)}`}
          </p>
        )}
      </header>
    </div>
  );
};
