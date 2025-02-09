import React, { createContext, useContext, useState } from 'react';

export type ItemType = {
    id: number;
    name: string;
    price: number;
    accountedFor: boolean;
  };

const ItemContext = createContext<{
  item: ItemType | null;
  createItem: (id: number, name: string, price: number) => void;
  toggleAccountedFor: () => void;
} | undefined>(undefined);

export const ItemProvider = ({ children }) => {
  const [item, setItem] = useState<ItemType | null>(null);

  const createItem = (id: number, name: string, price: number) => {
    setItem({ id, name, price, accountedFor: false });
  };

  const toggleAccountedFor = () => {
    setItem((prev) => (prev ? { ...prev, accountedFor: !prev.accountedFor } : null));
  };

  return <ItemContext.Provider value={{ item, createItem, toggleAccountedFor }}>{children}</ItemContext.Provider>;
};

export const useItem = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItem must be used within an ItemProvider');
  }
  return context;
};
