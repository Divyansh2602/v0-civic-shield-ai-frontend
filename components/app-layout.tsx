'use client';

import { Navigation } from './navigation';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navigation />
      <main className="relative">
        {children}
      </main>
    </div>
  );
}
