import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../api';
import { endPoints } from '../api/endPoints';

type CategoryContextType = {
  categories: [] | any;
  loading: boolean;
  errors: any[];
  handleFetchCategories: () => void;
};

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  //   categoriesCount: 0,
  loading: false,
  errors: [],
  handleFetchCategories: () => {},
});

export const CategoryProvider: React.FC = ({ children }: any) => {
  const [categories, setCategories] = useState<CategoryContextType>();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(endPoints.fetchCategories);
      setCategories(response.data?.data?.categories);
      setLoading(false);
      //   setCategoriesCount(response.data.categoriesCount);
    } catch (error: Object | any) {
      setLoading(false);
      setErrors(error);
    }
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        // categoriesCount,
        errors,
        loading,
        handleFetchCategories,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
