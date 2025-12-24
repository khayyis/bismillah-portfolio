-- =============================================
-- Migration: Add missing columns to projects table
-- Run this in Supabase SQL Editor
-- =============================================

-- Add category column
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Proyek';

-- Add description column
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';

-- Add status column
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Selesai';

-- Verify the changes
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'projects';
