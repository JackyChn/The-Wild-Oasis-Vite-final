import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cfhtzhgqirdokoimzrtg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmaHR6aGdxaXJkb2tvaW16cnRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3MDAxNzgsImV4cCI6MjA0MTI3NjE3OH0._GCIDU87RJh_T09hoG16aOsi_YBG82XEXMUEFYknW9E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
