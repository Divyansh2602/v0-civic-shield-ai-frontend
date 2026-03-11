'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, BarChart3, Zap, Network, Mail, Lock, FileText, Settings, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Scanner', href: '/scanner', icon: Zap },
  { name: 'Attack Surface', href: '/attack-surface', icon: Network },
  { name: 'API Security', href: '/api-security', icon: Lock },
  { name: 'Phishing', href: '/phishing', icon: Mail },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Logs', href: '/logs', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-dark border-b border-white/10">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#00f5a0] to-[#00d87d] flex items-center justify-center neon-glow">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-background" />
            </div>
            <span className="text-base md:text-xl font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d87d] bg-clip-text text-transparent hidden sm:inline">
              CivicShield
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {sidebarOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black/80 backdrop-blur">
            <div className="flex flex-col gap-1 p-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-primary bg-primary/10 border border-primary/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Content Padding */}
      <div className="pt-16" />
    </>
  );
}
