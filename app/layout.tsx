import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/provider';
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import Header from '@/components/modules/layout/header';

export const metadata: Metadata = {
  title: 'Advanced React & Redux',
  description: 'Auth & Testing Demo',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ReduxProvider>
          <Header />
          <main className="flex-1 max-w-5xl w-full mx-auto p-4">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
