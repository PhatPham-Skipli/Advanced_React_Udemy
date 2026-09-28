'use client';

import { Button } from '@/components/ui/button';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useAppSelector } from '@/redux/hooks';
import { selectAuth } from '@/redux/slices/authSlice';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FeatureData {
  message: string;
  user: string;
  timestamp: string;
}

export default function FeaturePage() {
  // Protect this route with our custom hook (modern equivalent of requireAuth HOC)
  const { isAuthenticated } = useRequireAuth('/signin');
  const { token } = useAppSelector(selectAuth);

  const [featureData, setFeatureData] = useState<FeatureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function fetchSecretData() {
      try {
        setLoading(true);
        // Call protected API with Bearer token (Section 5 & 6 pattern)
        const response = await fetch('/api/feature', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch secret feature data');
        }

        const data: FeatureData = await response.json();
        setFeatureData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchSecretData();
  }, [token]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <p className="text-muted-foreground">Redirecting to Sign In...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <span className="p-2.5 rounded-xl bg-primary/10 text-primary text-xl font-bold">
          🔒
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            VIP Protected Feature
          </h1>
          <p className="text-sm text-muted-foreground">
            This page is only accessible when authenticated via JWT Bearer Token.
          </p>
        </div>
      </div>

      <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 mb-6">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
          Server Response
        </h2>
        {loading ? (
          <p className="text-sm text-muted-foreground animate-pulse">
            Fetching secure data from /api/feature...
          </p>
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <div className="space-y-2">
            <p className="font-medium text-foreground text-lg">
              {featureData?.message}
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Authenticated Email:</strong> {featureData?.user}
              </p>
              <p>
                <strong>Fetched At:</strong> {featureData?.timestamp}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl border border-border bg-muted/40 mb-6 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">
          🎓 Section 5 & 6 Concept Recap:
        </p>
        <p>
          • <strong>Client:</strong> Redux store retains JWT token in state and
          attaches it as <code>Authorization: Bearer [token]</code>.
        </p>
        <p>
          • <strong>Server:</strong> Protected Route Handler verifies token
          signature before returning data.
        </p>
        <p>
          • <strong>Guard:</strong> <code>useRequireAuth()</code> redirects
          unauthenticated visitors.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
