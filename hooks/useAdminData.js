'use client';

import { useState, useEffect, useCallback } from 'react';

const SKILLS_KEY = 'portfolio_skills';
const PROJECTS_KEY = 'portfolio_projects';
const PROFILE_KEY = 'portfolio_profile';
const SOCIAL_KEY = 'portfolio_social';
const AUTH_KEY = 'portfolio_admin_auth';

// Default skills data
const defaultSkills = [
    { id: '1', name: 'JavaScript', icon: '🟨', level: 90, category: 'Programming' },
    { id: '2', name: 'React', icon: '⚛️', level: 85, category: 'Framework' },
    { id: '3', name: 'Node.js', icon: '🟩', level: 80, category: 'Backend' },
    { id: '4', name: 'Python', icon: '🐍', level: 75, category: 'Programming' },
    { id: '5', name: 'Arduino', icon: '🔌', level: 85, category: 'Hardware' },
    { id: '6', name: 'Blender', icon: '🎨', level: 70, category: '3D Design' },
];

// Default projects data
const defaultProjects = [];

// Default profile data
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
    about: "seorang siswa Teknik Mekatronika, antusias pada pengembangan robotik, desain 3D, dan teknologi AI. pernah berpartisipasi dalam Lomba Kompetensi Siswa bidang Autonomous Mobile Robotic. Selalu mencari peluang, serta mengembangkan keterampilan dalam bidang teknologi.",
    contactText: "Kontak Saya",
    contactButtonText: "Hubungi Saya",
    sendMessageText: "Kirim Pesan",
};

// Default social data
const defaultSocial = {
    instagram: { url: "https://instagram.com/Khayyis_Billawal", username: "@Khayyis_Billawal", enabled: true },
    github: { url: "https://github.com/khayyis", username: "khayyis", enabled: true },
    linkedin: { url: "https://linkedin.com/in/khayyis-billawal", username: "khayyis-billawal", enabled: true },
    twitter: { url: "", username: "", enabled: false },
    youtube: { url: "", username: "", enabled: false },
    whatsapp: { number: "+6281234567890", message: "Halo, saya melihat portfolio Anda.", enabled: true },
    telegram: { username: "KhayyisBillawal", url: "http://t.me/KhayyisBillawal", enabled: true },
};

// Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export function useAdminData() {
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [profile, setProfile] = useState(defaultProfile);
    const [social, setSocial] = useState(defaultSocial);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSkills = localStorage.getItem(SKILLS_KEY);
            const savedProjects = localStorage.getItem(PROJECTS_KEY);
            const savedProfile = localStorage.getItem(PROFILE_KEY);
            const savedSocial = localStorage.getItem(SOCIAL_KEY);

            setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills);
            setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects);
            setProfile(savedProfile ? JSON.parse(savedProfile) : defaultProfile);
            setSocial(savedSocial ? JSON.parse(savedSocial) : defaultSocial);
            setIsLoaded(true);
        }
    }, []);

    // Save skills to localStorage
    const saveSkills = useCallback((newSkills) => {
        setSkills(newSkills);
        if (typeof window !== 'undefined') {
            localStorage.setItem(SKILLS_KEY, JSON.stringify(newSkills));
        }
    }, []);

    // Save projects to localStorage
    const saveProjects = useCallback((newProjects) => {
        setProjects(newProjects);
        if (typeof window !== 'undefined') {
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));
        }
    }, []);

    // Save profile to localStorage
    const saveProfile = useCallback((newProfile) => {
        setProfile(newProfile);
        if (typeof window !== 'undefined') {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
        }
    }, []);

    // Save social to localStorage
    const saveSocial = useCallback((newSocial) => {
        setSocial(newSocial);
        if (typeof window !== 'undefined') {
            localStorage.setItem(SOCIAL_KEY, JSON.stringify(newSocial));
        }
    }, []);

    // Skills CRUD
    const addSkill = useCallback((skill) => {
        const newSkill = { ...skill, id: generateId() };
        saveSkills([...skills, newSkill]);
        return newSkill;
    }, [skills, saveSkills]);

    const updateSkill = useCallback((id, updates) => {
        const newSkills = skills.map(s => s.id === id ? { ...s, ...updates } : s);
        saveSkills(newSkills);
    }, [skills, saveSkills]);

    const deleteSkill = useCallback((id) => {
        saveSkills(skills.filter(s => s.id !== id));
    }, [skills, saveSkills]);

    const reorderSkills = useCallback((fromIndex, toIndex) => {
        const newSkills = [...skills];
        const [removed] = newSkills.splice(fromIndex, 1);
        newSkills.splice(toIndex, 0, removed);
        saveSkills(newSkills);
    }, [skills, saveSkills]);

    // Projects CRUD
    const addProject = useCallback((project) => {
        const newProject = { ...project, id: generateId() };
        saveProjects([...projects, newProject]);
        return newProject;
    }, [projects, saveProjects]);

    const updateProject = useCallback((id, updates) => {
        const newProjects = projects.map(p => p.id === id ? { ...p, ...updates } : p);
        saveProjects(newProjects);
    }, [projects, saveProjects]);

    const deleteProject = useCallback((id) => {
        saveProjects(projects.filter(p => p.id !== id));
    }, [projects, saveProjects]);

    const reorderProjects = useCallback((fromIndex, toIndex) => {
        const newProjects = [...projects];
        const [removed] = newProjects.splice(fromIndex, 1);
        newProjects.splice(toIndex, 0, removed);
        saveProjects(newProjects);
    }, [projects, saveProjects]);

    // Profile update
    const updateProfile = useCallback((updates) => {
        const newProfile = { ...profile, ...updates };
        saveProfile(newProfile);
    }, [profile, saveProfile]);

    // Social update
    const updateSocial = useCallback((platform, updates) => {
        const newSocial = { ...social, [platform]: { ...social[platform], ...updates } };
        saveSocial(newSocial);
    }, [social, saveSocial]);

    // Export data as JSON
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

    // Import data from JSON
    const importData = useCallback((jsonData) => {
        try {
            const data = JSON.parse(jsonData);
            if (data.skills) saveSkills(data.skills);
            if (data.projects) saveProjects(data.projects);
            if (data.profile) saveProfile(data.profile);
            if (data.social) saveSocial(data.social);
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    }, [saveSkills, saveProjects, saveProfile, saveSocial]);

    return {
        skills,
        projects,
        profile,
        social,
        isLoaded,
        // Skills
        addSkill,
        updateSkill,
        deleteSkill,
        reorderSkills,
        // Projects
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        // Profile & Social
        updateProfile,
        updateSocial,
        // Import/Export
        exportData,
        importData,
    };
}

// Auth hook
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
        // Simple password check - in production use env variable
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

