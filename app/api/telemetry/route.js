import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
    const trimmed = logs.slice(0, 500);
    fs.writeFileSync(LOCAL_LOG_FILE, JSON.stringify(trimmed, null, 2));
    return trimmed;
  } catch (err) {
    console.error('Failed saving local telemetry log:', err);
    return [];
  }
}

async function getUpstashClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  const { Redis } = await import('@upstash/redis');
  return new Redis({ url, token });
}

function formatAsciiDashboard(analytics, logs) {
  const line = '═'.repeat(68);
  const sep = '─'.repeat(68);
  
  const devStr = Object.entries(analytics.devices || {})
    .map(([k, v]) => `${k}:${v}`)
    .join(' | ') || 'N/A';
  const geoStr = Object.entries(analytics.geography || {})
    .map(([k, v]) => `${k}:${v}`)
    .join(' | ') || 'N/A';

  let tableRows = '';
  if (!logs || logs.length === 0) {
    tableRows = '  No logs recorded yet.\n';
  } else {
    tableRows = logs.map((l) => {
      const timeStr = new Date(l.timestamp).toLocaleTimeString('id-ID', { hour12: false });
      const ip = (l.ip || 'unknown').padEnd(15);
      const loc = `${l.city || '?'}, ${l.country || '?'}`.padEnd(16).slice(0, 16);
      const dev = (l.deviceType || 'PC').padEnd(8).slice(0, 8);
      const sc = `${l.scrollDepth || 0}%`.padStart(5);
      const dw = `${l.dwellSeconds || 0}s`.padStart(5);
      return `│ ${timeStr} │ ${ip} │ ${loc} │ ${dev} │ ${sc} │ ${dw} │`;
    }).join('\n');
  }

  return `
╔${line}╗
║           KHAYYIS PORTFOLIO // TELEMETRY COMMAND CENTER            ║
║           Engine: ${(analytics.storageEngine || 'Serverless').padEnd(46)} ║
╠${line}╣
║ METRICS SUMMARY                                                    ║
║   • Total Visits      : ${String(analytics.totalVisits ?? 0).padEnd(43)}║
║   • Sample Streamed   : ${String(analytics.sampleSize ?? 0).padEnd(43)}║
║   • Avg Dwell Time    : ${String((analytics.averageDwellSeconds ?? 0) + 's').padEnd(43)}║
║   • Avg Scroll Depth  : ${String((analytics.averageScrollDepth ?? 0) + '%').padEnd(43)}║
║   • Devices           : ${devStr.padEnd(43).slice(0, 43)}║
║   • Demographics      : ${geoStr.padEnd(43).slice(0, 43)}║
╠${line}╣
║ RECENT VISITOR STREAM                                              ║
╟────────────────────────────────────────────────────────────────────╢
│ Time     │ IP              │ Location         │ Device   │ Scrl  │ Dwell │
╟────────────────────────────────────────────────────────────────────╢
${tableRows}
╚${line}╝
[Hint: Tambahkan &format=json untuk raw JSON]
\n`;
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
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
      await redis.lpush('khayyis_portfolio_logs', JSON.stringify(logEntry));
      await redis.ltrim('khayyis_portfolio_logs', 0, 999);
      await redis.incr('khayyis_portfolio_total_visits');
    } else {
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
    const format = searchParams.get('format');
    const userAgent = req.headers.get('user-agent') || '';
    const isCli = userAgent.startsWith('curl') || userAgent.startsWith('Wget') || format === 'text';

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

    // If accessed via CLI (curl / cmd) and not explicitly asking for JSON, return ASCII HUD
    if (isCli && format !== 'json') {
      return new Response(formatAsciiDashboard(analytics, logs), {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    return NextResponse.json({
      success: true,
      analytics,
      logs,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
