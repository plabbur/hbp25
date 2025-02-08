import { Bill } from '../model/bill'


export default class ShareController {
    
    static makeBillInviteLink(bill: Bill): string {
        let billID = bill.getId();
        let link = '/invite/${billID}'
        return link;
    }
}