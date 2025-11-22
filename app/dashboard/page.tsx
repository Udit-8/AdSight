'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Campaign, Alert, AlertRule, Persona } from '@/types';
import CampaignCard from '@/components/CampaignCard';
import AlertList from '@/components/AlertList';
import RulesManager from '@/components/RulesManager';
import PersonasManager from '@/components/PersonasManager';
import { getTierColor, getHealthScoreColor } from '@/lib/utils';

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts' | 'rules' | 'personas'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [campaignsRes, alertsRes, rulesRes, personasRes] = await Promise.all([
        fetch('/api/campaigns'),
        fetch('/api/alerts'),
        fetch('/api/rules'),
        fetch('/api/personas'),
      ]);

      setCampaigns(await campaignsRes.json());
      setAlerts(await alertsRes.json());
      setRules(await rulesRes.json());
      setPersonas(await personasRes.json());
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    if (confirm('This will create sample data. Continue?')) {
      try {
        await fetch('/api/seed', { method: 'POST' });
        fetchData();
      } catch (error) {
        console.error('Failed to seed data:', error);
      }
    }
  };

  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged);
  const criticalAlerts = unacknowledgedAlerts.filter(a => a.tier === 'critical');
  const warningAlerts = unacknowledgedAlerts.filter(a => a.tier === 'warning');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AdSight
            </Link>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('alerts')}
                className={`px-4 py-2 rounded-lg relative ${
                  activeTab === 'alerts' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Alerts
                {unacknowledgedAlerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unacknowledgedAlerts.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'rules' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Rules
              </button>
              <button
                onClick={() => setActiveTab('personas')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'personas' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Personas
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Campaigns"
                value={campaigns.length}
                color="blue"
              />
              <StatCard
                title="Critical Alerts"
                value={criticalAlerts.length}
                color="red"
              />
              <StatCard
                title="Warning Alerts"
                value={warningAlerts.length}
                color="yellow"
              />
              <StatCard
                title="Active Rules"
                value={rules.filter(r => r.enabled).length}
                color="green"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map(campaign => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  alerts={alerts.filter(a => a.campaignId === campaign.id && !a.acknowledged)}
                />
              ))}
            </div>

            {campaigns.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600 mb-4">No campaigns yet. Get started with sample data or create your own!</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleSeedData}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Load Sample Data
                  </button>
                  <button
                    onClick={() => {
                      const name = prompt('Campaign name:');
                      if (name) {
                        fetch('/api/campaigns', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ name, platform: 'google_ads' }),
                        }).then(() => fetchData());
                      }
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Create Campaign
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <AlertList alerts={alerts} onAcknowledge={fetchData} />
        )}

        {activeTab === 'rules' && (
          <RulesManager rules={rules} campaigns={campaigns} onUpdate={fetchData} />
        )}

        {activeTab === 'personas' && (
          <PersonasManager personas={personas} onUpdate={fetchData} />
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="text-gray-600 text-sm mb-1">{title}</div>
      <div className={`text-3xl font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {value}
      </div>
    </div>
  );
}

