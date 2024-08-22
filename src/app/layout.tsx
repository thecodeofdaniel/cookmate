import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/Navbar';
import GlassCard from '@/components/GlassCard';

import StoreProvider from './StoreProvider';
// import { CounterStoreProvider } from '@/providers/counter-store-provider';
// import { SearchTextStoreProvider } from '@/providers/searchText-store-provider';
import ZustandProvider from './zustand-provider';
import TanStackProvider from './tanstack-provider';

import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen flex-col`}>
        <Navbar />
        {/* Take rest of space taken from navbar */}
        <main className="flex-1">
          {/* Inside that flex-1 make it take the full height */}
          <section className="container flex h-full flex-col">
            <ZustandProvider>
              <TanStackProvider>
                <GlassCard className="my-4 flex flex-1 flex-col justify-between rounded-md">
                  {children}
                </GlassCard>
              </TanStackProvider>
            </ZustandProvider>
          </section>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
