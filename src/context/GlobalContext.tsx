'use client';
import { ReactNode, createContext, useContext, useState } from 'react';

type GlobalContextType = {
  selectedGame: string;
  setSelectedGame: React.Dispatch<React.SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGame, setSelectedGame] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        selectedGame,
        setSelectedGame,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
