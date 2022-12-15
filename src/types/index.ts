import { Message } from './message';
import { initialStockType, StockContextType } from './stocks';
import { LoginProps } from './form';
import { initialCategoryType, CategoryContextType } from './categories';
import {
  AuthStateType,
  AuthUserDetails,
  initialAuthType,
  LoginFields,
  ProfileUpdateFields,
  AuthStockDetails,
} from './auth';

export type {
  Message,
  LoginProps,
  initialStockType,
  StockContextType,
  initialCategoryType,
  CategoryContextType,
  AuthStateType,
  AuthUserDetails,
  initialAuthType,
  LoginFields,
  ProfileUpdateFields,
  AuthStockDetails,
};

export type RootTabParamList = {
  Feed: undefined;
  CreateStock: undefined;
  Account: undefined;
};
