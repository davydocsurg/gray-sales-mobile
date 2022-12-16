import { Dispatch } from 'react';

export interface initialStockType {
  stocks: Array<any>;
  errors: Array<any>;
  loading: boolean;
  success: boolean;
}

export interface StockContextType {
  stockState: initialStockType;
  stockDispatch: Dispatch<any>;
}

export type StockType = {
  _id: string;
  _v: number;
  createdAt: string;
  updatedAt: string;
  price: number;
  title: string;
  description: string;
  images: Array<string>;
  categoryId: string;
  user: string;
};
