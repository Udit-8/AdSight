'use client';

import { useState } from 'react';
import { AlertRule, Campaign, AlertTier } from '@/types';

interface RulesManagerProps {
  rules: AlertRule[];
  campaigns: Campaign[];
  onUpdate: () => void;
}

export default function RulesManager({ rules, campaigns, onUpdate }: RulesManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    metricName: '',
    condition: 'above' as 'above' | 'below' | 'change_above' | 'change_below',
    threshold: 0,
    tier: 'warning' as AlertTier,
    enabled: true,
    campaignId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          campaignId: formData.campaignId || undefined,
        }),
      });
      setShowForm(false);
      setFormData({
        name: '',
        metricName: '',
        condition: 'above',
        threshold: 0,
        tier: 'warning',
        enabled: true,
        campaignId: '',
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to create rule:', error);
    }
  };

  const handleToggle = async (ruleId: string, enabled: boolean) => {
    try {
      await fetch(`/api/rules/${ruleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !enabled }),
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to toggle rule:', error);
    }
  };

  const commonMetrics = ['ctr', 'conversion_rate', 'roas', 'impressions', 'clicks', 'spend', 'revenue'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Alert Rules</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Create Rule'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="e.g., Low CTR Alert"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Metric</label>
              <select
                required
                value={formData.metricName}
                onChange={(e) => setFormData({ ...formData, metricName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Select metric</option>
                {commonMetrics.map(metric => (
                  <option key={metric} value={metric}>{metric}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select
                required
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value as any })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="above">Above threshold</option>
                <option value="below">Below threshold</option>
                <option value="change_above">Change above %</option>
                <option value="change_below">Change below %</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Threshold</label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.threshold}
                onChange={(e) => setFormData({ ...formData, threshold: parseFloat(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alert Tier</label>
              <select
                required
                value={formData.tier}
                onChange={(e) => setFormData({ ...formData, tier: e.target.value as AlertTier })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="informational">Informational</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign (Optional)</label>
              <select
                value={formData.campaignId}
                onChange={(e) => setFormData({ ...formData, campaignId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">All Campaigns</option>
                {campaigns.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="enabled"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="enabled" className="text-sm text-gray-700">Enabled</label>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Rule
          </button>
        </form>
      )}

      <div className="space-y-4">
        {rules.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            No rules configured. Create your first rule to start monitoring.
          </div>
        ) : (
          rules.map(rule => (
            <div
              key={rule.id}
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
                rule.enabled ? 'border-green-500' : 'border-gray-300 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      rule.tier === 'critical' ? 'bg-red-100 text-red-800' :
                      rule.tier === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {rule.tier}
                    </span>
                    {!rule.enabled && (
                      <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                        Disabled
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Metric:</span> {rule.metricName}
                    </div>
                    <div>
                      <span className="font-medium">Condition:</span> {rule.condition.replace('_', ' ')}
                    </div>
                    <div>
                      <span className="font-medium">Threshold:</span> {rule.threshold}
                    </div>
                    <div>
                      <span className="font-medium">Campaign:</span> {rule.campaignId ? campaigns.find(c => c.id === rule.campaignId)?.name || 'Unknown' : 'All'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleToggle(rule.id, rule.enabled)}
                  className={`ml-4 px-4 py-2 rounded-lg transition-colors ${
                    rule.enabled
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {rule.enabled ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

