'use client';

import { useState, useEffect, useCallback } from 'react';

const AUTH_KEY = 'portfolio_admin_auth';
const PASSWORD_KEY = 'portfolio_admin_password';

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

// Helper untuk API calls dengan auth
const apiCall = async (url, method = 'GET', body = null) => {
    const password = sessionStorage.getItem(PASSWORD_KEY) || '';
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${password}`
        }
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    const res = await fetch(url, options);
    return res.json();
};

// ============================================
// useAdminData - For Admin Panel (via API Routes)
// ============================================
export function useAdminData() {
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(defaultProfile);
    const [social, setSocial] = useState(defaultSocial);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load all data
    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        try {
            const [profileRes, socialRes, skillsRes, projectsRes] = await Promise.all([
                fetch('/api/admin/profile').then(r => r.json()),
                fetch('/api/admin/social').then(r => r.json()),
                fetch('/api/admin/skills').then(r => r.json()),
                fetch('/api/admin/projects').then(r => r.json())
            ]);

            if (profileRes.success && profileRes.data) setProfile({ ...defaultProfile, ...profileRes.data });
            if (socialRes.success && socialRes.data) setSocial({ ...defaultSocial, ...socialRes.data });
            if (skillsRes.success) setSkills(skillsRes.data || []);
            if (projectsRes.success) setProjects(projectsRes.data || []);
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setIsLoaded(true);
    };

    // Profile update
    const updateProfile = useCallback(async (updates) => {
        const newProfile = { ...profile, ...updates };
        setProfile(newProfile);
        await apiCall('/api/admin/profile', 'PUT', newProfile);
    }, [profile]);

    // Social update
    const updateSocial = useCallback(async (platform, updates) => {
        const newSocial = { ...social, [platform]: { ...social[platform], ...updates } };
        setSocial(newSocial);
        await apiCall('/api/admin/social', 'PUT', newSocial);
    }, [social]);

    // Skills CRUD
    const addSkill = useCallback(async (skill) => {
        const res = await apiCall('/api/admin/skills', 'POST', skill);
        if (res.success && res.data) {
            setSkills([...skills, res.data]);
            return res.data;
        }
    }, [skills]);

    const updateSkill = useCallback(async (id, updates) => {
        await apiCall('/api/admin/skills', 'PUT', { id, ...updates });
        setSkills(skills.map(s => s.id === id ? { ...s, ...updates } : s));
    }, [skills]);

    const deleteSkill = useCallback(async (id) => {
        await apiCall(`/api/admin/skills?id=${id}`, 'DELETE');
        setSkills(skills.filter(s => s.id !== id));
    }, [skills]);

    const reorderSkills = useCallback(async (fromIndex, toIndex) => {
        const newSkills = [...skills];
        const [removed] = newSkills.splice(fromIndex, 1);
        newSkills.splice(toIndex, 0, removed);
        setSkills(newSkills);

        const updates = newSkills.map((skill, index) => ({ id: skill.id, sort_order: index }));
        await apiCall('/api/admin/skills', 'PATCH', updates);
    }, [skills]);

    // Projects CRUD
    const addProject = useCallback(async (project) => {
        const res = await apiCall('/api/admin/projects', 'POST', project);
        if (res.success && res.data) {
            setProjects([...projects, res.data]);
            return res.data;
        }
    }, [projects]);

    const updateProject = useCallback(async (id, updates) => {
        await apiCall('/api/admin/projects', 'PUT', { id, ...updates });
        setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
    }, [projects]);

    const deleteProject = useCallback(async (id) => {
        await apiCall(`/api/admin/projects?id=${id}`, 'DELETE');
        setProjects(projects.filter(p => p.id !== id));
    }, [projects]);

    const reorderProjects = useCallback(async (fromIndex, toIndex) => {
        const newProjects = [...projects];
        const [removed] = newProjects.splice(fromIndex, 1);
        newProjects.splice(toIndex, 0, removed);
        setProjects(newProjects);

        const updates = newProjects.map((project, index) => ({ id: project.id, sort_order: index }));
        await apiCall('/api/admin/projects', 'PATCH', updates);
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
            sessionStorage.setItem(PASSWORD_KEY, password); // Store for API calls
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem(PASSWORD_KEY);
        setIsAuthenticated(false);
    }, []);

    return { isAuthenticated, isChecking, login, logout };
}

export default useAdminData;
