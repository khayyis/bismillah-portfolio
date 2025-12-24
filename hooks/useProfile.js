'use client';

import { useState, useEffect } from 'react';

const PROFILE_KEY = 'portfolio_profile';
const SOCIAL_KEY = 'portfolio_social';

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
 * Hook untuk mengambil data profil dari localStorage
 * Digunakan oleh komponen frontend untuk menampilkan data yang dikelola dari admin
 */
export function useProfile() {
    const [profile, setProfile] = useState(defaultProfile);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedProfile = localStorage.getItem(PROFILE_KEY);
            if (savedProfile) {
                setProfile(JSON.parse(savedProfile));
            }
            setIsLoaded(true);
        }
    }, []);

    return { profile, isLoaded };
}

/**
 * Hook untuk mengambil data social dari localStorage
 */
export function useSocial() {
    const [social, setSocial] = useState(defaultSocial);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSocial = localStorage.getItem(SOCIAL_KEY);
            if (savedSocial) {
                setSocial(JSON.parse(savedSocial));
            }
            setIsLoaded(true);
        }
    }, []);

    return { social, isLoaded };
}

export default useProfile;
