import Papa from "papaparse";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Transaction } from "../../types/transaction";

export const FileInput = () => {
  const [csv, setCsv] = useState<FileList | null>(null);

  const { setTransactionData } = useAppContext();

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
    <>
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
    </>
  );
};
