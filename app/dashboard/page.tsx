'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Campaign, Alert, AlertRule, PersonaType } from '@/types';
import CampaignCard from '@/components/CampaignCard';
import AlertList from '@/components/AlertList';
import RulesManager from '@/components/RulesManager';
import PersonaSelector from '@/components/PersonaSelector';
import { getPersonaDisplayName, getPersonaMetrics, personaConfigs } from '@/lib/personaConfig';
import { getTierColor, getHealthScoreColor } from '@/lib/utils';

export default function Dashboard() {
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'alerts' | 'rules'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for selected persona in localStorage
    const savedPersona = localStorage.getItem('selectedPersona') as PersonaType | null;
    if (savedPersona && Object.keys(personaConfigs).includes(savedPersona)) {
      setSelectedPersona(savedPersona);
      fetchData();
      // Refresh every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchData = async () => {
    try {
      const [campaignsRes, alertsRes, rulesRes] = await Promise.all([
        fetch('/api/campaigns'),
        fetch('/api/alerts'),
        fetch('/api/rules'),
      ]);

      const campaignsData = await campaignsRes.json();
      const alertsData = await alertsRes.json();
      const rulesData = await rulesRes.json();

      setCampaigns(Array.isArray(campaignsData) ? campaignsData : []);
      setAlerts(Array.isArray(alertsData) ? alertsData : []);
      setRules(Array.isArray(rulesData) ? rulesData : []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setCampaigns([]);
      setAlerts([]);
      setRules([]);
      setLoading(false);
    }
  };

  const handlePersonaSelect = async (personaType: PersonaType) => {
    setSelectedPersona(personaType);
    
    // Automatically seed data if no campaigns exist
    try {
      const response = await fetch('/api/campaigns');
      const campaigns = await response.json();
      
      if (!Array.isArray(campaigns) || campaigns.length === 0) {
        await fetch('/api/seed', { method: 'POST' });
      }
    } catch (error) {
      console.error('Failed to check/seed data:', error);
    }
    
    fetchData();
  };

  const handlePersonaChange = () => {
    localStorage.removeItem('selectedPersona');
    setSelectedPersona(null);
  };

  // Filter metrics and alerts based on selected persona
  const personaMetrics = selectedPersona ? (getPersonaMetrics(selectedPersona) || []) : [];
  const personaConfig = selectedPersona ? personaConfigs[selectedPersona] : null;
  
  // Filter campaigns to show only relevant metrics
  const filteredCampaigns = Array.isArray(campaigns) ? campaigns.map(campaign => {
    if (!selectedPersona) return campaign;
    
    const filteredMetrics: { [key: string]: number } = {};
    personaMetrics.forEach(metric => {
      if (campaign.metrics[metric] !== undefined) {
        filteredMetrics[metric] = campaign.metrics[metric];
      }
    });
    
    return {
      ...campaign,
      metrics: filteredMetrics,
    };
  }) : [];

  // Filter alerts based on persona's alert tiers
  const filteredAlerts = Array.isArray(alerts) 
    ? (selectedPersona && personaConfig
        ? alerts.filter(a => personaConfig.alertTiers.includes(a.tier))
        : alerts)
    : [];

  const unacknowledgedAlerts = filteredAlerts.filter(a => !a.acknowledged);
  const criticalAlerts = unacknowledgedAlerts.filter(a => a.tier === 'critical');
  const warningAlerts = unacknowledgedAlerts.filter(a => a.tier === 'warning');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Show persona selector if no persona selected
  if (!selectedPersona) {
    return <PersonaSelector onSelect={handlePersonaSelect} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              AdSight
            </Link>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Role:</span> {getPersonaDisplayName(selectedPersona)}
              </div>
              <button
                onClick={handlePersonaChange}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Change Role
              </button>
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
              </div>
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

            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaigns</h2>
              {personaConfig && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">Your Key Metrics:</span>{' '}
                    <span className="text-blue-700">
                      {personaMetrics.slice(0, 8).join(', ')}
                      {personaMetrics.length > 8 && '...'}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map(campaign => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  alerts={filteredAlerts.filter(a => a.campaignId === campaign.id && !a.acknowledged)}
                  personaMetrics={personaMetrics}
                />
              ))}
            </div>

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600">Loading campaigns...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'alerts' && (
          <AlertList alerts={filteredAlerts} onAcknowledge={fetchData} />
        )}

        {activeTab === 'rules' && (
          <RulesManager rules={rules} campaigns={campaigns} onUpdate={fetchData} />
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

