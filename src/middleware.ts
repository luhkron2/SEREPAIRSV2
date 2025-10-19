import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is trying to access protected routes
  const protectedRoutes = ['/workshop', '/operations'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // Check for authentication in headers (we'll set this in the client)
    const isAuthenticated = request.headers.get('x-authenticated') === 'true';
    const accessLevel = request.headers.get('x-access-level');
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/access', request.url));
    }
    
    // Check specific access levels
    if (pathname.startsWith('/workshop') && accessLevel !== 'workshop') {
      return NextResponse.redirect(new URL('/access', request.url));
    }
    
    if (pathname.startsWith('/operations') && accessLevel !== 'operations') {
      return NextResponse.redirect(new URL('/access', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/workshop/:path*', '/operations/:path*']
};
