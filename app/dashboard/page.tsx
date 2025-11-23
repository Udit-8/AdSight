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
      // Automatically seed data and fetch
      initializeData(savedPersona);
      // Refresh every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initializeData = async (personaType: PersonaType) => {
    setLoading(true);
    try {
      console.log('Initializing data for persona:', personaType);
      
      // Get seed data directly (bypassing file system issues on Vercel)
      const seedResponse = await fetch('/api/seed');
      const seedData = await seedResponse.json();
      console.log('Got seed data:', seedData);
      
      if (seedData.campaigns && seedData.campaigns.length > 0) {
        // Use the seed data directly
        setCampaigns(seedData.campaigns);
        setRules(seedData.rules || []);
        setAlerts(seedData.alerts || []);
        console.log('Set data directly from seed:', {
          campaigns: seedData.campaigns.length,
          rules: seedData.rules?.length || 0
        });
      } else {
        // Fallback to regular fetch
        await fetchData();
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize data:', error);
      // Fallback to fetch
      await fetchData();
    }
  };

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const [campaignsRes, alertsRes, rulesRes] = await Promise.all([
        fetch('/api/campaigns'),
        fetch('/api/alerts'),
        fetch('/api/rules'),
      ]);

      console.log('Response status:', campaignsRes.status, alertsRes.status, rulesRes.status);

      const campaignsData = await campaignsRes.json();
      const alertsData = await alertsRes.json();
      const rulesData = await rulesRes.json();

      console.log('Fetched data:', {
        campaigns: campaignsData.length || 0,
        alerts: alertsData.length || 0,
        rules: rulesData.length || 0
      });

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
    localStorage.setItem('selectedPersona', personaType);
    await initializeData(personaType);
  };

  const handlePersonaChange = () => {
    localStorage.removeItem('selectedPersona');
    setSelectedPersona(null);
    // Redirect to home page to show persona selector
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
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

  // If no persona selected, redirect to home page
  if (!selectedPersona) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-400">
              AdSight
            </Link>
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-300">
                <span className="font-medium">Role:</span> {getPersonaDisplayName(selectedPersona)}
              </div>
              <button
                onClick={handlePersonaChange}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Change Role
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => window.location.href = '/campaigns'}
                  className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700"
                >
                  Campaigns
                </button>
                <button
                  onClick={() => setActiveTab('alerts')}
                  className={`px-4 py-2 rounded-lg font-medium relative ${
                    activeTab === 'alerts' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
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
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'rules' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div>
            {/* Recent Alerts Section */}
            <RecentAlertsSection alerts={filteredAlerts.filter(a => !a.acknowledged)} />
            
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Campaigns"
                value={filteredCampaigns.length}
                icon="📊"
                trend="+2.5%"
              />
              <StatCard
                title="Avg Health Score"
                value={filteredCampaigns.length > 0 ? Math.round(filteredCampaigns.reduce((sum, c) => sum + c.healthScore, 0) / filteredCampaigns.length) : 0}
                icon="💚"
                trend="+5.2%"
              />
              <StatCard
                title="Today's Spend"
                value={`$${filteredCampaigns.reduce((sum, c) => sum + (c.metrics.daily_spend || 0), 0).toLocaleString()}`}
                icon="💰"
                trend="-1.3%"
                isNegative={true}
              />
              <StatCard
                title="Critical Alerts"
                value={criticalAlerts.length}
                icon="⚠️"
                trend={criticalAlerts.length > 0 ? `${criticalAlerts.length} active` : "All clear"}
                isAlert={criticalAlerts.length > 0}
              />
            </div>

            {/* Key Metrics Banner */}
            {personaConfig && (
              <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <div className="text-sm text-gray-300">
                  <span className="font-medium text-white">Your Key Metrics:</span>{' '}
                  <span className="text-blue-400">
                    {personaMetrics.slice(0, 8).join(', ')}
                    {personaMetrics.length > 8 && '...'}
                  </span>
                </div>
              </div>
            )}

            {/* Campaigns Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Campaigns</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    All systems operational
                  </div>
                </div>
              </div>

              {filteredCampaigns.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-400">Loading campaigns...</p>
                </div>
              ) : (
                <div className="p-6">
                  <div className="space-y-4">
                    {filteredCampaigns.map(campaign => (
                      <CampaignRow
                        key={campaign.id}
                        campaign={campaign}
                        alerts={filteredAlerts.filter(a => a.campaignId === campaign.id && !a.acknowledged)}
                        personaMetrics={personaMetrics}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
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

function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  isNegative = false, 
  isAlert = false 
}: { 
  title: string; 
  value: string | number; 
  icon: string;
  trend: string;
  isNegative?: boolean;
  isAlert?: boolean;
}) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-400 text-sm font-medium">{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {typeof value === 'number' && title !== 'Avg Health Score' && title !== 'Critical Alerts' 
          ? value.toLocaleString() 
          : value}
      </div>
      <div className={`text-sm flex items-center gap-1 ${
        isAlert ? 'text-red-400' : isNegative ? 'text-red-400' : 'text-green-400'
      }`}>
        {!isAlert && (
          <span>{isNegative ? '↓' : '↑'}</span>
        )}
        {trend}
      </div>
    </div>
  );
}

function CampaignRow({ 
  campaign, 
  alerts, 
  personaMetrics 
}: { 
  campaign: Campaign; 
  alerts: Alert[];
  personaMetrics: string[];
}) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const criticalAlerts = alerts.filter(a => a.tier === 'critical');
  const warningAlerts = alerts.filter(a => a.tier === 'warning');

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      <div className="grid grid-cols-7 gap-6 items-center">
        {/* Campaign Info */}
        <div className="col-span-2">
          <div className="font-semibold text-white mb-1">{campaign.name}</div>
          <div className="text-sm text-gray-400 capitalize">
            {campaign.platform.replace('_', ' ')}
          </div>
        </div>

        {/* Channel */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300 text-sm">
              {campaign.platform === 'google_ads' ? 'Google Ads' : 'Meta Ads'}
            </span>
          </div>
        </div>

        {/* Health Score */}
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={campaign.healthScore >= 80 ? '#10b981' : campaign.healthScore >= 60 ? '#3b82f6' : campaign.healthScore >= 40 ? '#f59e0b' : '#ef4444'}
                strokeWidth="2"
                strokeDasharray={`${campaign.healthScore}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-lg font-bold ${getHealthColor(campaign.healthScore)}`}>
                {campaign.healthScore}
              </span>
            </div>
          </div>
        </div>

        {/* Trend */}
        <div className="text-center">
          <div className="text-red-400 text-sm flex items-center justify-center gap-1">
            <span>↓</span>
            <span>-1.3</span>
          </div>
        </div>

        {/* Alerts */}
        <div className="text-center">
          {criticalAlerts.length > 0 ? (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              CRITICAL
            </span>
          ) : warningAlerts.length > 0 ? (
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              WARNING
            </span>
          ) : (
            <span className="text-gray-500 text-sm">—</span>
          )}
        </div>

        {/* Actions */}
        <div className="text-right">
          <button 
            onClick={() => window.location.href = `/campaign/${campaign.id}`}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-4 gap-4 text-sm">
          {personaMetrics.slice(0, 4).map((metric) => {
            const value = campaign.metrics[metric];
            if (value === undefined) return null;
            return (
              <div key={metric} className="text-center">
                <div className="text-gray-400 mb-1">{metric.toUpperCase()}</div>
                <div className="text-white font-semibold">
                  {typeof value === 'number' ? value.toFixed(2) : value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function RecentAlertsSection({ alerts }: { alerts: Alert[] }) {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (alerts.length === 0) return null;

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAlert(null);
  };

  return (
    <>
      <div className="mb-8">
        {/* Recent Alerts */}
        <div>
          <h2 className="text-xl font-bold text-orange-400 mb-4">Recent Alerts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {alerts.slice(0, 6).map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => handleAlertClick(alert)}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-6 cursor-pointer hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">⚠</span>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          alert.tier === 'critical' ? 'bg-purple-600 text-white' : 
                          alert.tier === 'warning' ? 'bg-yellow-600 text-white' : 
                          'bg-blue-600 text-white'
                        }`}>
                          {alert.tier}
                        </span>
                        <div className="text-gray-400 text-sm mt-1">
                          {new Date(alert.timestamp).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
                        <span className="text-gray-300">👁</span>
                      </button>
                      <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
                        <span className="text-green-400">✓</span>
                      </button>
                      <button className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600">
                        <span className="text-gray-300">✕</span>
                      </button>
                    </div>
                  </div>

                  <h3 className="text-white font-semibold mb-2">{alert.ruleName}</h3>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Health Score</span>
                      <div className="flex items-center gap-2">
                        <span className="text-red-400 text-lg font-bold">42.6</span>
                        <span className="text-red-400 text-sm">↓</span>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">
                      Previous: <span className="text-gray-300">43.9</span>
                      <span className="text-red-400 ml-2">-1.3</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4">
                    {alert.message}
                  </p>

                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-2">Top Contributors</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">ROAS</span>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">-4.3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">CVR</span>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">-2.1</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-sm">Budget Pacing</span>
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">-2.0</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-2">Suggested Actions</div>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Pause underperforming ad sets</li>
                      <li>• Increase bids on high-converting keywords</li>
                      <li className="text-gray-500">+1 more actions</li>
                    </ul>
                  </div>

                  {/* Notification Channels */}
                  <div className="border-t border-gray-700 pt-3">
                    <div className="text-gray-400 text-xs mb-2">Notifications Sent</div>
                    <div className="flex flex-wrap gap-2">
                      {alert.sentTo.map((notification, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="text-gray-300 text-xs font-medium">{notification.personaName}:</div>
                          <div className="flex gap-1">
                            {notification.channels.map((channel, channelIndex) => (
                              <span
                                key={channelIndex}
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  channel === 'email' ? 'bg-blue-600 text-white' :
                                  channel === 'slack' ? 'bg-green-600 text-white' :
                                  channel === 'whatsapp' ? 'bg-green-500 text-white' :
                                  'bg-gray-600 text-white'
                                }`}
                                title={`Sent via ${channel}`}
                              >
                                {channel === 'email' ? '📧' :
                                 channel === 'slack' ? '💬' :
                                 channel === 'whatsapp' ? '📱' :
                                 '🔔'}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {showModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white">⚠</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedAlert.ruleName}</h2>
                    <div className="text-gray-400 text-sm">
                      {selectedAlert.campaignName} • {new Date(selectedAlert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
                >
                  <span className="text-gray-300">✕</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Alert Summary */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Alert Summary</h3>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-gray-400 text-sm">Metric</div>
                      <div className="text-white font-semibold">{selectedAlert.metricName}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Current Value</div>
                      <div className="text-red-400 font-semibold">{selectedAlert.metricValue}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Threshold</div>
                      <div className="text-white font-semibold">{selectedAlert.threshold}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Severity</div>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                        selectedAlert.tier === 'critical' ? 'bg-red-600 text-white' : 
                        selectedAlert.tier === 'warning' ? 'bg-yellow-600 text-white' : 
                        'bg-blue-600 text-white'
                      }`}>
                        {selectedAlert.tier}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Analysis */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Impact Analysis</h3>
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                  <p className="text-gray-300 mb-4">{selectedAlert.message}</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">-18%</div>
                      <div className="text-gray-400 text-sm">Projected Revenue Impact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">24h</div>
                      <div className="text-gray-400 text-sm">Time to Critical</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">3</div>
                      <div className="text-gray-400 text-sm">Affected Campaigns</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Recommended Actions</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Pause underperforming ad sets</div>
                        <div className="text-gray-400 text-sm">Estimated impact: +12% efficiency</div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                        Apply
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Increase bids on high-converting keywords</div>
                        <div className="text-gray-400 text-sm">Estimated impact: +8% conversions</div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                        Apply
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Adjust budget allocation</div>
                        <div className="text-gray-400 text-sm">Estimated impact: +5% ROAS</div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification History */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Notification History</h3>
                <div className="space-y-2">
                  {selectedAlert.sentTo.map((notification, index) => (
                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-900 rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-gray-300 text-sm">👤</span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{notification.personaName}</div>
                          <div className="text-gray-400 text-xs">
                            {notification.channels.join(', ')}
                          </div>
                        </div>
                      </div>
                      <div className="text-green-400 text-sm">Delivered</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex gap-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-medium">
                Mark as Resolved
              </button>
              <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded font-medium">
                Snooze for 1 hour
              </button>
              <button 
                onClick={closeModal}
                className="px-6 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

