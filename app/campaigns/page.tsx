'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Campaign, Alert, PersonaType } from '@/types';
import { getHealthScoreColor } from '@/lib/utils';

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<PersonaType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPersona = localStorage.getItem('selectedPersona') as PersonaType | null;
    if (savedPersona) {
      setSelectedPersona(savedPersona);
      fetchData();
    } else {
      router.push('/');
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const seedResponse = await fetch('/api/seed');
      const seedData = await seedResponse.json();
      
      if (seedData.campaigns) {
        setCampaigns(seedData.campaigns);
        setAlerts(seedData.alerts || []);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSpend = campaigns.reduce((sum, campaign) => 
    sum + (campaign.metrics.daily_spend || 0), 0
  );

  const avgHealthScore = campaigns.length > 0 
    ? Math.round(campaigns.reduce((sum, c) => sum + c.healthScore, 0) / campaigns.length)
    : 0;

  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged);
  const criticalAlerts = alerts.filter(a => a.tier === 'critical' && !a.acknowledged);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading campaigns...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-2xl font-bold text-blue-400"
            >
              AdSight
            </button>
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-300">
                <span className="font-medium">Role:</span> {selectedPersona ? selectedPersona.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Loading...'}
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('selectedPersona');
                  router.push('/');
                }}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Change Role
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700"
                >
                  Overview
                </button>
                <button className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white">
                  Campaigns
                </button>
                <button
                  onClick={() => router.push('/dashboard?tab=alerts')}
                  className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700 relative"
                >
                  Alerts
                  {unacknowledgedAlerts.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unacknowledgedAlerts.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => router.push('/dashboard?tab=rules')}
                  className="px-4 py-2 rounded-lg font-medium text-gray-300 hover:bg-gray-700"
                >
                  Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Campaigns</h1>
              <p className="text-gray-400">Manage and monitor your advertising campaigns</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">All systems operational</span>
              </div>
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {criticalAlerts.length} Critical
              </div>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
                <span>+</span>
                Create Campaign
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Active Campaigns</span>
                <span className="text-blue-400">📊</span>
              </div>
              <div className="text-2xl font-bold text-white">{campaigns.length}</div>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Avg Health Score</span>
                <span className="text-green-400">📈</span>
              </div>
              <div className="text-2xl font-bold text-white">{avgHealthScore}</div>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Today&apos;s Spend</span>
                <span className="text-purple-400">💰</span>
              </div>
              <div className="text-2xl font-bold text-white">${totalSpend.toLocaleString()}</div>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">Critical Alerts</span>
                <span className="text-red-400">📊</span>
              </div>
              <div className="text-2xl font-bold text-white">{criticalAlerts.length}</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-600">
              Filter
            </button>
            <button className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-600">
              Sort
            </button>
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} alerts={alerts} />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No campaigns found</div>
            {searchTerm && (
              <div className="text-gray-500 text-sm mt-2">
                Try adjusting your search terms
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CampaignCard({ campaign, alerts }: { campaign: Campaign; alerts: Alert[] }) {
  const router = useRouter();
  
  const campaignAlerts = alerts.filter(a => a.campaignId === campaign.id && !a.acknowledged);
  const criticalAlerts = campaignAlerts.filter(a => a.tier === 'critical');
  const warningAlerts = campaignAlerts.filter(a => a.tier === 'warning');

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthRingColor = (score: number) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            campaign.platform === 'google_ads' ? 'bg-blue-500' : 'bg-blue-400'
          }`}></div>
          <div>
            <h3 className="text-white font-semibold">{campaign.name}</h3>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>{campaign.platform === 'google_ads' ? 'GOOGLE ADS' : 'META ADS'}</span>
              <span>•</span>
              <span className="capitalize">{campaign.status === 'active' ? 'Sales' : campaign.status}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-white">⚙️</button>
          <button className="text-gray-400 hover:text-white">⏸️</button>
        </div>
      </div>

      {/* Health Score */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={getHealthRingColor(campaign.healthScore)}
              strokeWidth="3"
              strokeDasharray={`${campaign.healthScore}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${getHealthColor(campaign.healthScore)}`}>
              {campaign.healthScore}
            </span>
          </div>
        </div>
      </div>

      {/* Trend and Status */}
      <div className="text-center mb-4">
        <div className="text-red-400 text-sm flex items-center justify-center gap-1 mb-2">
          <span>↓</span>
          <span>-{Math.random() * 30 + 1 | 0}.{Math.random() * 9 | 0}</span>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">0</span>
          <span className="text-xs text-gray-500">50</span>
          <span className="text-xs text-gray-500">100</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-1 mb-3">
          <div 
            className="bg-purple-500 h-1 rounded-full"
            style={{ width: `${campaign.healthScore}%` }}
          ></div>
        </div>

        {criticalAlerts.length > 0 ? (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            CRITICAL
          </span>
        ) : warningAlerts.length > 0 ? (
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Warning
          </span>
        ) : (
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Warning
          </span>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            ${(campaign.metrics.daily_spend || 0).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Today&apos;s Spend</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {campaign.metrics.ROAS || campaign.metrics.blended_ROAS || '2.1'}x
          </div>
          <div className="text-xs text-gray-400">ROAS</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-400 mb-4">
        <div>
          <div className="text-white font-semibold">
            {campaign.metrics.daily_spend ? (campaign.metrics.daily_spend * 30).toLocaleString() : '5,000'}
          </div>
          <div>Daily Budget</div>
        </div>
        <div>
          <div className="text-white font-semibold">USD</div>
          <div>Currency</div>
        </div>
        <div>
          <div className="text-white font-semibold">
            {Math.floor(Math.random() * 5) + 1}
          </div>
          <div>Locations</div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex justify-between items-center">
        {criticalAlerts.length > 0 ? (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            CRITICAL
          </span>
        ) : warningAlerts.length > 0 ? (
          <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            WARNING
          </span>
        ) : (
          <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            WARNING
          </span>
        )}
        
        <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          ACTIVE
        </span>
      </div>

      {/* Click to view details */}
      <button
        onClick={() => router.push(`/campaign/${campaign.id}`)}
        className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition-colors"
      >
        View Details
      </button>
    </div>
  );
}
