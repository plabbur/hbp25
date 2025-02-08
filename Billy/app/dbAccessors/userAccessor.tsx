import { supabase } from "../../src";
import { User } from '../model/user'


/**
 *  Database accessor for users.
 *  
 */
export default class UserAccessor {

    static async createUser(user: User) {
        const response = await supabase
        .from('profiles')
        .insert({
            full_name: user.getName(),
            username: user.getUsername(),
            email: user.getEmail(),
        })
        console.log(response.status)
    }
    static async getUserByID(id: number) {
        const { data, error } = await supabase.
        from('profiles')
        .select()
    
    }
    // getUserIDByEmail orUsername
    // what else...
}