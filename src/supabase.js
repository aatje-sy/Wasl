import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hyftxicgcfktwkoafjmy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5ZnR4aWNnY2ZrdHdrb2Fmam15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDY5MDIsImV4cCI6MjA2NDgyMjkwMn0.Phk-cpdDsB9xT6ukqeO4_KjDI1T2ZwSmBMxM2Th-QXc";

export const supabase = createClient(supabaseUrl, supabaseKey);