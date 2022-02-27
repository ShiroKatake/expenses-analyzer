import { useAppContext } from "../../context/AppContext";
import { StyledInlineTextInput } from "./InlineTextInput.styled";
import "react-edit-text/dist/index.css";

interface InlineTextInputProps {
  transactionName: string;
  transactionIndex: number;
}

export const InlineTextInput = ({ transactionName, transactionIndex }: InlineTextInputProps) => {
  const { updateTransactionName } = useAppContext();

  return (
    <StyledInlineTextInput
      defaultValue={transactionName}
      onSave={({ value }) => updateTransactionName(value, transactionIndex)}
    />
  );
};
