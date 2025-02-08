import { supabase } from "@/lib/AsyncStorage";
import { UserAccessor } from "../dbAccessors/userAccessor";

export default class UserController {

    static async userSignUp(email: string, password: string) {
        let data = await supabase.auth.signUp({
            email: email,
            password: password
        })
    }
}