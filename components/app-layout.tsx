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
      <main className="relative lg:ml-56">
        {children}
      </main>
    </div>
  );
}
