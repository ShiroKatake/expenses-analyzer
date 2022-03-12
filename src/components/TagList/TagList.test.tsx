import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TagManager } from "./TagList";

describe("TagManager", () => {
  const { container } = render(<TagManager />);
  afterEach(() => {
    cleanup();
  });

  it("integration testing", async () => {
    let inputDiv = screen.getByText("New tag");
    fireEvent.click(inputDiv);
    expect(inputDiv).not.toBeInTheDocument();

    const input = container.querySelector("input") as HTMLInputElement;
    userEvent.type(input, "abc{enter}");
    expect(input.value).toBe("abc");

    inputDiv = screen.getByText("New tag");
    expect(inputDiv).toBeInTheDocument();

    const removeButton = screen.getByTestId("remove-tag");
    fireEvent.click(removeButton);
    expect(input).not.toBeInTheDocument();
  });
});
