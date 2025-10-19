import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is trying to access protected routes
  const protectedRoutes = ['/workshop', '/operations'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    // For now, let the client-side authentication handle the protection
    // The useAuth hook will redirect if not authenticated
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/workshop/:path*', '/operations/:path*']
};
