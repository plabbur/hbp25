import Bill from './bill';

enum Currency {
  UnitedStatesDollar = "USD",
  CanadianDollar = "CAD",
  Euro = "EUR",
  BritishPound = "GBP"
}

export default class User {
  private id : number;
  private name : string;
  private username : string;
  private phoneNumber : number;
  private email : string;
  private currency : Currency;
  private friends : User[];
  private activeBills : Bill[];
  private pastBills : Bill[];


  constructor(id : number, name : string, username : string, phoneNumber : number, email : string, currency : Currency, friends : User[] = [], activeBills : Bill[] = [], pastBills : Bill[] = []) {
    this.id = id;
    this.name = name;
    this.username = username;

    const verifiedPhoneNumber = this.verifyPhoneNumber(phoneNumber);
    if (verifiedPhoneNumber instanceof Error) {
      throw verifiedPhoneNumber;
    }
    this.phoneNumber = verifiedPhoneNumber;

    const verifiedEmail = this.verifyEmail(email);
    if (verifiedEmail instanceof Error) {
      throw verifiedEmail;
    }
    this.email = verifiedEmail;

    this.currency = currency;
    this.friends = friends;
    this.activeBills = activeBills;
    this.pastBills = pastBills;
  }

  public getId() : number {
    return this.id;
  }

  private verifyEmail(email : string) : string | Error {
    const indexOfAt : number = email.indexOf("@");
    const indexOfPeriod : number = email.indexOf(".", indexOfAt);
    if (indexOfAt!== -1 && indexOfPeriod !== -1) {
      return email;
    } else {
      return new Error("Invalid email address");
    }
  }

  private verifyPhoneNumber(phoneNumber : number) : number | Error {
    return phoneNumber.toString().length === 10 ? phoneNumber : new Error("Invalid phone number");
  }

  public changeName(newName : string) : void {
    this.name = newName;
  }

  public changeUsername(newUsername : string) : void {
    this.username = newUsername;
  }

  public changeEmail(newEmail : string) : void {
    const verifiedEmail = this.verifyEmail(newEmail);
    if (verifiedEmail instanceof Error) {
      throw verifiedEmail;
    }
    this.email = verifiedEmail;
  }

  public changeCurrency(newCurrency : Currency) : void {
    this.currency = newCurrency;
  }

  public addFriend(friend : User) : void {
    this.friends.push(friend);
  }

  public removeFriend(friend : User) : void {
    this.friends = this.friends.filter(f => f.username !== friend.username);
  }

  public addActiveBill(bill : Bill) : void {
    this.activeBills.push(bill);
  }

  public removeActiveBill(bill : Bill) : void {
    this.activeBills = this.activeBills.filter(b => b.getId() !== bill.getId());
  }

  public hasActiveBills() : boolean {
    return this.activeBills.length > 0;
  }

  public addPastBill(bill : Bill) : void {
    this.pastBills.push(bill);
  }

  public removePastBill(bill: Bill) : void {
    this.pastBills = this.pastBills.filter(b => b.getId() !== bill.getId());
  }
}