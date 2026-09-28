'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  clearAuthError,
  selectAuthError,
  setAuthError,
  setCredentials,
} from '@/redux/slices/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const errorMessage = useAppSelector(selectAuthError);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setAuthError('Passwords do not match'));
      return;
    }

    setLoading(true);
    dispatch(clearAuthError());

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch(setAuthError(data.error || 'Failed to sign up'));
        setLoading(false);
        return;
      }

      // Save credentials into Redux (Section 6 pattern)
      dispatch(setCredentials({ token: data.token, user: data.user }));
      router.push('/feature');
    } catch {
      dispatch(setAuthError('An unexpected network error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 rounded-2xl border border-border bg-card shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign up to unlock the VIP protected feature
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-4 p-3 rounded-lg text-sm bg-destructive/10 text-destructive border border-destructive/20"
        >
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium mb-1.5"
          >
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-medium mb-1.5"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div>
          <label
            htmlFor="signup-confirm-password"
            className="block text-sm font-medium mb-1.5"
          >
            Confirm Password
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{' '}
        <Link href="/signin" className="text-primary hover:underline font-medium">
          Sign In
        </Link>
      </p>
    </div>
  );
}
