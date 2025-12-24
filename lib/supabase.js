import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sbwtmetnjsabiwyugoev.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNid3RtZXRuanNhYml3eXVnb2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NTYwNDYsImV4cCI6MjA4MjEzMjA0Nn0.23AJ2nr3M5YGgXaPTwRuRfDBCH_TgNA1N0Aeo0FEB2c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
