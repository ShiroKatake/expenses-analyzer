import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import transactionData from "./transactionData";

export const TransactionContextInitializer = () => {
  const { setTransactionData } = useAppContext();
  useEffect(() => {
    setTransactionData(transactionData);
  }, []);
  return <></>;
};
