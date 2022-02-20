import { useAppContext } from "../../context/AppContext";
import { StyledInlineTextInput } from "./InlineTextInput.styled";
import "react-edit-text/dist/index.css";

interface InlineTextInputProps {
  transactionIndex: number;
}

export const InlineTextInput = ({ transactionIndex }: InlineTextInputProps) => {
  const { transactionData, setTransactionData } = useAppContext();

  const handleOnSave = ({ value }: any) => {
    let copiedTransactions = JSON.parse(JSON.stringify(transactionData));
    copiedTransactions[transactionIndex].name = value;
    setTransactionData(copiedTransactions);
  };

  return (
    <StyledInlineTextInput
      defaultValue={transactionData[transactionIndex].name}
      onSave={handleOnSave}
    />
  );
};
