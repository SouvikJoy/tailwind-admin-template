import { createClient } from "@supabase/supabase-js";
import useAuthUser from "@/composables/UseAuthUser";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;

  console.log(user)
});

export default function useSupabase() {
  return { supabase };
}
