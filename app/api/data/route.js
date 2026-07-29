import { NextResponse } from 'next/server';
import { getAdminSupabase } from '../../../lib/supabase';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Public API - untuk baca data (tidak perlu auth)
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'profile', 'social', 'skills', 'projects'

    try {
        const supabase = getAdminSupabase();

        if (type === 'profile') {
            const { data } = await supabase
                .from('portfolio_settings')
                .select('data')
                .eq('type', 'profile')
                .single();
            return NextResponse.json(data?.data || {});
        }

        if (type === 'social') {
            const { data } = await supabase
                .from('portfolio_settings')
                .select('data')
                .eq('type', 'social')
                .single();
            return NextResponse.json(data?.data || {});
        }

        if (type === 'skills') {
            const { data } = await supabase
                .from('skills')
                .select('*')
                .order('sort_order', { ascending: true });

            const skills = (data || []).map(s => ({
                id: s.id,
                name: s.name,
                icon: s.icon,
                level: s.level,
                category: s.category,
                description: s.description
            }));
            return NextResponse.json(skills, {
                headers: {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                }
            });
        }

        if (type === 'projects') {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .order('sort_order', { ascending: true });

            const projects = (data || []).map(p => ({
                id: p.id,
                title: p.title,
                subtitle: p.subtitle,
                description: p.description || p.subtitle || '',
                category: p.category || 'Proyek',
                status: p.status || 'Selesai',
                image: p.image,
                handle: p.handle,
                url: p.url,
                borderColor: p.border_color,
                gradient: p.gradient,
                colorStops: [p.border_color || '#3B82F6']
            }));

            if (projects.length === 0) {
                return NextResponse.json([
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
                ]);
            }

            return NextResponse.json(projects);
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        console.error('Data fetch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
