import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sbwtmetnjsabiwyugoev.supabase.co';

// Anon key untuk operasi READ (publik)
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNid3RtZXRuanNhYml3eXVnb2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NTYwNDYsImV4cCI6MjA4MjEzMjA0Nn0.23AJ2nr3M5YGgXaPTwRuRfDBCH_TgNA1N0Aeo0FEB2c';

// Public client - untuk baca data saja (aman di browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role key HANYA untuk server-side (API routes)
// JANGAN PERNAH expose ini ke client/browser!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Admin client - HANYA digunakan di API routes (server-side)
export const getAdminSupabase = () => {
    if (!supabaseServiceKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured');
    }
    return createClient(supabaseUrl, supabaseServiceKey);
};

export default supabase;
