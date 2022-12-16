import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../api';
import { endPoints } from '../api/endPoints';
import type { StockType } from '../types';

type StockContextType = {
  stocks: StockType[];
  stocksCount: number;
  handleFetchStocks: () => void;
};

const StockContext = createContext<StockContextType>({
  stocks: [],
  stocksCount: 0,
  handleFetchStocks: () => {},
});

export const StockProvider: React.FC = ({
  children,
}: React.EmbedHTMLAttributes<any>) => {
  const [stocks, setStocks] = useState<StockType[] | any>();
  const [stocksCount, setStocksCount] = useState(0);

  useEffect(() => {
    handleFetchStocks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchStocks = useCallback(async () => {
    try {
      const response = await api.get(endPoints.stocks);
      setStocks(response.data?.data?.stocks);
      setStocksCount(response.data?.data?.stocksCount);
    } catch (error: unknown) {
      console.error(error);
    }
  }, []);

  return (
    <StockContext.Provider
      value={{
        stocks,
        stocksCount,
        handleFetchStocks,
      }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = (): StockContextType => useContext(StockContext);
