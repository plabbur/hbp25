import React, { createContext, useContext, useState } from 'react';
import { UserType } from './UserContext';
import { ItemType } from './ItemContext';

export type BillType = {
  id: number | null;
  billStarter: UserType | null;
  title: string;
  date: Date;
  items: ItemType[];
  tax: number;
  withTip: boolean;
  tipPercentage: number;
  partyMembers: UserType[];
};

const BillContext = createContext<{
  bill: BillType;
  createBill: (id: number, billStarter: UserType, title: string, date: Date, tax: number, withTip: boolean, tipPercentage: number, items?: Item[], partyMembers?: User[]) => void;
  changeTitle: (newTitle: string) => void;
  changeDate: (newDate: Date) => void;
  calculateSubtotal: () => number;
  changeTax: (newTax: number) => void;
  changeWithTip: (newWithTip: boolean) => void;
  changeTipPercentage: (newTipPercentage: number) => void;
  calculateTip: () => number;
  getTotalAmount: () => number;
  addItem: (item: ItemType) => void;
  removeItem: (item: ItemType) => void;
  addPartyMember: (newMember: UserType) => void;
  removePartyMember: (member: UserType) => void;
} | undefined>(undefined);

export const BillProvider = ({ children }) => {
  const [bill, setBill] = useState<BillType>({
    id: null,
    billStarter: null,
    title: '',
    date: new Date(),
    items: [],
    tax: 0,
    withTip: false,
    tipPercentage: 0,
    partyMembers: [],
  });

  const createBill = (id, billStarter, title, date = new Date(), tax, withTip, tipPercentage, items = [], partyMembers = [billStarter]) => {
    setBill({ id, billStarter, title, date, tax, withTip, tipPercentage: withTip ? tipPercentage : 0, items, partyMembers });
  };

  const changeTitle = (newTitle) => {
    setBill((prev) => ({ ...prev, title: newTitle }));
  };

  const changeDate = (newDate) => {
    setBill((prev) => ({ ...prev, date: newDate }));
  };

  const calculateSubtotal = () => {
    return bill.items.reduce((acc, item) => acc + item.getPrice(), 0);
  };

  const changeTax = (newTax) => {
    setBill((prev) => ({ ...prev, tax: newTax }));
  };

  const changeWithTip = (newWithTip) => {
    setBill((prev) => ({ ...prev, withTip: newWithTip }));
  };

  const changeTipPercentage = (newTipPercentage) => {
    setBill((prev) => ({ ...prev, tipPercentage: newTipPercentage }));
  };

  const calculateTip = () => {
    return calculateSubtotal() * bill.tipPercentage;
  };

  const getTotalAmount = () => {
    const subtotal = calculateSubtotal();
    return bill.withTip ? subtotal * (1 + bill.tipPercentage) + bill.tax : subtotal;
  };

  const addItem = (item) => {
    setBill((prev) => ({ ...prev, items: [...prev.items, item] }));
  };

  const removeItem = (item) => {
    setBill((prev) => ({ ...prev, items: prev.items.filter(i => i.getName() !== item.getName()) }));
  };

  const addPartyMember = (newMember) => {
    setBill((prev) => ({ ...prev, partyMembers: [...prev.partyMembers, newMember] }));
  };

  const removePartyMember = (member) => {
    setBill((prev) => ({ ...prev, partyMembers: prev.partyMembers.filter(m => m.getId() !== member.getId()) }));
  };

  return (
    <BillContext.Provider
      value={{
        bill,
        createBill,
        changeTitle,
        changeDate,
        calculateSubtotal,
        changeTax,
        changeWithTip,
        changeTipPercentage,
        calculateTip,
        getTotalAmount,
        addItem,
        removeItem,
        addPartyMember,
        removePartyMember,
      }}
    >
      {children}
    </BillContext.Provider>
  );
};

export const useBill = () => {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error('useBill must be used within a BillProvider');
  }
  return context;
};
