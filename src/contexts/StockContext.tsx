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
  errors: any[];
  fetching: boolean;
  handleFetchStocks: () => void;
};

const StockContext = createContext<StockContextType>({
  stocks: [],
  stocksCount: 0,
  errors: [],
  fetching: false,
  handleFetchStocks: () => {},
});

export const StockProvider: React.FC = ({
  children,
}: React.EmbedHTMLAttributes<any>) => {
  const [stocks, setStocks] = useState<StockType[] | any>();
  const [stocksCount, setStocksCount] = useState(0);
  const [errors, setErrors] = useState([]);
  const [fetching, setFetching] = useState(false);

  //   useEffect(() => {
  //     handleFetchStocks();

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const handleFetchStocks = useCallback(async () => {
    try {
      setFetching(true);
      const response = await api.get(endPoints.stocks);
      setStocks(response.data?.data?.stocks);
      setStocksCount(response.data?.data?.stocksCount);
      setFetching(false);
    } catch (error: any) {
      setFetching(false);
      console.error(error);
      setErrors(error);
    }
  }, []);

  return (
    <StockContext.Provider
      value={{
        stocks,
        stocksCount,
        errors,
        fetching,
        handleFetchStocks,
      }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = (): StockContextType => useContext(StockContext);
