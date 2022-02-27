import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Transaction } from "../types/transaction";

export interface IAppContext {
  transactionData: Transaction[];
  setTransactionData: (val: Transaction[]) => void;
  updateTransactionName: (transactionName: string, index: number) => void;
}

export interface IAppContextProps {
  mockData?: Transaction[];
  children?: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ mockData, children }: IAppContextProps) => {
  const [transactionData, setTransactionData] = useState<Transaction[]>(mockData || []);

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      console.log("Finished:", transactionData);
    }
  }, [transactionData]);

  const updateTransactionName = (transactionName: string, index: number) => {
    let deepCopy = JSON.parse(JSON.stringify(transactionData));
    deepCopy[index].name = transactionName;
    setTransactionData(deepCopy);
  };

  const appContext: IAppContext = {
    transactionData,
    setTransactionData,
    updateTransactionName,
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
