import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Memory / Local file fallback buffer when Upstash env vars are not set
const LOCAL_LOG_DIR = path.join(process.cwd(), '.next-telemetry-cache');
const LOCAL_LOG_FILE = path.join(LOCAL_LOG_DIR, 'visitor-logs.json');

function getLocalLogs() {
  try {
    if (!fs.existsSync(LOCAL_LOG_DIR)) {
      fs.mkdirSync(LOCAL_LOG_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_LOG_FILE)) {
      fs.writeFileSync(LOCAL_LOG_FILE, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(LOCAL_LOG_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
}

function saveLocalLog(entry) {
  try {
    const logs = getLocalLogs();
    logs.unshift(entry);
    // keep max 500 records locally
    const trimmed = logs.slice(0, 500);
    fs.writeFileSync(LOCAL_LOG_FILE, JSON.stringify(trimmed, null, 2));
    return trimmed;
  } catch (err) {
    console.error('Failed saving local telemetry log:', err);
    return [];
  }
}

async function getUpstashClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const { Redis } = await import('@upstash/redis');
  return new Redis({ url, token });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    
    // Invariant extraction: IP & Geolocation headers from Vercel / Edge
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const country = req.headers.get('x-vercel-ip-country') || 'ID';
    const city = req.headers.get('x-vercel-ip-city') || 'Local';
    const referer = req.headers.get('referer') || body.referrer || 'Direct';

    const timestamp = Date.now();
    const logEntry = {
      id: `vis_${timestamp}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp,
      dateIso: new Date(timestamp).toISOString(),
      ip: clientIp,
      userAgent,
      country,
      city,
      referer,
      sectionViews: body.sectionViews || [],
      currentSection: body.currentSection || 'hero',
      scrollDepth: Number(body.scrollDepth) || 0,
      dwellSeconds: Number(body.dwellSeconds) || 0,
      deviceType: body.deviceType || (userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'),
      screen: body.screen || 'unknown',
    };

    const redis = await getUpstashClient();
    if (redis) {
      // Push to Upstash Redis list & sorted set for time-series analytics
      await redis.lpush('khayyis_portfolio_logs', JSON.stringify(logEntry));
      await redis.ltrim('khayyis_portfolio_logs', 0, 999); // Retain top 1000 logs
      await redis.incr('khayyis_portfolio_total_visits');
    } else {
      // Local fallback for offline / dev without credentials
      saveLocalLog(logEntry);
    }

    return NextResponse.json({ success: true, entryId: logEntry.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);

    const redis = await getUpstashClient();
    let logs = [];
    let totalVisits = 0;

    if (redis) {
      const rawLogs = await redis.lrange('khayyis_portfolio_logs', 0, limit - 1);
      logs = (rawLogs || []).map((item) => (typeof item === 'string' ? JSON.parse(item) : item));
      totalVisits = (await redis.get('khayyis_portfolio_total_visits')) || logs.length;
    } else {
      logs = getLocalLogs().slice(0, limit);
      totalVisits = logs.length;
    }

    // Statistical & Data Science Aggregation for NeuroDataScienceSection
    const deviceCounts = {};
    const sectionCounts = {};
    const countryCounts = {};
    let totalDwell = 0;
    let totalDepth = 0;

    logs.forEach((log) => {
      const dev = log.deviceType || 'Desktop';
      deviceCounts[dev] = (deviceCounts[dev] || 0) + 1;

      const sec = log.currentSection || 'hero';
      sectionCounts[sec] = (sectionCounts[sec] || 0) + 1;

      const ctry = log.country || 'ID';
      countryCounts[ctry] = (countryCounts[ctry] || 0) + 1;

      totalDwell += log.dwellSeconds || 0;
      totalDepth += log.scrollDepth || 0;
    });

    const count = logs.length || 1;
    const analytics = {
      totalVisits: Number(totalVisits),
      sampleSize: logs.length,
      averageDwellSeconds: Math.round(totalDwell / count),
      averageScrollDepth: Math.round(totalDepth / count),
      devices: deviceCounts,
      sections: sectionCounts,
      geography: countryCounts,
      storageEngine: redis ? 'Upstash Redis (Serverless KV)' : 'Local File Buffer (Fallback)',
    };

    return NextResponse.json({
      success: true,
      analytics,
      logs,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
