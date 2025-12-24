-- =============================================
-- Migration: Add custom_links table and contact settings
-- Run this in Supabase SQL Editor
-- =============================================

-- Table: custom_links (untuk menyimpan link kustom di section Hubungi Saya)
CREATE TABLE IF NOT EXISTS custom_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT DEFAULT '',
    url TEXT DEFAULT '',
    icon TEXT DEFAULT '🔗',
    enabled BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE custom_links ENABLE ROW LEVEL SECURITY;

-- Policy: Allow everyone to READ and WRITE (controlled by app-level password)
DROP POLICY IF EXISTS "Allow all" ON custom_links;
CREATE POLICY "Allow all" ON custom_links FOR ALL USING (true) WITH CHECK (true);

-- Insert default contact settings ke portfolio_settings
INSERT INTO portfolio_settings (type, data) VALUES 
('contact', '{
    "email": {"address": "khayyis8@gmail.com", "subject": "Kontak dari Website Portfolio", "enabled": true},
    "telegram": {"username": "KhayyisBillawal", "url": "http://t.me/KhayyisBillawal", "enabled": true},
    "school": {"name": "SMKN 4 Jakarta", "department": "Jurusan Teknik Mekatronika", "enabled": true},
    "photography": {"title": "Landscape & Portrait Photography", "subtitle": "Tersedia untuk sesi foto", "enabled": true},
    "sectionTitle": "Hubungi Saya",
    "sectionSubtitle": "Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi saya!"
}'::jsonb)
ON CONFLICT (type) DO NOTHING;
