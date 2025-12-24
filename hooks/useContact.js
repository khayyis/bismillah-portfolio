'use client';

import { useState, useEffect } from 'react';

// Default contact data (fallback)
const defaultContact = {
    email: { address: "khayyis8@gmail.com", subject: "Kontak dari Website Portfolio", enabled: true },
    telegram: { username: "KhayyisBillawal", url: "http://t.me/KhayyisBillawal", enabled: true },
    school: { name: "SMKN 4 Jakarta", department: "Jurusan Teknik Mekatronika", enabled: true },
    photography: { title: "Landscape & Portrait Photography", subtitle: "Tersedia untuk sesi foto", enabled: true },
    sectionTitle: "Hubungi Saya",
    sectionSubtitle: "Tertarik untuk berkolaborasi atau memiliki pertanyaan? Jangan ragu untuk menghubungi saya!"
};

/**
 * Hook untuk mengambil data contact dari API
 */
export function useContact() {
    const [contact, setContact] = useState(defaultContact);
    const [customLinks, setCustomLinks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        async function loadContact() {
            try {
                const [contactRes, linksRes] = await Promise.all([
                    fetch('/api/admin/contact').then(r => r.json()),
                    fetch('/api/admin/custom-links').then(r => r.json())
                ]);

                if (contactRes.success && contactRes.data && Object.keys(contactRes.data).length > 0) {
                    setContact({ ...defaultContact, ...contactRes.data });
                }
                if (linksRes.success && Array.isArray(linksRes.data)) {
                    setCustomLinks(linksRes.data.filter(l => l.enabled));
                }
            } catch (error) {
                console.error('Error loading contact:', error);
            }
            setIsLoaded(true);
        }

        loadContact();
    }, []);

    return { contact, customLinks, isLoaded, isMounted };
}

export default useContact;
