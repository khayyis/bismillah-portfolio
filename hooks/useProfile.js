'use client';

import { useState, useEffect } from 'react';

// Default profile data (fallback)
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

// Default social data (fallback)
const defaultSocial = {
    instagram: { url: "https://instagram.com/Khayyis_Billawal", username: "@Khayyis_Billawal", enabled: true },
    github: { url: "https://github.com/khayyis", username: "khayyis", enabled: true },
    linkedin: { url: "https://linkedin.com/in/khayyis-billawal", username: "khayyis-billawal", enabled: true },
    twitter: { url: "", username: "", enabled: false },
    youtube: { url: "", username: "", enabled: false },
    whatsapp: { number: "+6281234567890", message: "Halo, saya melihat portfolio Anda.", enabled: true },
    telegram: { username: "KhayyisBillawal", url: "http://t.me/KhayyisBillawal", enabled: true },
};

/**
 * Hook untuk mengambil data profil dari API (bukan langsung ke Supabase)
 * Supabase URL dan key tidak akan terlihat di browser
 */
export function useProfile() {
    const [profile, setProfile] = useState(defaultProfile);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            try {
                const res = await fetch('/api/data?type=profile');
                const data = await res.json();
                if (data && Object.keys(data).length > 0) {
                    setProfile({ ...defaultProfile, ...data });
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            }
            setIsLoaded(true);
        }

        loadProfile();
    }, []);

    return { profile, isLoaded };
}

/**
 * Hook untuk mengambil data social dari API
 */
export function useSocial() {
    const [social, setSocial] = useState(defaultSocial);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadSocial() {
            try {
                const res = await fetch('/api/data?type=social');
                const data = await res.json();
                if (data && Object.keys(data).length > 0) {
                    setSocial({ ...defaultSocial, ...data });
                }
            } catch (error) {
                console.error('Error loading social:', error);
            }
            setIsLoaded(true);
        }

        loadSocial();
    }, []);

    return { social, isLoaded };
}

/**
 * Hook untuk mengambil data skills dari API
 */
export function useSkills() {
    const [skills, setSkills] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadSkills() {
            try {
                const res = await fetch('/api/data?type=skills');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setSkills(data);
                }
            } catch (error) {
                console.error('Error loading skills:', error);
            }
            setIsLoaded(true);
        }

        loadSkills();
    }, []);

    return { skills, isLoaded };
}

/**
 * Hook untuk mengambil data projects dari API
 */
export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadProjects() {
            try {
                const res = await fetch('/api/data?type=projects');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProjects(data);
                }
            } catch (error) {
                console.error('Error loading projects:', error);
            }
            setIsLoaded(true);
        }

        loadProjects();
    }, []);

    return { projects, isLoaded };
}

export default useProfile;
