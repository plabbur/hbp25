import Item from './item';
import Bill from './bill';
import User from './user';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import FormData from 'form-data';
import Config from 'react-native-config';

export default class Receipt {
  private items: Item[];
  private tax : number;

  constructor(items: Item[] = [], tax: number = 0) {
    this.items = items;
    this.tax = tax;
  }

  // Function to read the receipt
  private async readReceipt(imagePathOfReceipt: string): Promise<any> {
    const prompt = 'Generate a line-separated list of items on this receipt in the form "\{item_name} : {price}\". \
    If an item has a quantity of more than one, list it that many times. Let the last line of the list be the tax \
    formatted as \"Tax : {tax_amount}\" (if not shown, the value should be zero). All prices and taxes should exclude a currency symbol.';

    const apiKey = Config.OPENAI_API_KEY; // Use the API key from .env via react-native-config

    try {
      // Create a form to send the request to the API
      const form = new FormData();
      
      // Read the image file from the local file system using react-native-fs
      const imagePath = Platform.OS === 'android' ? imagePathOfReceipt : 'file://' + imagePathOfReceipt;
      const file : string = await RNFS.readFile(imagePath, 'base64');

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

  private makeItems(imagePathOfReceipt: string): void {
    this.readReceipt(imagePathOfReceipt).then((data) => {
      const generatedText = data.choices[0].text;
      const lines = generatedText.split('\n');
      for (const line of lines) {
        const [name, price] = line.split(' : ');
        if (name != "Tax") {
          this.items.push(new Item(this.items.length, name, parseFloat(price), null));
        } else {
          this.tax = parseFloat(price);
        }
      }
    });
  }

  public makeBillFromReceipt(user : User, title : string, imagePathOfReceipt : string): Bill {
    this.makeItems(imagePathOfReceipt);
    const billId = Math.floor(Math.random() * 1000);
    const newBill = new Bill(billId, user, title, new Date(), this.items, this.tax, false, 0);
    user.addPastBill(newBill);
    return newBill;
  }

  public getItems() : Item[] {
    return this.items;
  }

  public getTax() : number {
    return this.tax;
  }
}
