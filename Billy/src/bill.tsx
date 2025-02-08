import { User } from './profile';

class Item {
  name : string;
  price : number;
  private accountedFor : boolean;

  constructor(name : string, price : number) {
    this.name = name;
    this.price = price;
    this.accountedFor = false;
  }

  public getAccountedFor() : boolean {
    return this.accountedFor;
  }

  changeAccountedFor() : void {
    this.accountedFor = !this.accountedFor;
  }
}

export class Bill {
  private id : number;
  private billStarter : User;
  private title : string;
  private date : Date;
  private items: Item[];
  private tax : number;
  private withTip : boolean;
  private tipPercentage : number;
  private partyMembers : User[];

  constructor(id : number, billStarter : User, title : string, date : Date = new Date(), tax : number, withTip : boolean, tipPercentage : number, items : Item[] = [], partyMembers : User[] = [billStarter]) {
    this.id = id;
    this.billStarter = billStarter;
    this.title = title;
    this.date = date;
    this.tax = tax;
    this.withTip = withTip;
    this.tipPercentage = withTip? tipPercentage : 0;
    this.items = items;
    this.partyMembers = partyMembers;
  }

  public getId() : number {
    return this.id;
  }

  private changeTitle(newTitle : string) : void {
    this.title = newTitle;
  }

  public getTitle() : string {
    return this.title;
  }

  private changeDate(newDate : Date) : void {
    this.date = newDate;
  }

  public calculateSubtotal() : number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
  
  private changeTax(newTax : number) : void {
    this.tax = newTax;
  }

  public getTax() : number {
    return this.tax;
  }

  private changeWithTip(newWithTip : boolean) : void {
    this.withTip = newWithTip;
  }

  private changeTipPercentage(newTipPercentage : number) : void {
    this.tipPercentage = newTipPercentage;
  }

  public getTipPercentage() : number {
    return this.tipPercentage;
  }

  protected calculateTip(tipPercentage: number = this.tipPercentage) : number {
    return this.calculateSubtotal() * tipPercentage;
  }

  protected getTotalAmount() : number {
    const subtotal = this.calculateSubtotal();
    return this.withTip ? subtotal * (1 + this.tipPercentage) + this.tax : subtotal;
  }

  protected addItem(item : Item) : void {
    this.items.push(item);
  }

  protected removeItem(item : Item) : void {
    this.items = this.items.filter(i => i.name !== item.name);
  }

  private addPartyMember(newMember : User) : void {
    this.partyMembers.push(newMember);
  }

  private removePartyMember(member : User) : void {
    this.partyMembers = this.partyMembers.filter(m => m.username !== member.username);
  }
}

class SplitBill {
  private splitOwner: User;
  protected mainBill : Bill;
  private splitItems : Item[];

  constructor(splitOwner : User, mainBill : Bill, splitItems : Item[] = []) {
    this.splitOwner = splitOwner;
    this.mainBill = mainBill;
    this.splitItems = splitItems;
  }

  protected addItem(item : Item) : void | Error {
    if (!item.getAccountedFor()) {
      this.splitItems.push(item);
      item.changeAccountedFor();
    } else {
      throw new Error("This item has already been accounted for!");
    }
  }

  protected removeItem(item : Item) : void {
    this.splitItems = this.splitItems.filter(i => i.name !== item.name);
  }

  protected calculateSplitTotal () : number {
    const subtotal : number = this.splitItems.reduce((acc, item) => acc + item.price, 0);
    return subtotal * (1 + this.mainBill.getTipPercentage()) + this.mainBill.getTax();
  }
}