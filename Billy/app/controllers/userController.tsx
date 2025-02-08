import { supabase } from "@/lib/supabaseClient";

export default class UserController {

    static async userSignUp(email: string, password: string) {
        let data = await supabase.auth.signUp({
            email: email,
            password: password
        })
    }
}