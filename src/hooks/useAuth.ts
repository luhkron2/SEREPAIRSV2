'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessLevel, setAccessLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      const auth = sessionStorage.getItem('isAuthenticated');
      const level = sessionStorage.getItem('accessLevel');
      
      if (auth === 'true' && level) {
        setIsAuthenticated(true);
        setAccessLevel(level);
      } else {
        setIsAuthenticated(false);
        setAccessLevel(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('accessLevel');
    setIsAuthenticated(false);
    setAccessLevel(null);
    router.push('/access');
  };

  const requireAuth = (requiredLevel?: string) => {
    if (!isAuthenticated) {
      router.push('/access');
      return false;
    }
    
    if (requiredLevel && accessLevel !== requiredLevel) {
      router.push('/access');
      return false;
    }
    
    return true;
  };

  return {
    isAuthenticated,
    accessLevel,
    loading,
    logout,
    requireAuth
  };
}
