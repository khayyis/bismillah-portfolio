-- =============================================
-- Supabase Database Schema for Portfolio Admin
-- Run this in Supabase SQL Editor
-- =============================================

-- Table: portfolio_settings (single row for profile & social data)
CREATE TABLE IF NOT EXISTS portfolio_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL UNIQUE, -- 'profile' or 'social'
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT DEFAULT '⚡',
    level INTEGER DEFAULT 80,
    category TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT DEFAULT '',
    image TEXT DEFAULT '/images/Dalam-Tahap-Pengembangan.jpeg',
    handle TEXT DEFAULT '',
    url TEXT DEFAULT '',
    border_color TEXT DEFAULT '#3B82F6',
    gradient TEXT DEFAULT 'linear-gradient(145deg, #3B82F6, transparent)',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE portfolio_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow everyone to READ (for public website)
CREATE POLICY "Allow public read" ON portfolio_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (true);

-- Policy: Allow authenticated users to INSERT/UPDATE/DELETE (for admin)
-- Note: For now, we allow anon to write too (controlled by app-level password)
CREATE POLICY "Allow anon write" ON portfolio_settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON projects FOR ALL USING (true) WITH CHECK (true);

-- Insert default profile data
INSERT INTO portfolio_settings (type, data) VALUES 
('profile', '{
    "name": "Khayyis Billawal Rozikin",
    "title": "Teknik Mekatronika",
    "handle": "Khayyis_Billawal",
    "status": "Available for Hire",
    "availability": "Freelance / Pelajar",
    "email": "khayyis8@gmail.com",
    "instagram": "@Khayyis_Billawal",
    "location": "Jakarta, Indonesia",
    "school": "SMKN 4 Jakarta",
    "department": "Jurusan Teknik Mekatronika",
    "avatarUrl": "/images/khayyis-profile.jpg",
    "miniAvatarUrl": "/images/khayyis-profile.jpg",
    "about": "seorang siswa Teknik Mekatronika, antusias pada pengembangan robotik, desain 3D, dan teknologi AI. pernah berpartisipasi dalam Lomba Kompetensi Siswa bidang Autonomous Mobile Robotic. Selalu mencari peluang, serta mengembangkan keterampilan dalam bidang teknologi.",
    "contactText": "Kontak Saya",
    "contactButtonText": "Hubungi Saya",
    "sendMessageText": "Kirim Pesan"
}'::jsonb),
('social', '{
    "instagram": {"url": "https://instagram.com/Khayyis_Billawal", "username": "@Khayyis_Billawal", "enabled": true},
    "github": {"url": "https://github.com/khayyis", "username": "khayyis", "enabled": true},
    "linkedin": {"url": "https://linkedin.com/in/khayyis-billawal", "username": "khayyis-billawal", "enabled": true},
    "twitter": {"url": "", "username": "", "enabled": false},
    "youtube": {"url": "", "username": "", "enabled": false},
    "whatsapp": {"number": "+6281234567890", "message": "Halo, saya melihat portfolio Anda.", "enabled": true},
    "telegram": {"username": "KhayyisBillawal", "url": "http://t.me/KhayyisBillawal", "enabled": true}
}'::jsonb)
ON CONFLICT (type) DO NOTHING;

-- Insert default skills
INSERT INTO skills (name, icon, level, category, sort_order) VALUES
('JavaScript', '🟨', 90, 'Programming', 1),
('React', '⚛️', 85, 'Framework', 2),
('Node.js', '🟩', 80, 'Backend', 3),
('Python', '🐍', 75, 'Programming', 4),
('Arduino', '🔌', 85, 'Hardware', 5),
('Blender', '🎨', 70, '3D Design', 6);
