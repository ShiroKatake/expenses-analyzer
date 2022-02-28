import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { AppContextProvider, useAppContext } from "../../context/AppContext";
import { FileInput } from "./FileInput";

const OutputTest = () => {
  const { transactionData } = useAppContext();
  const transactions = transactionData.map((transaction, index) => {
    return <p key={index}>{transaction.name}</p>;
  });
  return <>{transactions}</>;
};

describe("File Input", () => {
  render(
    <AppContextProvider>
      <FileInput />
      <OutputTest />
    </AppContextProvider>
  );
  afterEach(() => {
    cleanup();
  });

  it("should load in correct data", async () => {
    const file = new File(
      [
        `date,name,amount,balance
        01-Apr-20,Purchase A,10,110
        02-Apr-20,Purchase B,-13.23,96.77
        02-Apr-20,Purchase C,-200,-103.23`,
      ],
      "transactions.csv",
      { type: "text/csv" }
    );

    const input = screen.getByTestId("csv-input");
    const submit = screen.getByTestId("submit");

    act(() => {
      user.upload(input, file);
    });
    act(() => {
      fireEvent.click(submit);
    });

    await waitFor(() => {
      const text = screen.getByText("Purchase A");
      expect(text).toBeInTheDocument();

      const nonExistentText = screen.queryByText("Purchase D");
      expect(nonExistentText).toBe(null);
    });
  });
});
