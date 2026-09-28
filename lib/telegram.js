import crypto from 'crypto';

/**
 * Mem-parse query string initData dari Telegram WebApp ke object terstruktur
 */
export function parseTelegramInitData(initDataString) {
  if (!initDataString) return { user: null, authDate: null, hash: null, raw: {} };

  try {
    const params = new URLSearchParams(initDataString);
    const result = { raw: {} };

    for (const [key, value] of params.entries()) {
      result.raw[key] = value;
      if (key === 'user') {
        try {
          result.user = JSON.parse(value);
        } catch {
          result.user = null;
        }
      } else if (key === 'auth_date') {
        result.authDate = parseInt(value, 10);
      } else if (key === 'hash') {
        result.hash = value;
      }
    }

    return result;
  } catch (err) {
    console.error('Error parsing Telegram initData:', err);
    return { user: null, authDate: null, hash: null, raw: {} };
  }
}

/**
 * Validasi Kriptografis HMAC-SHA256 Telegram initData
 * Sesuai dokumentasi resmi Telegram Core API
 */
export function verifyTelegramWebAppData(initDataString, botToken = process.env.TELEGRAM_BOT_TOKEN) {
  if (!initDataString || !botToken) {
    return { valid: false, reason: 'Missing initData or bot token' };
  }

  try {
    const params = new URLSearchParams(initDataString);
    const hash = params.get('hash');
    if (!hash) return { valid: false, reason: 'Hash missing from initData' };

    params.delete('hash');

    // Urutkan parameter secara alfabetis A-Z
    const sortedKeys = Array.from(params.keys()).sort();
    const dataCheckString = sortedKeys.map(k => `${k}=${params.get(k)}`).join('\n');

    // 1. secretKey = HMAC_SHA256("WebAppData", botToken)
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();

    // 2. signature = HMAC_SHA256(secretKey, dataCheckString)
    const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (calculatedHash !== hash) {
      return { valid: false, reason: 'Hash mismatch signature invalid' };
    }

    // 3. Batas waktu kedaluwarsa 24 jam untuk authDate
    const authDate = parseInt(params.get('auth_date') || '0', 10);
    const now = Math.floor(Date.now() / 1000);
    if (authDate > 0 && now - authDate > 86400) {
      return { valid: false, reason: 'Session expired (over 24 hours)' };
    }

    const userRaw = params.get('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    return { valid: true, user, authDate };
  } catch (err) {
    return { valid: false, reason: err.message };
  }
}
