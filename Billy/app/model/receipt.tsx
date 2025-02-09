import Item from './item';
import Bill from './bill';
import User from './user';
import Config from 'react-native-config';
import Tesseract from 'tesseract.js';

export default class Receipt {
  private items: Item[];
  private tax: number;

  constructor(items: Item[] = [], tax: number = 0) {
    this.items = items;
    this.tax = tax;
  }

  // Read text from image and process 
  private async readReceipt(imagePathOfReceipt: string): Promise<string> {
    const apiKey = Config.OPENAI_API_KEY;

    let recognizedText;
    Tesseract.recognize(
      imagePathOfReceipt,
      'eng').then(({ data: { text } }) => {
        recognizedText = text;
      });

    const prompt = 'Generate a line-separated list of items on this receipt in the form "\{item_name} : {price}\". \
    If an item has a quantity of more than one, list it that many times. Let the last line of the list be the tax \
    formatted as \"Tax : {tax_amount}\" (if not shown, the value should be zero). All prices and taxes should exclude a currency symbol. \
    Use the following text as the receipt: ';

    const system_msg = "You are a receipt parser. Any text given to you is that you would find on a receipt. \
    Extract all the necessary price information."

    const user_msg = prompt + recognizedText;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: system_msg },
            { role: 'user', content: user_msg }
          ],
          max_tokens: 150,
          temperature: 0.2,
          n: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${data.error.message}`);
      }

      const completionText: string = data.choices[0].text.trim();
      return completionText;
    } catch (error) {
      console.error('Error sending prompt to OpenAI API:', error);
      throw new Error('Failed to get a response from ChatGPT');
    }
  }

  private makeItems(imagePathOfReceipt: string): void {
    this.readReceipt(imagePathOfReceipt).then((generatedText) => {
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

  public makeBillFromReceipt(user: User, title: string, imagePathOfReceipt: string): Bill {
    this.makeItems(imagePathOfReceipt);
    const billId = Math.floor(Math.random() * 1000);
    const newBill = new Bill(billId, user, title, new Date(), this.items, this.tax, false, 0);
    user.addPastBill(newBill);
    return newBill;
  }

  public getItems(): Item[] {
    return this.items;
  }

  public getTax(): number {
    return this.tax;
  }
}
