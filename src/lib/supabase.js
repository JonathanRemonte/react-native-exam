import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://heameffwuyrpshmofedx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYW1lZmZ3dXlycHNobW9mZWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2OTc0NjQsImV4cCI6MjA2NjI3MzQ2NH0.4MAPfCyPmALHM67o151WRGv70W-F_SdflwfiCNdXBGk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
})