import { UserType, useUser } from '@/context/UserContext';
import { ItemType, useItem } from '@/context/ItemContext';
import { BillType } from '@/context/BillContext';

// const {createUser} = useUser();
// const {createItem} = useItem();

// Create example users
const user1: UserType = {id: 1, name: 'Alice', username: 'alice123', email: 'alice@example.com', currency: 'USD', friends: [], activeBills: [], pastBills: []};
const user2: UserType = {id: 2, name: 'Bob', username: 'bob456', email: 'bob@example.com', currency: 'USD', friends: [], activeBills: [], pastBills: []};

// Create example items
const item1: ItemType = {id: 101, name: 'Pizza', price: 12.99, accountedFor: true};
const item2: ItemType = {id: 102, name: 'Burger', price: 9.99, accountedFor: true};
const item3: ItemType = {id: 103, name: 'Soda', price:2.50, accountedFor: true};

// Example bill data
export const exampleBill: BillType = {
  id: 501,
  billStarter: user1,
  title: 'Dinner with Friends',
  date: new Date(),
  items: [item1, item2, item3],
  tax: 0.08,
  withTip: true,
  tipPercentage: 0.15,
  partyMembers: [user1, user2],
};