import { cleanup, render, screen } from "@testing-library/react";
import { TransactionItem } from "./TransactionItem";
import transactionData from "../../mocks/transactionData";
import userEvent from "@testing-library/user-event";
import { AppContextProvider } from "../../context/AppContext";
import { TagManager } from "..";

describe("TransactionItem", () => {
  beforeEach(() => {
    render(
      <AppContextProvider>
        <TagManager />
        <table>
          <tbody>
            {transactionData.map((transaction, index) => {
              return <TransactionItem key={index} transaction={transaction} index={index} />;
            })}
          </tbody>
        </table>
      </AppContextProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("should not show tag list when pressed T but row is not hovered", () => {
    userEvent.keyboard("t");
    expect(screen.queryByText("New tag")).toBeFalsy();
  });

  it("should show tag list when pressed T and row is hovered", () => {
    tryBringUpTagList();
    expect(screen.queryByText("New tag")).toBeTruthy();
  });

  it("should hide tag list when clicked outside of component", () => {
    const inputDiv = tryBringUpTagList();

    userEvent.unhover(inputDiv);
    userEvent.click(document.body);
    expect(screen.queryByText("New tag")).toBeFalsy();
  });
});

const tryBringUpTagList = () => {
  const inputDiv = screen.getByText("02 Apr 2020");
  userEvent.hover(inputDiv);
  userEvent.keyboard("t");
  return inputDiv;
}