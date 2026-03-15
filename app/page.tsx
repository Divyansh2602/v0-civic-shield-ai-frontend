/*
CivicShield AI — Real-time cyber threat monitoring dashboard
Copyright (C) 2025  <your name>
...
*/

'use client';

import Link from 'next/link';
import { Shield, BarChart3, Zap, Network, Lock, Mail, ArrowRight, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';


export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Threat Detection',
      description: 'Real-time threat detection powered by advanced AI algorithms'
    },
    {
      icon: Zap,
      title: 'Vulnerability Scanning',
      description: 'Comprehensive vulnerability assessments across your infrastructure'
    },
    {
      icon: Network,
      title: 'Attack Surface Management',
      description: 'Monitor and manage your organization\'s external attack surface'
    },
    {
      icon: Mail,
      title: 'Phishing Protection',
      description: 'Advanced email security and phishing threat detection'
    },
    {
      icon: Lock,
      title: 'API Security',
      description: 'Secure and monitor API endpoints with behavioral analysis'
    },
    {
      icon: BarChart3,
      title: 'Security Analytics',
      description: 'Comprehensive reporting and security intelligence dashboards'
    },
  ];

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-dark border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5a0] to-[#00d87d] flex items-center justify-center neon-glow">
              <Shield className="w-5 h-5 text-background" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-[#00f5a0] to-[#00d87d] bg-clip-text text-transparent">
              CivicShield
            </span>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-[#00f5a0] to-[#00d87d] text-background hover:from-[#00e090] hover:to-[#00cc70] font-semibold">
              Launch Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00f5a0]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur">
            <div className="w-2 h-2 rounded-full bg-[#00f5a0] animate-pulse" />
            <span className="text-sm text-muted-foreground">Enterprise Cybersecurity Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Protect Your Infrastructure
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#00f5a0] to-[#00d87d] bg-clip-text text-transparent">
              with AI-Powered Security
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-time threat detection, vulnerability management, and comprehensive security intelligence for enterprise organizations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-[#00f5a0] to-[#00d87d] text-background hover:from-[#00e090] hover:to-[#00cc70] font-semibold w-full">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="#features">
            <Button variant="outline" size="lg" className="border-white/20 text-foreground hover:bg-white/5 w-full" onClick={() => {
              document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Learn More
            </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-12">
            {[
              { number: '847', label: 'Vulnerabilities Detected' },
              { number: '156', label: 'Threats Blocked Daily' },
              { number: '99.9%', label: 'System Uptime' },
              { number: '24/7', label: 'Monitoring Active' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-2xl md:text-3xl font-bold text-[#00f5a0]">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Comprehensive Security Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to protect your enterprise infrastructure</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="card-glass group hover:border-[#00f5a0]/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-[#00f5a0]/10 flex items-center justify-center group-hover:bg-[#00f5a0]/20 transition-colors mb-4">
                    <Icon className="w-6 h-6 text-[#00f5a0]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl border border-[#00f5a0]/30 p-8 md:p-12 text-center space-y-6 neon-glow">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Secure Your Enterprise?</h2>
            <p className="text-muted-foreground text-lg">Join leading organizations using CivicShield for advanced threat detection and vulnerability management</p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-[#00f5a0] to-[#00d87d] text-background hover:from-[#00e090] hover:to-[#00cc70] font-semibold">
                Launch Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 text-muted-foreground">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f5a0] to-[#00d87d] flex items-center justify-center">
                <Shield className="w-5 h-5 text-background" />
              </div>
              <span className="text-lg font-bold text-white">CivicShield</span>
            </div>
            <p className="text-sm max-w-xs">
              AI-powered cybersecurity platform providing real-time threat detection,
              vulnerability management, and advanced security intelligence.
            </p>
          </div>

          {/* Get in Touch */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-lg">Get in Touch</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00f5a0]" />
                Vellore Institute of Technology, Vellore, Tamil Nadu, India
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#00f5a0]" />
                divyanshg2602@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00f5a0]" />
                Dual_Scammers
              </p>
            </div>
          </div>
        </div>    
        {/* Bottom Copyright */}
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
          © 2026 CivicShield AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
