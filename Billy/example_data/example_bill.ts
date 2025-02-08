import { User } from './user';
import { Item } from './item';
import { BillType } from '@/context/BillContext';

// Create example users
const user1 = new User(1, 'Alice', 'alice123', 'alice@example.com', 'USD');
const user2 = new User(2, 'Bob', 'bob456', 'bob@example.com', 'USD');

// Create example items
const item1 = new Item(101, 'Pizza', 12.99);
const item2 = new Item(102, 'Burger', 9.99);
const item3 = new Item(103, 'Soda', 2.50);

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