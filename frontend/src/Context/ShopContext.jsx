import { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../Utils/GraphQL/Queries';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

  const contextValue = {
    all_product: data?.products || [],
    loading,
    error,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

// Custom Hook for easy access
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopContextProvider');
  }
  return context;
};

export default ShopContextProvider;
