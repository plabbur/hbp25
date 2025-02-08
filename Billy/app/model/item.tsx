import { User } from './user';

export class Item {
  private id : number;
  private name : string;
  private price : number;
  private takenBy : string | User | null;

  constructor(id: number, name : string, price : number, takenBy : string | User | null) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.takenBy = takenBy;
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

  public setTakenBy(user : string | User | null) : void {
    this.takenBy = user;
  }

  public getTakenBy() : string | User | null {
    return this.takenBy;
  }

  public getAccountedFor() : boolean {
    return this.takenBy !== null;
  }
}
