'use client';

import { useState, useEffect, useCallback } from 'react';

const SKILLS_KEY = 'portfolio_skills';
const PROJECTS_KEY = 'portfolio_projects';
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

// Generate unique ID
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export function useAdminData() {
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSkills = localStorage.getItem(SKILLS_KEY);
            const savedProjects = localStorage.getItem(PROJECTS_KEY);

            setSkills(savedSkills ? JSON.parse(savedSkills) : defaultSkills);
            setProjects(savedProjects ? JSON.parse(savedProjects) : defaultProjects);
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

    // Export data as JSON
    const exportData = useCallback(() => {
        const data = { skills, projects, exportedAt: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }, [skills, projects]);

    // Import data from JSON
    const importData = useCallback((jsonData) => {
        try {
            const data = JSON.parse(jsonData);
            if (data.skills) saveSkills(data.skills);
            if (data.projects) saveProjects(data.projects);
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    }, [saveSkills, saveProjects]);

    return {
        skills,
        projects,
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
