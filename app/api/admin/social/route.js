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

// GET - Read social data
export async function GET() {
    try {
        const supabase = getAdminSupabase();
        const { data, error } = await supabase
            .from('portfolio_settings')
            .select('*')
            .eq('type', 'social')
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return NextResponse.json({ success: true, data: data?.data || {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// PUT - Update social data
export async function PUT(request) {
    if (!verifyPassword(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const supabase = getAdminSupabase();

        const { data, error } = await supabase
            .from('portfolio_settings')
            .upsert({
                type: 'social',
                data: body,
                updated_at: new Date().toISOString()
            }, { onConflict: 'type' })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ success: true, data: data?.data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
