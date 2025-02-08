import { supabase } from "../../lib/supabaseClient"
import { QueryData, QueryError, QueryResult } from "@supabase/supabase-js"

const BILL_INVITE_ROUTE = '/invite'

/**
 *  Database accessor for bills. Used for adding, accessing, modifying, deleting bills.
 *  
 */
export default class BillAccessor {
    static async getBillByID(): Promise<any> {
    }
    // postNewBill
    // deleteBill
    // updateBill

}