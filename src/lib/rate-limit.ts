import { NextRequest } from 'next/server';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(config: RateLimitConfig) {
  return (request: NextRequest): { allowed: boolean; remaining: number } => {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Clean up expired entries
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }

    const key = `${ip}:${Math.floor(now / config.windowMs)}`;
    const current = rateLimitStore.get(key);

    if (!current) {
      rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
      return { allowed: true, remaining: config.maxRequests - 1 };
    }

    if (current.count >= config.maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    current.count++;
    return { allowed: true, remaining: config.maxRequests - current.count };
  };
}

// Rate limit configurations
export const RATE_LIMITS = {
  // Public issue submission: 5 per minute
  ISSUE_SUBMISSION: { windowMs: 60 * 1000, maxRequests: 5 },
  // API calls: 100 per minute
  API_CALLS: { windowMs: 60 * 1000, maxRequests: 100 },
  // File uploads: 10 per minute
  FILE_UPLOADS: { windowMs: 60 * 1000, maxRequests: 10 },
} as const;
