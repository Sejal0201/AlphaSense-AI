import {
  createContext,
  useContext,
  useState,
  
} from "react";
import type { ReactNode } from "react";
interface StockContextType {
  symbol: string;
  setSymbol: (symbol: string) => void;
}

const StockContext =
  createContext<StockContextType | null>(null);

export function StockProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [symbol, setSymbol] = useState("AAPL");

  return (
    <StockContext.Provider
      value={{
        symbol,
        setSymbol,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);

  if (!context) {
    throw new Error(
      "useStock must be used inside StockProvider"
    );
  }

  return context;
}