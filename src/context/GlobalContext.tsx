'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

type GlobalContextType = {
  gameBoard: string;
  setGameBoard: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [gameBoard, setGameBoard] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        gameBoard,
        setGameBoard,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
