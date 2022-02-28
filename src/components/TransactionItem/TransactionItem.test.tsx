import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TransactionItem } from "./TransactionItem";
import transactionData from "../../mocks/transactionData";

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
    let inputDiv = screen.getByText("Purchase A");
    fireEvent.mouseOver(inputDiv);
    fireEvent.keyPress(inputDiv, { key: "KeyT", charCode: 84 });
    expect(component).toMatchSnapshot();
  });
});
