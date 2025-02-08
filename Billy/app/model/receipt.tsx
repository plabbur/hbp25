import { Item } from '../src/item';
import * as fs from 'fs';
import * as path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';

export class Receipt {
  private id : number;
  private items : Item[];

  constructor(id: number, items : Item[]) {
    this.id = id;
    this.items = items;
  }

  public getId() : number {
    return this.id;
  }

  public getItems() : Item[] {
    return this.items;
  }

  public addItem(item : Item) : void {
    this.items.push(item);
  }

  public removeItem(item : Item) : void {
    this.items = this.items.filter(i => i.getId() !== item.getId());
  }

  async readReceipt(imagePathOfReceipt : string) : Promise<void> {
    const prompt = "Generate a list of items on this receipt. If an item has a quantity of more than one, \
    list it that many times."
    const apiKey = process.env.OPENAI_API_KEY;

    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(imagePathOfReceipt), {
        filename: path.basename(imagePathOfReceipt),
        contentType: 'image/png',
      });
      form.append('model', 'gpt-4');
      form.append('prompt', prompt);
      form.append('max_tokens', '100');
  
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          ...form.getHeaders(),
        },
        body: form,
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}