import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import crypto from 'crypto';

// In-memory rate limiting (resets on server restart)
const loginAttempts = new Map<string, { count: number; firstAttempt: number; blocked: boolean }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000; // 30 minutes lockout

function getRateLimitKey(ip: string): string {
  return `login_${ip}`;
}

function checkRateLimit(ip: string): { allowed: boolean; attemptsLeft: number; retryAfter?: number } {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) {
    return { allowed: true, attemptsLeft: MAX_ATTEMPTS };
  }

  // Check if lockout period has passed
  if (record.blocked) {
    const timeSinceBlock = now - record.firstAttempt;
    if (timeSinceBlock > LOCKOUT_MS) {
      loginAttempts.delete(key);
      return { allowed: true, attemptsLeft: MAX_ATTEMPTS };
    }
    return { 
      allowed: false, 
      attemptsLeft: 0, 
      retryAfter: Math.ceil((LOCKOUT_MS - timeSinceBlock) / 1000) 
    };
  }

  // Check if window has passed
  if (now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.delete(key);
    return { allowed: true, attemptsLeft: MAX_ATTEMPTS };
  }

  return { allowed: record.count < MAX_ATTEMPTS, attemptsLeft: MAX_ATTEMPTS - record.count };
}

function recordFailedAttempt(ip: string): void {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) {
    loginAttempts.set(key, { count: 1, firstAttempt: now, blocked: false });
  } else {
    record.count++;
    if (record.count >= MAX_ATTEMPTS) {
      record.blocked = true;
    }
  }
}

function clearAttempts(ip: string): void {
  const key = getRateLimitKey(ip);
  loginAttempts.delete(key);
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: Request) {
  const { username, password } = await request.json();
  
  // Get client IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

  // Rate limiting check
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { 
        error: 'Too many login attempts. Please try again later.',
        retryAfter: rateLimit.retryAfter 
      }, 
      { status: 429 }
    );
  }

  // Validate credentials
  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD;

  if (username === validUsername && password === validPassword) {
    // Success - clear rate limit and create session
    clearAttempts(ip);
    
    const sessionToken = generateSessionToken();
    const response = NextResponse.json({ success: true });
    
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
  }

  // Failed - record attempt
  recordFailedAttempt(ip);
  
  const remainingAttempts = MAX_ATTEMPTS - (loginAttempts.get(getRateLimitKey(ip))?.count || 0);
  
  return NextResponse.json(
    { 
      error: 'Invalid credentials',
      attemptsLeft: remainingAttempts
    }, 
    { status: 401 }
  );
}
