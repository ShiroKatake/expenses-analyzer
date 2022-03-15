import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TagManager } from "./TagList";

describe("TagManager", () => {
  let renderContainer: any;
  beforeEach(() => {
    const { container } = render(<TagManager />);
    renderContainer = container;
  });
  afterEach(() => {
    cleanup();
  });

  it("should switch from button to text input on click", async () => {
    const { textInput, inputButton } = testSetup(renderContainer);

    expect(inputButton).not.toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
  });

  it("should add new tag", async () => {
    const { textInput } = testSetup(renderContainer);
    userEvent.type(textInput, "abc{enter}");

    const updatedInputButton = screen.getByRole("button", { name: "abc" });
    expect(updatedInputButton).toBeInTheDocument();
    expect(textInput).not.toBeInTheDocument();
  });

  it("should edit when clicked edit button", async () => {
    const { textInput } = testSetup(renderContainer);
    userEvent.type(textInput, "a{enter}");

    const editButton = screen.getByTestId("edit-tag");
    userEvent.click(editButton);
    const newTextInput = renderContainer.querySelector("input") as HTMLInputElement;
    userEvent.type(newTextInput, "bc{enter}");

    const updatedInputButton = screen.getByRole("button", { name: "bc" });
    expect(updatedInputButton).toBeInTheDocument();
  });

  it("should remove when clicked remove button", async () => {
    const { textInput } = testSetup(renderContainer);
    userEvent.type(textInput, "a{enter}");

    const removeButton = screen.getByTestId("remove-tag");
    userEvent.click(removeButton);
    expect(textInput).not.toBeInTheDocument();
  });
});

const testSetup = (renderContainer: any) => {
  const inputButton = screen.getByText("Add tag");
  userEvent.click(inputButton);
  const textInput = renderContainer.querySelector("input") as HTMLInputElement;
  return { textInput, inputButton };
}