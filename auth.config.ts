import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/workshop') ||
        nextUrl.pathname.startsWith('/operations') ||
        nextUrl.pathname.startsWith('/schedule') ||
        nextUrl.pathname.startsWith('/issues') ||
        nextUrl.pathname.startsWith('/admin');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      return true; // Allow public routes
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig;

