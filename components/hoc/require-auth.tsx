'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

/**
 * Higher Order Component (HOC) pattern from Section 3 & 6 of the course.
 * Wraps a component and renders it only if the user is authenticated.
 */
export function requireAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function AuthenticatedComponent(props: P) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/signin');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return (
        <div className="flex justify-center p-8 text-muted-foreground">
          Checking authentication...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
