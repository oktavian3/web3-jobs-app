import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect /admin but NOT /admin/login
  if (pathname === '/admin' || (pathname.startsWith('/admin/') && pathname !== '/admin/login')) {
    const adminSession = request.cookies.get('admin_session');
    
    // Validate session token exists and is not empty
    if (!adminSession || !adminSession.value || adminSession.value.length < 10) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Additional validation: check token format (should be hex string)
    const hexRegex = /^[0-9a-f]{64}$/;
    if (!hexRegex.test(adminSession.value)) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
