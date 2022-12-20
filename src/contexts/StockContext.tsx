import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import api from '../api';
import { endPoints } from '../api/endPoints';
import type { AuthUserDetails, StockType } from '../types';

type StockContextType = {
  stocks: StockType[];
  stocksCount: number;
  errors: any[];
  fetching: boolean;
  stockOwner: AuthUserDetails | undefined;
  handleFetchStocks: () => void;
  handleFetchStockOwner: (id: any) => void;
  handleFetchUserStocks: (id: any) => void;
};

const StockContext = createContext<StockContextType>({
  stocks: [],
  stocksCount: 0,
  errors: [],
  fetching: false,
  stockOwner: {
    _id: '',
    _v: 0,
    createdAt: '',
    email: '',
    name: '',
    photo: '',
    role: '',
    slug: '',
    type: '',
    updatedAt: '',
    verificationStatus: '',
  },
  handleFetchStocks: () => {},
  handleFetchStockOwner: (id: any) => {},
  handleFetchUserStocks: (id: any) => {},
});

export const StockProvider: React.FC = ({
  children,
}: React.EmbedHTMLAttributes<any>) => {
  const [stocks, setStocks] = useState<StockType[] | any>();
  const [stocksCount, setStocksCount] = useState(0);
  const [errors, setErrors] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [stockOwner, setStockOwner] = useState<AuthUserDetails>();

  //   useEffect(() => {
  //     handleFetchStocks();

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  const handleFetchStocks = useCallback(async () => {
    try {
      setFetching(true);
      const response = await api.get(endPoints.stocks);
      setStocks(response.data?.data?.stocks);

      setFetching(false);
    } catch (error: any) {
      setFetching(false);
      console.error(error);
      setErrors(error);
    }
  }, []);

  const handleFetchUserStocks = useCallback(async (id: any) => {
    try {
      const response = await api.get(endPoints.userStocks + id, id);
      // console.log(response.data?.data?.userStocksCount, 'user stocks');

      setStocksCount(response.data?.data?.userStocksCount);
    } catch (error: any) {
      console.error(error);
      setErrors(error);
    }
  }, []);

  const handleFetchStockOwner = useCallback(async (id: any) => {
    try {
      const response = await api.get(endPoints.stockOwner + id, id);
      setStockOwner(response.data?.data?.user);
    } catch (error: any) {
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
        stockOwner,
        handleFetchStocks,
        handleFetchStockOwner,
        handleFetchUserStocks,
      }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = (): StockContextType => useContext(StockContext);
