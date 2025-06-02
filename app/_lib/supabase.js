import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL="https://cjjblomvvijynrktyksu.supabase.co"
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqamJsb212dmlqeW5ya3R5a3N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDkwNzA3MiwiZXhwIjoyMDU2NDgzMDcyfQ.uMwOeRKMqLoPG7ML0Ypl0-xyo2j_VHHnk6GHfL_LjdU"

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
