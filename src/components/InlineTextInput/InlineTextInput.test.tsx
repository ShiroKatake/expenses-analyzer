import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InlineTextInput } from "./InlineTextInput";
import { AppContextProvider } from "../../context/AppContext";
import transactionData from "../../mocks/transactionData";

describe("InlineTextInput", () => {
  const { container } = render(
    <AppContextProvider mockData={transactionData}>
      <InlineTextInput transactionName="Purchase A" transactionIndex={0} />
    </AppContextProvider>
  );
  afterEach(() => {
    cleanup();
  });

  it("should update transaction name after editing input", () => {
    let inputDiv = screen.getByText("Purchase A");
    fireEvent.click(inputDiv);
    expect(inputDiv).not.toBeInTheDocument();

    const input = container.querySelector("input") as HTMLInputElement;
    userEvent.type(input, "abc{enter}");
    expect(input.value).toBe("Purchase Aabc");
  });
});
