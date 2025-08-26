import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const enabled = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = enabled ? Redis.fromEnv() : null;
const ratelimit = enabled ? new Ratelimit({
  redis: redis!,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: false,
  prefix: 'rl-rede5min-pro-plus',
}) : null;

export async function middleware(req: NextRequest) {
  if (!enabled) return NextResponse.next();
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const ip = req.ip ?? '127.0.0.1';
    const { success, limit, remaining, reset } = await ratelimit!.limit(ip);
    const res = success ? NextResponse.next() : NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    res.headers.set('X-RateLimit-Limit', String(limit));
    res.headers.set('X-RateLimit-Remaining', String(remaining));
    res.headers.set('X-RateLimit-Reset', String(reset));
    return res;
  }
  return NextResponse.next();
}
export const config = { matcher: ['/api/:path*'] };
