import React, { createContext, useContext, useState, ReactNode } from "react";

type GlobalContextType = {
  globalParam: boolean;
  setGlobalParam: (value: boolean) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [globalParam, setGlobalParam] = useState<boolean>(false);

  return (
    <GlobalContext.Provider value={{ globalParam, setGlobalParam }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
