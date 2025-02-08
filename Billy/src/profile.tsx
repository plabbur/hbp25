import { Friend } from './friend';
import { Bill } from './bill';

enum Currency {
  UnitedStatesDollar = "USD",
  CanadianDollar = "CAD",
  Euro = "EUR",
  BritishPound = "GBP"
}

export class User {
  name : string;
  username : string;
  email : string;
  currency : Currency;
  friends : Friend[];
  recentBills : Bill[];


  constructor(name : string, username : string, email : string, currency : Currency, friends : Friend[] = [], recentBills : Bill[] = []) {
    this.name = name;
    this.username = username;

    const verifiedEmail = this.verifyEmail(email);
    if (verifiedEmail instanceof Error) {
      throw verifiedEmail;
    }
    this.email = verifiedEmail;

    this.currency = currency;
    this.friends = friends;
    this.recentBills = recentBills;
  }

  verifyEmail(email : string) : string | Error {
    const indexOfAt : number = email.indexOf("@");
    const indexOfPeriod : number = email.indexOf(".", indexOfAt);
    if (indexOfAt!== -1 && indexOfPeriod !== -1) {
      return email;
    } else {
      return new Error("Invalid email address");
    }
  }

  changeName(newName : string) : void {
    this.name = newName;
  }

  changeUsername(newUsername : string) : void {
    this.username = newUsername;
  }

  changeEmail(newEmail : string) : void {
    const verifiedEmail = this.verifyEmail(newEmail);
    if (verifiedEmail instanceof Error) {
      throw verifiedEmail;
    }
    this.email = verifiedEmail;
  }

  changeCurrency(newCurrency : Currency) : void {
    this.currency = newCurrency;
  }

  addFriend(friend : Friend) : void {
    this.friends.push(friend);
  }

  removeFriend(friend : Friend) : void {
    this.friends = this.friends.filter(f => f.username !== friend.username);
  }

  addBill(bill : Bill) : void {
    this.recentBills.push(bill);
  }

  removeBill(friend : Friend) : void {
    this.recentBills = this.recentBills.filter(b => b.getTitle() !== friend.username);
  }
}