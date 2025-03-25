import {createClient} from "@supabase/supabase-js";

const supabaseURL = import.meta.env.supabaseURL;
const supabaseKey = import.meta.env.supabaseKey;

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;