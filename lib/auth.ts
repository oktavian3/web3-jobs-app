import { cookies } from 'next/headers';
import crypto from 'crypto';

// Session validation utility
export async function validateAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session || !session.value) {
    return false;
  }
  
  // Validate token format (64 char hex string)
  const hexRegex = /^[0-9a-f]{64}$/;
  return hexRegex.test(session.value);
}

// Generate CSRF token for forms
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Session cleanup utility (for future use with database)
export async function cleanupExpiredSessions(): Promise<void> {
  // Placeholder for when you implement database-backed sessions
  // This would remove sessions older than 7 days
}
