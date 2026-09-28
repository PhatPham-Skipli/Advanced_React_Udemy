'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Modern Custom Hook replacement for the legacy requireAuth HOC (Section 6).
 * Automatically redirects unauthenticated users to /signin.
 */
export function useRequireAuth(redirectUrl = '/signin') {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectUrl);
    }
  }, [isAuthenticated, redirectUrl, router]);

  return { isAuthenticated };
}
