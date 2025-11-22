'use client';

import { Campaign, Alert } from '@/types';
import { getHealthScoreColor } from '@/lib/utils';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: Campaign;
  alerts: Alert[];
  personaMetrics?: string[];
}

export default function CampaignCard({ campaign, alerts, personaMetrics }: CampaignCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    ended: 'bg-gray-100 text-gray-800',
  };

  const criticalAlerts = alerts.filter(a => a.tier === 'critical');
  const warningAlerts = alerts.filter(a => a.tier === 'warning');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{campaign.name}</h3>
          <span className={`text-xs px-2 py-1 rounded ${statusColors[campaign.status]}`}>
            {campaign.status}
          </span>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getHealthScoreColor(campaign.healthScore)}`}>
            {campaign.healthScore}
          </div>
          <div className="text-xs text-gray-500">Health Score</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">
          {personaMetrics ? 'Your Key Metrics' : 'Key Metrics'}
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {personaMetrics && personaMetrics.length > 0
            ? personaMetrics.slice(0, 6).map((metric) => {
                const value = campaign.metrics[metric];
                if (value === undefined) return null;
                return (
                  <div key={metric} className="flex justify-between">
                    <span className="text-gray-600">{metric}:</span>
                    <span className="font-semibold">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                  </div>
                );
              })
            : Object.entries(campaign.metrics).slice(0, 4).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-semibold">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                </div>
              ))}
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex gap-2 text-sm">
            {criticalAlerts.length > 0 && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
                {criticalAlerts.length} Critical
              </span>
            )}
            {warningAlerts.length > 0 && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                {warningAlerts.length} Warning
              </span>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t">
        <div className="text-xs text-gray-500">
          Platform: {campaign.platform.replace('_', ' ').toUpperCase()}
        </div>
      </div>
    </div>
  );
}

