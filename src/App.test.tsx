import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { App } from "./App";
import { AppContextProvider } from "./context/AppContext";

describe("App", () => {
  render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
  afterEach(() => {
    cleanup();
  });

  it("should not work with these edge cases", async () => {
    const file = new File(
      [
        `date,name,amount,balance
        01-Apr-20,Purchase A,10,110
        02-Apr-20,Purchase B,-13.23,96.77
        02-Apr-20,Purchase C,-200,-103.23
        `,
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
      const text = screen.getByTestId("most-expensive");
      expect(text).toBeTruthy();
    });
  });
});
