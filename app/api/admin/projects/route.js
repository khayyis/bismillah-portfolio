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

// GET - Read all projects
export async function GET() {
    try {
        const supabase = getAdminSupabase();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;

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
            gradient: p.gradient
        }));

        return NextResponse.json({ success: true, data: projects });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST - Add new project
export async function POST(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const supabase = getAdminSupabase();

        const { count } = await supabase.from('projects').select('*', { count: 'exact', head: true });

        const { data, error } = await supabase
            .from('projects')
            .insert({
                title: body.title,
                subtitle: body.subtitle || '',
                description: body.description || body.subtitle || '',
                category: body.category || 'Proyek',
                status: body.status || 'Selesai',
                image: body.image || '/images/Dalam-Tahap-Pengembangan.jpeg',
                handle: body.handle || '',
                url: body.url || '',
                border_color: body.borderColor || '#3B82F6',
                gradient: body.gradient || 'linear-gradient(145deg, #3B82F6, transparent)',
                sort_order: count || 0
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({
            success: true, data: {
                id: data.id,
                title: data.title,
                subtitle: data.subtitle,
                description: data.description,
                category: data.category,
                status: data.status,
                image: data.image,
                handle: data.handle,
                url: data.url,
                borderColor: data.border_color,
                gradient: data.gradient
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT - Update project
export async function PUT(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const supabase = getAdminSupabase();

        // Build update object only with defined fields
        const updateData = {
            updated_at: new Date().toISOString()
        };

        if (body.title !== undefined) updateData.title = body.title;
        if (body.subtitle !== undefined) updateData.subtitle = body.subtitle;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.category !== undefined) updateData.category = body.category;
        if (body.status !== undefined) updateData.status = body.status;
        if (body.image !== undefined) updateData.image = body.image;
        if (body.handle !== undefined) updateData.handle = body.handle;
        if (body.url !== undefined) updateData.url = body.url;
        if (body.borderColor !== undefined) updateData.border_color = body.borderColor;
        if (body.gradient !== undefined) updateData.gradient = body.gradient;

        console.log('Updating project:', body.id, 'with:', updateData);

        const { data, error } = await supabase
            .from('projects')
            .update(updateData)
            .eq('id', body.id)
            .select()
            .single();

        if (error) throw error;
        console.log('Update result:', data);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE - Delete project
export async function DELETE(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const supabase = getAdminSupabase();
        const { error } = await supabase.from('projects').delete().eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PATCH - Reorder projects
export async function PATCH(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const supabase = getAdminSupabase();

        for (const item of body) {
            await supabase
                .from('projects')
                .update({ sort_order: item.sort_order })
                .eq('id', item.id);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
