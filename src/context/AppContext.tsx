import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Transaction } from "../types/transaction";

export interface IAppContext {
  transactionData: Transaction[];
  setTransactionData: (val: Transaction[]) => void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC = ({ children }) => {
  const [transactionData, setTransactionData] = useState<Transaction[]>([]);

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      console.log("Finished:", transactionData);
    }
  }, [transactionData]);

  const appContext: IAppContext = {
    transactionData,
    setTransactionData,
  };

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>;
};
