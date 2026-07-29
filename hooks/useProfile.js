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
    about: "seorang siswa Teknik Mekatronika, antusias pada pengembangan robotik, desain 3D, dan teknologi AI. pernah berpartisipasi dalam Lomba Kompetensi Siswa bidang Autonomous Mobile Robotic. Selalu mencari peluang, serta mengembangkan keterampilan dalam bidang teknologi.",
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
 * Hook untuk mengambil data profil dari API
 * Menggunakan default data untuk SSR agar tidak terjadi hydration mismatch
 */
export function useProfile() {
    const [profile, setProfile] = useState(defaultProfile);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        async function loadProfile() {
            try {
                const res = await fetch('/api/data?type=profile');
                const data = await res.json();
                if (data && Object.keys(data).length > 0 && !data.error) {
                    setProfile({ ...defaultProfile, ...data });
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            }
            setIsLoaded(true);
        }

        loadProfile();
    }, []);

    // Return default profile during SSR and initial mount to prevent hydration mismatch
    return { profile, isLoaded, isMounted };
}

/**
 * Hook untuk mengambil data social dari API
 */
export function useSocial() {
    const [social, setSocial] = useState(defaultSocial);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        async function loadSocial() {
            try {
                const res = await fetch('/api/data?type=social');
                const data = await res.json();
                if (data && Object.keys(data).length > 0 && !data.error) {
                    setSocial({ ...defaultSocial, ...data });
                }
            } catch (error) {
                console.error('Error loading social:', error);
            }
            setIsLoaded(true);
        }

        loadSocial();
    }, []);

    return { social, isLoaded, isMounted };
}

/**
 * Hook untuk mengambil data skills dari API
 */
export function useSkills() {
    const [skills, setSkills] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

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

    return { skills, isLoaded, isMounted };
}

// Default projects data (fallback)
const defaultProjects = [
    {
        id: 1,
        title: 'Chatbot WhatsApp AI',
        subtitle: 'Chatbot pintar berbasis AI untuk WhatsApp',
        description: 'Chatbot pintar berbasis AI untuk WhatsApp dengan kemampuan memproses pesan dan memberikan respons otomatis.',
        category: 'AI',
        status: 'Selesai',
        image: '/images/CHATBOT-WHATSAPP.png',
        handle: '@ai-bot',
        url: 'https://github.com/khayyis',
        borderColor: '#a855f7',
        gradient: 'linear-gradient(145deg, #a855f7, transparent)',
        colorStops: ['#a855f7']
    },
    {
        id: 2,
        title: 'Autonomous Mobile Robotic',
        subtitle: 'Proyek Robotika Otonom LKS',
        description: 'Proyek robot otonom untuk kompetisi LKS dengan kemampuan navigasi dan pengenalan objek.',
        category: 'Robotik',
        status: 'Selesai',
        image: '/images/placeholder-project.jpg',
        handle: '@robotics',
        url: 'https://github.com/khayyis',
        borderColor: '#3B82F6',
        gradient: 'linear-gradient(145deg, #3B82F6, transparent)',
        colorStops: ['#3B82F6']
    },
    {
        id: 3,
        title: 'Desain & Modeling 3D',
        subtitle: 'Visualisasi dan Modeling 3D',
        description: 'Proyek desain 3D untuk berbagai keperluan visualisasi dan modeling.',
        category: 'Desain 3D',
        status: 'Dalam Pengembangan',
        image: '/images/Dalam-Tahap-Pengembangan.jpeg',
        handle: '@3d-design',
        url: 'https://github.com/khayyis',
        borderColor: '#ff6b9d',
        gradient: 'linear-gradient(145deg, #ff6b9d, transparent)',
        colorStops: ['#ff6b9d']
    }
];

/**
 * Hook untuk mengambil data projects dari API
 */
export function useProjects() {
    const [projects, setProjects] = useState(defaultProjects);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        async function loadProjects() {
            try {
                const res = await fetch('/api/data?type=projects');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data);
                } else {
                    setProjects(defaultProjects);
                }
            } catch (error) {
                console.error('Error loading projects:', error);
                setProjects(defaultProjects);
            }
            setIsLoaded(true);
        }

        loadProjects();
    }, []);

    return { projects, isLoaded, isMounted };
}

export default useProfile;
