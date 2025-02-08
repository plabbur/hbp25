import { Item } from './item';
import { Platform } from 'react-native';
const RNFS = require('react-native-fs');
const FormData = require('form-data');
const Config = require('react-native-config');

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

  private async readReceipt(imagePathOfReceipt: string): Promise<any> {
    const prompt = `Generate a line-separated list of items on this receipt in the form "{item_name} : {price}". 
    If an item has a quantity of more than one, list it that many times.`;

    const apiKey = Config.OPENAI_API_KEY; // Use the API key from .env via react-native-config

    try {
      // Create a form to send the request to the API
      const form = new FormData();
      
      // Read the image file from the local file system using react-native-fs
      const imagePath = Platform.OS === 'android' ? imagePathOfReceipt : 'file://' + imagePathOfReceipt;
      const file = await RNFS.readFile(imagePath, 'base64'); // Read file in base64 for sending

      // Append image file as base64 encoded string
      form.append('file', `data:image/png;base64,${file}`, {
        filename: imagePathOfReceipt.split('/').pop(),
        contentType: 'image/png',
      });
      
      // Add additional fields for the request
      form.append('model', 'gpt-4');
      form.append('prompt', prompt);
      form.append('max_tokens', '100');
      form.append('temperature', '0.2');

      // Send the API request
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          ...form.getHeaders(),
        },
        body: form.getBuffer(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public async getListOfItems(receiptImgPath : string) : Promise<Item[]> {
    const receiptData = await this.readReceipt(receiptImgPath);
    const items = receiptData.choices[0].text.split('\n').map((item : string, index : number) => {
      const [name, price] = item.split(' : ');
      return new Item(index, name, parseFloat(price), null);
    });

    return items;
  }
}