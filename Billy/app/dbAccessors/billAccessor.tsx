import { supabase } from "../../src"
import { QueryData, QueryError, QueryResult } from "@supabase/supabase-js"
import { Bill } from "../model/bill"

const BILL_INVITE_ROUTE = '/invite'

/**
 *  Database accessor for bills. Used for adding, accessing, modifying, deleting bills.
 *  
 */
export default class BillAccessor {
    static async getBillByID(): Promise<any> {
    }
    static async createBill(bill: Bill) {
/**
 * private id : number;
   private billStarter : User;
   private title : string;
   private items: Item[];
   private tax : number;
   private withTip : boolean;
   private tipPercentage : number;
   private partyMembers : User[];
 */
        let bill_items = supabase
        .from('profiles')
        .insert({
            title: bill.getTitle(),
            items: 
            
        })
    }
    // deleteBill
    // updateBill

}