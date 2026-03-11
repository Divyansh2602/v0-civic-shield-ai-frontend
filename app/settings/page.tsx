'use client';

import { AppLayout } from '@/components/app-layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Save, Bell, Lock, Users, Zap, Mail, Shield } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    organizationName: 'Acme Corporation',
    email: 'admin@acmecorp.com',
    timezone: 'UTC-5',
    notifications: true,
    emailAlerts: true,
    slackNotifications: false,
    mfaEnabled: true,
    sessionTimeout: '30',
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'integrations', label: 'Integrations', icon: Zap },
  ];

  return (
    <AppLayout>
      <main className="min-h-screen bg-background grid-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and security preferences</p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex gap-2 border-b border-white/10 overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'text-[#00f5a0] border-b-2 border-b-[#00f5a0]'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-glass p-6">
                <h2 className="text-lg font-semibold mb-6">Organization Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Organization Name</label>
                    <Input
                      value={settings.organizationName}
                      onChange={(e) => setSettings({ ...settings, organizationName: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Admin Email</label>
                    <Input
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Timezone</label>
                    <Input
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-glass p-6">
                <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div>
                      <p className="font-semibold">In-App Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications in the dashboard</p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div>
                      <p className="font-semibold">Email Alerts</p>
                      <p className="text-sm text-muted-foreground">Send critical alerts via email</p>
                    </div>
                    <Switch
                      checked={settings.emailAlerts}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div>
                      <p className="font-semibold">Slack Notifications</p>
                      <p className="text-sm text-muted-foreground">Integrate with Slack for notifications</p>
                    </div>
                    <Switch
                      checked={settings.slackNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, slackNotifications: checked })}
                    />
                  </div>
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-glass p-6">
                <h2 className="text-lg font-semibold mb-6">Security Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                    <div>
                      <p className="font-semibold">Multi-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Enhance account security with MFA</p>
                    </div>
                    <Switch
                      checked={settings.mfaEnabled}
                      onCheckedChange={(checked) => setSettings({ ...settings, mfaEnabled: checked })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Session Timeout (minutes)</label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-sm font-medium mb-3">API Keys</p>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Production API Key</span>
                        <Button size="sm" variant="outline">Rotate</Button>
                      </div>
                      <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Development API Key</span>
                        <Button size="sm" variant="outline">Rotate</Button>
                      </div>
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="card-glass p-6">
                <h2 className="text-lg font-semibold mb-6">Available Integrations</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Slack', status: 'Not Connected', icon: '💬' },
                    { name: 'Microsoft Teams', status: 'Not Connected', icon: '👥' },
                    { name: 'Splunk', status: 'Not Connected', icon: '📊' },
                    { name: 'ServiceNow', status: 'Not Connected', icon: '🎫' },
                    { name: 'Jira', status: 'Not Connected', icon: '🔗' },
                    { name: 'PagerDuty', status: 'Not Connected', icon: '🔔' },
                  ].map((integration, idx) => (
                    <motion.div
                      key={idx}
                      className="p-4 rounded-lg bg-white/5 flex items-center justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div>
                        <p className="font-semibold text-sm">{integration.name}</p>
                        <p className="text-xs text-muted-foreground">{integration.status}</p>
                      </div>
                      <Button size="sm" variant="outline">Connect</Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </AppLayout>
  );
}
