import React, { createContext, useContext, useState } from "react";
import { Transaction } from "../types/transaction";

export interface IAppContext {
  transactionData: Transaction[];
  isHidden: boolean;
  setTransactionData: (val: Transaction[]) => void;
  updateTransactionName: (transactionName: string, index: number) => void;
  setIsHidden: (val: boolean) => void;
}

export interface IAppContextProps {
  mockData?: Transaction[];
  children?: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ mockData, children }: IAppContextProps) => {
  const [transactionData, setTransactionData] = useState<Transaction[]>(mockData || []);
  const [isHidden, setIsHidden] = useState(true);

  const updateTransactionName = (transactionName: string, index: number) => {
    let deepCopy = JSON.parse(JSON.stringify(transactionData));
    deepCopy[index].name = transactionName;
    setTransactionData(deepCopy);
  };

  const appContext: IAppContext = {
    transactionData,
    isHidden,
    setTransactionData,
    updateTransactionName,
    setIsHidden,
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
