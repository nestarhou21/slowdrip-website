import { NextResponse } from 'next/server';

// TEMPORARY diagnostic — measures where request time goes. Delete after use.
const POS_API_URL = process.env.POS_API_URL ?? 'http://localhost:8000/api';

async function timed(label: string, url: string) {
  const t0 = Date.now();
  try {
    const res = await fetch(url, { cache: 'no-store' });
    await res.text();
    return { label, url, ms: Date.now() - t0, status: res.status };
  } catch (e) {
    return { label, url, ms: Date.now() - t0, error: String(e).slice(0, 200) };
  }
}

export async function GET() {
  const t0 = Date.now();
  const posUrlHost = (() => { try { return new URL(POS_API_URL).host; } catch { return 'INVALID:' + POS_API_URL; } })();

  const sequential = [
    await timed('pos_menu', `${POS_API_URL}/public/menu`),
    await timed('pos_menu_again', `${POS_API_URL}/public/menu`),
    await timed('external_control', 'https://api.telegram.org'),
  ];

  return NextResponse.json({
    posApiHost: posUrlHost,
    posApiIsHttps: POS_API_URL.startsWith('https://'),
    telegramConfigured: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    sequential,
    totalMs: Date.now() - t0,
  });
}
