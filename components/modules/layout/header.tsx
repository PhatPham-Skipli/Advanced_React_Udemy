'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logOut, selectAuth } from '@/redux/slices/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { isAuthenticated, user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(logOut());
    router.push('/');
  };

  return (
    <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg text-primary hover:opacity-90">
            Redux Auth
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/feature"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              Protected Feature
              <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold">
                VIP
              </span>
            </Link>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:inline-block">
                Hi, <strong className="text-foreground">{user?.email}</strong>
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/signin">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
