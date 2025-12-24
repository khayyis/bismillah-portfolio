import { NextResponse } from 'next/server';
import { getAdminSupabase } from '../../../../lib/supabase';

// Verify admin password
function verifyPassword(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }
    const password = authHeader.substring(7);
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    return password === adminPassword;
}

// GET - Read all custom links
export async function GET() {
    try {
        const supabase = getAdminSupabase();
        const { data, error } = await supabase
            .from('custom_links')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return NextResponse.json({ success: true, data: data || [] });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST - Create new custom link
export async function POST(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const supabase = getAdminSupabase();

        // Get max sort_order
        const { data: maxData } = await supabase
            .from('custom_links')
            .select('sort_order')
            .order('sort_order', { ascending: false })
            .limit(1);

        const maxOrder = maxData && maxData.length > 0 ? maxData[0].sort_order : -1;

        const { data, error } = await supabase
            .from('custom_links')
            .insert({
                title: body.title || 'New Link',
                subtitle: body.subtitle || '',
                url: body.url || '',
                icon: body.icon || '🔗',
                enabled: body.enabled !== false,
                sort_order: maxOrder + 1
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT - Update custom link
export async function PUT(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, ...updates } = body;
        const supabase = getAdminSupabase();

        const { data, error } = await supabase
            .from('custom_links')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE - Delete custom link
export async function DELETE(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const supabase = getAdminSupabase();

        const { error } = await supabase
            .from('custom_links')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PATCH - Reorder custom links
export async function PATCH(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const updates = await request.json();
        const supabase = getAdminSupabase();

        for (const item of updates) {
            await supabase
                .from('custom_links')
                .update({ sort_order: item.sort_order })
                .eq('id', item.id);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
