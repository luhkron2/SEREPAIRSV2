import { auth } from './auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/report', '/login', '/api/issues', '/api/upload', '/api/mappings'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Allow public routes
  if (isPublicRoute) {
    // But if it's POST /api/issues (public submission), allow it
    if (pathname === '/api/issues' && req.method === 'POST') {
      return NextResponse.next();
    }
    if (pathname.startsWith('/thanks/')) {
      return NextResponse.next();
    }
    if (!isLoggedIn && !pathname.startsWith('/login')) {
      // Allow public access
      return NextResponse.next();
    }
  }

  // Protected routes
  const protectedRoutes = ['/workshop', '/operations', '/schedule', '/issues', '/admin'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin-only routes
  if (pathname.startsWith('/admin')) {
    const userRole = req.auth?.user?.role;
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/workshop', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$|.*\\.jpg$|.*\\.svg$|favicon.ico).*)'],
};

