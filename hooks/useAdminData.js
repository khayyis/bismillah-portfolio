'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AUTH_KEY = 'portfolio_admin_auth';

// Default data (fallback)
const defaultProfile = {
    name: "Khayyis Billawal Rozikin",
    title: "Teknik Mekatronika",
    handle: "Khayyis_Billawal",
    status: "Available for Hire",
    availability: "Freelance / Pelajar",
    email: "khayyis8@gmail.com",
    instagram: "@Khayyis_Billawal",
    location: "Jakarta, Indonesia",
    school: "SMKN 4 Jakarta",
    department: "Jurusan Teknik Mekatronika",
    avatarUrl: "/images/khayyis-profile.jpg",
    miniAvatarUrl: "/images/khayyis-profile.jpg",
    about: "seorang siswa Teknik Mekatronika, antusias pada pengembangan robotik, desain 3D, dan teknologi AI.",
    contactText: "Kontak Saya",
    contactButtonText: "Hubungi Saya",
    sendMessageText: "Kirim Pesan",
};

const defaultSocial = {
    instagram: { url: "https://instagram.com/Khayyis_Billawal", username: "@Khayyis_Billawal", enabled: true },
    github: { url: "https://github.com/khayyis", username: "khayyis", enabled: true },
    linkedin: { url: "https://linkedin.com/in/khayyis-billawal", username: "khayyis-billawal", enabled: true },
    twitter: { url: "", username: "", enabled: false },
    youtube: { url: "", username: "", enabled: false },
    whatsapp: { number: "+6281234567890", message: "Halo, saya melihat portfolio Anda.", enabled: true },
    telegram: { username: "KhayyisBillawal", url: "http://t.me/KhayyisBillawal", enabled: true },
};

// ============================================
// useAdminData - For Admin Panel (CRUD operations)
// ============================================
export function useAdminData() {
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(defaultProfile);
    const [social, setSocial] = useState(defaultSocial);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load all data from Supabase
    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        try {
            // Load profile & social settings
            const { data: settings } = await supabase
                .from('portfolio_settings')
                .select('*');

            if (settings) {
                const profileData = settings.find(s => s.type === 'profile');
                const socialData = settings.find(s => s.type === 'social');
                if (profileData) setProfile(profileData.data);
                if (socialData) setSocial(socialData.data);
            }

            // Load skills
            const { data: skillsData } = await supabase
                .from('skills')
                .select('*')
                .order('sort_order', { ascending: true });

            if (skillsData) {
                setSkills(skillsData.map(s => ({
                    id: s.id,
                    name: s.name,
                    icon: s.icon,
                    level: s.level,
                    category: s.category
                })));
            }

            // Load projects
            const { data: projectsData } = await supabase
                .from('projects')
                .select('*')
                .order('sort_order', { ascending: true });

            if (projectsData) {
                setProjects(projectsData.map(p => ({
                    id: p.id,
                    title: p.title,
                    subtitle: p.subtitle,
                    image: p.image,
                    handle: p.handle,
                    url: p.url,
                    borderColor: p.border_color,
                    gradient: p.gradient
                })));
            }

            setIsLoaded(true);
        } catch (error) {
            console.error('Error loading data:', error);
            setIsLoaded(true);
        }
    };

    // Profile update
    const updateProfile = useCallback(async (updates) => {
        const newProfile = { ...profile, ...updates };
        setProfile(newProfile);

        await supabase
            .from('portfolio_settings')
            .upsert({
                type: 'profile',
                data: newProfile,
                updated_at: new Date().toISOString()
            }, { onConflict: 'type' });
    }, [profile]);

    // Social update
    const updateSocial = useCallback(async (platform, updates) => {
        const newSocial = { ...social, [platform]: { ...social[platform], ...updates } };
        setSocial(newSocial);

        await supabase
            .from('portfolio_settings')
            .upsert({
                type: 'social',
                data: newSocial,
                updated_at: new Date().toISOString()
            }, { onConflict: 'type' });
    }, [social]);

    // Skills CRUD
    const addSkill = useCallback(async (skill) => {
        const { data, error } = await supabase
            .from('skills')
            .insert({
                name: skill.name,
                icon: skill.icon || '⚡',
                level: skill.level || 80,
                category: skill.category || '',
                sort_order: skills.length
            })
            .select()
            .single();

        if (data) {
            const newSkill = {
                id: data.id,
                name: data.name,
                icon: data.icon,
                level: data.level,
                category: data.category
            };
            setSkills([...skills, newSkill]);
            return newSkill;
        }
    }, [skills]);

    const updateSkill = useCallback(async (id, updates) => {
        await supabase
            .from('skills')
            .update({
                name: updates.name,
                icon: updates.icon,
                level: updates.level,
                category: updates.category,
                updated_at: new Date().toISOString()
            })
            .eq('id', id);

        setSkills(skills.map(s => s.id === id ? { ...s, ...updates } : s));
    }, [skills]);

    const deleteSkill = useCallback(async (id) => {
        await supabase.from('skills').delete().eq('id', id);
        setSkills(skills.filter(s => s.id !== id));
    }, [skills]);

    const reorderSkills = useCallback(async (fromIndex, toIndex) => {
        const newSkills = [...skills];
        const [removed] = newSkills.splice(fromIndex, 1);
        newSkills.splice(toIndex, 0, removed);
        setSkills(newSkills);

        // Update sort_order in database
        const updates = newSkills.map((skill, index) =>
            supabase.from('skills').update({ sort_order: index }).eq('id', skill.id)
        );
        await Promise.all(updates);
    }, [skills]);

    // Projects CRUD
    const addProject = useCallback(async (project) => {
        const { data, error } = await supabase
            .from('projects')
            .insert({
                title: project.title,
                subtitle: project.subtitle || '',
                image: project.image || '/images/Dalam-Tahap-Pengembangan.jpeg',
                handle: project.handle || '',
                url: project.url || '',
                border_color: project.borderColor || '#3B82F6',
                gradient: project.gradient || 'linear-gradient(145deg, #3B82F6, transparent)',
                sort_order: projects.length
            })
            .select()
            .single();

        if (data) {
            const newProject = {
                id: data.id,
                title: data.title,
                subtitle: data.subtitle,
                image: data.image,
                handle: data.handle,
                url: data.url,
                borderColor: data.border_color,
                gradient: data.gradient
            };
            setProjects([...projects, newProject]);
            return newProject;
        }
    }, [projects]);

    const updateProject = useCallback(async (id, updates) => {
        await supabase
            .from('projects')
            .update({
                title: updates.title,
                subtitle: updates.subtitle,
                image: updates.image,
                handle: updates.handle,
                url: updates.url,
                border_color: updates.borderColor,
                gradient: updates.gradient,
                updated_at: new Date().toISOString()
            })
            .eq('id', id);

        setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
    }, [projects]);

    const deleteProject = useCallback(async (id) => {
        await supabase.from('projects').delete().eq('id', id);
        setProjects(projects.filter(p => p.id !== id));
    }, [projects]);

    const reorderProjects = useCallback(async (fromIndex, toIndex) => {
        const newProjects = [...projects];
        const [removed] = newProjects.splice(fromIndex, 1);
        newProjects.splice(toIndex, 0, removed);
        setProjects(newProjects);

        // Update sort_order in database
        const updates = newProjects.map((project, index) =>
            supabase.from('projects').update({ sort_order: index }).eq('id', project.id)
        );
        await Promise.all(updates);
    }, [projects]);

    // Export data
    const exportData = useCallback(() => {
        const data = { skills, projects, profile, social, exportedAt: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [skills, projects, profile, social]);

    // Import data
    const importData = useCallback(async (jsonData) => {
        try {
            const data = JSON.parse(jsonData);
            if (data.profile) await updateProfile(data.profile);
            if (data.social) {
                for (const [platform, value] of Object.entries(data.social)) {
                    await updateSocial(platform, value);
                }
            }
            // Reload all data
            await loadAllData();
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    }, [updateProfile, updateSocial]);

    return {
        skills,
        projects,
        profile,
        social,
        isLoaded,
        addSkill,
        updateSkill,
        deleteSkill,
        reorderSkills,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        updateProfile,
        updateSocial,
        exportData,
        importData,
        refreshData: loadAllData,
    };
}

// ============================================
// useAdminAuth - Authentication
// ============================================
export function useAdminAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const auth = sessionStorage.getItem(AUTH_KEY);
            setIsAuthenticated(auth === 'true');
            setIsChecking(false);
        }
    }, []);

    const login = useCallback((password) => {
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
        if (password === adminPassword) {
            sessionStorage.setItem(AUTH_KEY, 'true');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
    }, []);

    return { isAuthenticated, isChecking, login, logout };
}

export default useAdminData;
