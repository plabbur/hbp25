import User from './user';
import Item from './item';


/* A recipted bill. */
export default class Bill {
  private id : number;
  private billStarter : User;
  private title : string;
  private date : Date;
  private items: Item[];
  private tax : number;
  private withTip : boolean;
  private tipPercentage : number;
  private partyMembers : User[];

  constructor(id : number, billStarter : User, title : string, date : Date = new Date(), items : Item[] = [], tax : number, withTip : boolean, tipPercentage : number, partyMembers : User[] = [billStarter]) {
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

  public changeTitle(newTitle : string) : void {
    this.title = newTitle;
  }

  public getTitle() : string {
    return this.title;
  }

  public changeDate(newDate : Date) : void {
    this.date = newDate;
  }

  public calculateSubtotal() : number {
    return this.items.reduce((acc, item) => acc + item.getPrice(), 0);
  }
  
  public changeTax(newTax : number) : void {
    this.tax = newTax;
  }

  public getTax() : number {
    return this.tax;
  }

  public changeWithTip(newWithTip : boolean) : void {
    this.withTip = newWithTip;
  }

  public changeTipPercentage(newTipPercentage : number) : void {
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
    this.items = this.items.filter(i => i.getName() !== item.getName());
  }

  public addPartyMember(newMember : User) : void {
    this.partyMembers.push(newMember);
  }

  public removePartyMember(member : User) : void {
    this.partyMembers = this.partyMembers.filter(m => m.getId() !== member.getId());
  }

  public getPartySize() : number {
    return this.partyMembers.length;
  }
}

/* A portion of a bill that is accounted for by a user. */
class SplitBill {
  private owner: User;
  private mainBill : Bill;
  private splitItems : Item[];

  constructor(owner : User, mainBill : Bill, splitItems : Item[] = []) {
    this.owner = owner;
    this.mainBill = mainBill;
    this.splitItems = splitItems;
  }

  public addItem(item : Item) : void | Error {
    if (!item.getAccountedFor()) {
      this.splitItems.push(item);
      item.setTakenBy(this.owner);
    } else {
      throw new Error("This item has already been accounted for!");
    }
  }

  public removeItem(item : Item) : void {
    this.splitItems = this.splitItems.filter(i => i.getId() !== item.getId());
    item.setTakenBy(null);
  }

  public calculateSplitTotal () : number {
    const subtotal = this.splitItems.reduce((acc, item) => acc + item.getPrice(), 0);
    return subtotal * (1 + this.mainBill.getTipPercentage()) + this.mainBill.getTax();
  }
}