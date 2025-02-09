<<<<<<< HEAD:Billy/src/index.tsx
import AsyncStorage from '@react-native-async-storage/async-storage/src/AsyncStorage'
import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase-generated-types'

const supabaseUrl = process.env.SUPABASE_API_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage, // should this be modified to use the storage buckets in supabase?
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
=======
>>>>>>> 170344a534c089f661e748236b8fdd45f33ea122:Billy/lib/supabaseClient.tsx
