'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, BarChart3, Zap, Network, Mail, Lock, FileText, Settings, LogOut, Menu, X, Bell } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Vulnerability Scanner', href: '/scanner', icon: Zap },
  { name: 'Attack Surface', href: '/attack-surface', icon: Network },
  { name: 'Phishing Detection', href: '/phishing', icon: Mail },
  { name: 'API Security', href: '/api-security', icon: Lock },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Activity Logs', href: '/logs', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check if we're on landing page
  const isLanding = pathname === '/';

  if (isLanding) {
    return null;
  }

  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className={`fixed left-0 top-0 h-screen w-56 bg-gradient-to-b from-[#0f1428] to-[#0a0e27] border-r border-white/10 z-50 hidden lg:flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5a0] to-[#00d87d] flex items-center justify-center neon-glow">
              <Shield className="w-5 h-5 text-background" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d87d] bg-clip-text text-transparent">
              CivicShield
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-primary bg-primary/15 border-l-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-muted-foreground text-center">CivicShield AI v2.0</div>
        </div>
      </aside>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-dark border-b border-white/10 lg:ml-56">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 h-16">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Logo for Mobile */}
          <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5a0] to-[#00d87d] flex items-center justify-center neon-glow">
              <Shield className="w-5 h-5 text-background" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d87d] bg-clip-text text-transparent">
              CivicShield AI
            </span>
          </Link>

          {/* Desktop Logo - Hidden on Mobile */}
          <div className="hidden lg:flex items-center">
            <span className="text-lg font-bold text-foreground">CivicShield AI</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 md:mx-8">
            <div className="relative hidden sm:block">
              <Input
                type="search"
                placeholder="Search logs..."
                className="w-full bg-white/5 border-white/20 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 lg:hidden z-40 bg-black/50 backdrop-blur">
          <aside className="fixed left-0 top-0 h-screen w-56 bg-gradient-to-b from-[#0f1428] to-[#0a0e27] border-r border-white/10 pt-16">
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-primary bg-primary/15 border-l-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Content Padding */}
      <div className="pt-16 lg:ml-56" />
    </>
  );
}

export { Navigation };
