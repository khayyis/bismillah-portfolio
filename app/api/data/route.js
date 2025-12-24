import { NextResponse } from 'next/server';
import { getAdminSupabase } from '../../../../lib/supabase';

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
                category: s.category
            }));
            return NextResponse.json(skills);
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
                image: p.image,
                handle: p.handle,
                url: p.url,
                borderColor: p.border_color,
                gradient: p.gradient
            }));
            return NextResponse.json(projects);
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        console.error('Data fetch error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
