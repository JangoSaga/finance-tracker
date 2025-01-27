import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://shvmcmjpqnepykkcvgtj.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNodm1jbWpwcW5lcHlra2N2Z3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDkyNTgsImV4cCI6MjA1MjUyNTI1OH0.R_J7pQMAV7_3tVHO2m43Vm9t0Y-35O19Fh_cYMA5QXc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
