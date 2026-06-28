import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://mzunevvgpllevgxqmcqa.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dW5ldnZncGxsZXZneHFtY3FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1OTczMzMsImV4cCI6MjA5ODE3MzMzM30.AvPgXYsPxBJnFX5KRdCdeNbVfwJWqlFJvPDNpuyuzWY"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
