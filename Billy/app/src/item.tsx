export class Item {
  private id : number;
  private name : string;
  private price : number;
  private accountedFor : boolean;

  constructor(id: number, name : string, price : number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.accountedFor = false;
  }

  public getId() : number {
    return this.id;
  }

  public getName() : string {
    return this.name;
  }

  public getPrice() : number {
    return this.price;
  }

  public getAccountedFor() : boolean {
    return this.accountedFor;
  }

  public changeAccountedFor() : void {
    this.accountedFor = !this.accountedFor;
  }
}
