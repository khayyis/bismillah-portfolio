'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
 * Hook untuk mengambil data profil dari Supabase
 * Digunakan oleh komponen frontend untuk menampilkan data
 */
export function useProfile() {
    const [profile, setProfile] = useState(defaultProfile);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            try {
                const { data, error } = await supabase
                    .from('portfolio_settings')
                    .select('data')
                    .eq('type', 'profile')
                    .single();

                if (data && data.data) {
                    setProfile(data.data);
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
 * Hook untuk mengambil data social dari Supabase
 */
export function useSocial() {
    const [social, setSocial] = useState(defaultSocial);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadSocial() {
            try {
                const { data, error } = await supabase
                    .from('portfolio_settings')
                    .select('data')
                    .eq('type', 'social')
                    .single();

                if (data && data.data) {
                    setSocial(data.data);
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
 * Hook untuk mengambil data skills dari Supabase
 */
export function useSkills() {
    const [skills, setSkills] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadSkills() {
            try {
                const { data, error } = await supabase
                    .from('skills')
                    .select('*')
                    .order('sort_order', { ascending: true });

                if (data) {
                    setSkills(data.map(s => ({
                        id: s.id,
                        name: s.name,
                        icon: s.icon,
                        level: s.level,
                        category: s.category
                    })));
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
 * Hook untuk mengambil data projects dari Supabase
 */
export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('sort_order', { ascending: true });

                if (data) {
                    setProjects(data.map(p => ({
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
