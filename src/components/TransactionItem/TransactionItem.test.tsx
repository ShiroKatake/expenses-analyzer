import { cleanup, render, screen } from "@testing-library/react";
import { TransactionItem } from "./TransactionItem";
import transactionData from "../../mocks/transactionData";
import userEvent from "@testing-library/user-event";

describe("TransactionItem", () => {
  const component = render(
    <table>
      <tbody>
        {transactionData.map((transaction, index) => {
          return <TransactionItem key={index} transaction={transaction} index={index} />;
        })}
      </tbody>
    </table>
  );
  afterEach(() => {
    cleanup();
  });

  it("should update transaction name after editing input", () => {
    let inputDiv = screen.getByText("02 Apr 2020");
    userEvent.hover(inputDiv);
    userEvent.keyboard("t");
    userEvent.unhover(inputDiv);
    expect(component).toMatchSnapshot();
  });
});
