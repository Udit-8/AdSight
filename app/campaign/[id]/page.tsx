'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Campaign, Alert, PersonaType } from '@/types';
import { getHealthScoreColor } from '@/lib/utils';
import { personaConfigs } from '@/lib/personaConfig';

export default function CampaignDetails() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'alerts' | 'settings'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPersona = localStorage.getItem('selectedPersona') as PersonaType | null;
    if (savedPersona) {
      setSelectedPersona(savedPersona);
      fetchCampaignData();
    } else {
      router.push('/');
    }
  }, [campaignId, router]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCampaignData = async () => {
    try {
      // Get seed data directly
      const seedResponse = await fetch('/api/seed');
      const seedData = await seedResponse.json();
      
      const foundCampaign = seedData.campaigns?.find((c: Campaign) => c.id === campaignId);
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
      
      // Get alerts for this campaign
      const alertsResponse = await fetch(`/api/alerts?campaignId=${campaignId}`);
      const alertsData = await alertsResponse.json();
      setAlerts(Array.isArray(alertsData) ? alertsData : []);
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch campaign data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading campaign details...</div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Campaign not found</div>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const healthScoreContributors = [
    { name: 'Return on Ad Spend', value: 50.0, change: -4.3, target: 48.9 },
    { name: 'Conversion Rate', value: 45.8, change: -2.1, target: 43.1 },
    { name: 'Bounce Rate', value: 43.9, change: -0.5, target: 43.1 },
    { name: 'Click-Through Rate', value: 43.1, change: -0.4, target: 42.8 },
    { name: 'Attribution Quality', value: 42.8, change: -0.3, target: 42.5 },
    { name: 'Budget Pacing', value: 42.5, change: -0.3, target: 42.2 },
    { name: 'Attention Time', value: 42.3, change: -0.2, target: 42.0 },
    { name: 'Impressions', value: 42.0, change: -0.1, target: 41.9 },
    { name: 'Ads per Channel', value: 41.9, change: -0.1, target: 41.8 },
    { name: 'Cost Per Click', value: 41.8, change: +0.3, target: 42.1 },
    { name: 'Lifetime Value', value: 42.1, change: +0.5, target: 42.6 },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                ← Back to Portfolio
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{campaign.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {campaign.platform === 'google_ads' ? 'GOOGLE ADS' : 'META ADS'}
                  </span>
                  <span>{campaign.status === 'active' ? 'Sales' : campaign.status}</span>
                  <span>$5,000/day</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                Pause
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Optimize
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Health Score */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              📊 Health Score
            </h2>
            
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeDasharray={`${campaign.healthScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-orange-500">{campaign.healthScore}</span>
                </div>
              </div>
              
              <div className="text-red-400 text-sm flex items-center justify-center gap-1 mb-2">
                <span>↓</span>
                <span>-1.3</span>
              </div>
              
              <div className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-2">
                Warning
              </div>
              
              <div className="text-gray-400 text-sm">
                <div>Declining</div>
                <div>-1.3 from yesterday</div>
              </div>
            </div>
          </div>

          {/* Middle Column - Performance */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              💰 Performance
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">ROAS</span>
                <span className="text-white font-semibold">2.1x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">CVR</span>
                <span className="text-white font-semibold">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">CTR</span>
                <span className="text-white font-semibold">2.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">CPC</span>
                <span className="text-white font-semibold">$0.91</span>
              </div>
            </div>
          </div>

          {/* Right Column - Alerts */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              ⚠️ Alerts
            </h2>
            
            <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-yellow-400">⚠️</span>
                <div>
                  <div className="text-yellow-200 font-medium">ROAS dropped significantly below baseline.</div>
                  <div className="text-yellow-300 text-sm mt-1">
                    Current: 2.1x | Target: 3.0x
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex gap-1 mb-6">
            {(['overview', 'metrics', 'alerts', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium capitalize ${
                  activeTab === tab
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Health Score Contributors */}
          {activeTab === 'overview' && (
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                📈 Health Score Contributors
                <span className="text-gray-400 text-sm">ℹ️</span>
              </h3>
              
              <div className="space-y-4">
                {healthScoreContributors.map((contributor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{contributor.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-400 text-sm">
                          {contributor.change > 0 ? '↗' : '↓'} {Math.abs(contributor.change)}%
                        </span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          contributor.change > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                        }`}>
                          {contributor.change > 0 ? '+' : ''}{contributor.change}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2 relative"
                          style={{ width: `${contributor.value}%` }}
                        >
                          <div className="absolute right-0 top-0 h-2 w-1 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{contributor.target} → {contributor.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Net Change:</span>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full font-medium">
                    -42.6
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Recent Performance */}
          {activeTab === 'overview' && (
            <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Recent Performance</h3>
              
              <div className="grid grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">125K</div>
                  <div className="text-gray-400 text-sm">Impressions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">3.5K</div>
                  <div className="text-gray-400 text-sm">Clicks</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">112</div>
                  <div className="text-gray-400 text-sm">Conversions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">$3.2K</div>
                  <div className="text-gray-400 text-sm">Spend</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
