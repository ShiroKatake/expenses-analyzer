import { cleanup, render, screen } from "@testing-library/react";
import { TransactionList } from "./TransactionList";
import { AppContextProvider } from "../../context/AppContext";
import { TransactionContextInitializer } from "../../mocks/TransactionContextInitializer";

describe("TransactionList", () => {
  render(
    <AppContextProvider>
      <TransactionContextInitializer />
      <TransactionList />
    </AppContextProvider>
  );
  afterEach(() => {
    cleanup();
  });

  it("should update transaction name after editing input", () => {
    const dates = screen.getAllByTestId("date");
    const names = screen.getAllByTestId("name");
    const amounts = screen.getAllByTestId("amount");
    const balances = screen.getAllByTestId("balance");

    expect(dates[1].textContent).toBe("02 Apr 2020");
    expect(names[1].textContent).toBe("Purchase B");
    expect(amounts[1].textContent).toBe("-13.23");
    expect(balances[1].textContent).toBe("96.77");
  });
});
