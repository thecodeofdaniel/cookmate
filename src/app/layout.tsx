import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

import Navbar from './Navbar';
import GlassCard from '@/components/GlassCard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CookMate',
  description: 'Search for recipes either by ingredients, category, or area!',
};

//------------------------------------------------------------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">
          <section className="container flex h-full flex-col">
            <GlassCard className="my-4 flex flex-1 flex-col justify-between rounded-md">
              {children}
            </GlassCard>
          </section>
        </main>
      </body>
    </html>
  );
}
