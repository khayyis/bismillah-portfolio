import { NextResponse } from 'next/server';
import { getAdminSupabase } from '../../../../lib/supabase';

function verifyPassword(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }
    const password = authHeader.substring(7);
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    return password === adminPassword;
}

// GET - Read all skills
export async function GET() {
    try {
        const supabase = getAdminSupabase();
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;

        const skills = (data || []).map(s => ({
            id: s.id,
            name: s.name,
            icon: s.icon,
            level: s.level,
            category: s.category
        }));

        return NextResponse.json({ success: true, data: skills });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST - Add new skill
export async function POST(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const supabase = getAdminSupabase();

        // Get current count for sort_order
        const { count } = await supabase.from('skills').select('*', { count: 'exact', head: true });

        const { data, error } = await supabase
            .from('skills')
            .insert({
                name: body.name,
                icon: body.icon || '⚡',
                level: body.level || 80,
                category: body.category || '',
                sort_order: count || 0
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({
            success: true, data: {
                id: data.id,
                name: data.name,
                icon: data.icon,
                level: data.level,
                category: data.category
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT - Update skill
export async function PUT(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const supabase = getAdminSupabase();

        const { data, error } = await supabase
            .from('skills')
            .update({
                name: body.name,
                icon: body.icon,
                level: body.level,
                category: body.category,
                updated_at: new Date().toISOString()
            })
            .eq('id', body.id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE - Delete skill
export async function DELETE(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const supabase = getAdminSupabase();
        const { error } = await supabase.from('skills').delete().eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PATCH - Reorder skills
export async function PATCH(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json(); // Array of { id, sort_order }
        const supabase = getAdminSupabase();

        for (const item of body) {
            await supabase
                .from('skills')
                .update({ sort_order: item.sort_order })
                .eq('id', item.id);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
