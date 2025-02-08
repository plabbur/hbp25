import React, { createContext, useContext, useState } from 'react';
import { BillType } from './BillContext';

export type UserType = {
    id: number;
    name: string;
    username: string;
    email: string;
    currency: string;
    friends: UserType[];
    activeBills: BillType[];
    pastBills: BillType[];
  };

const UserContext = createContext<{
  user: UserType | null;
  createUser: (id: number, name: string, username: string, email: string, currency: string) => void;
} | undefined>(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const createUser = (id: number, name: string, username: string, email: string, currency: string) => {
    setUser({ id, name, username, email, currency, friends: [], activeBills: [], pastBills: [] });
  };

  return <UserContext.Provider value={{ user, createUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
