
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
  
  export type ItemType = {
    id: number;
    name: string;
    price: number;
    accountedFor: boolean;
  };
  
  export type UserType = {
    id: number;
    name: string;
    username: string;
    email: string;
    currency: string;
    friends: User[];
    activeBills: Bill[];
    pastBills: Bill[];
  };
  