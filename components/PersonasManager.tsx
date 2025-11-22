'use client';

import { useState } from 'react';
import { Persona, PersonaType, NotificationChannel, AlertTier } from '@/types';

interface PersonasManagerProps {
  personas: Persona[];
  onUpdate: () => void;
}

const personaTypes: { value: PersonaType; label: string }[] = [
  { value: 'performance_marketer', label: 'Performance Marketer (Agency)' },
  { value: 'account_manager', label: 'Account Manager (Agency)' },
  { value: 'business_owner', label: 'Business Owner / Founder (Client)' },
  { value: 'cmo', label: 'CMO / Marketing Head (Enterprise)' },
];

const channels: { value: NotificationChannel; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'slack', label: 'Slack' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'dashboard', label: 'Dashboard' },
];

const alertTiers: { value: AlertTier; label: string }[] = [
  { value: 'critical', label: 'Critical' },
  { value: 'warning', label: 'Warning' },
  { value: 'informational', label: 'Informational' },
];

export default function PersonasManager({ personas, onUpdate }: PersonasManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'performance_marketer' as PersonaType,
    name: '',
    email: '',
    slackUserId: '',
    whatsappNumber: '',
    preferredChannels: ['email', 'dashboard'] as NotificationChannel[],
    alertTiers: ['critical', 'warning'] as AlertTier[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setShowForm(false);
      setFormData({
        type: 'performance_marketer',
        name: '',
        email: '',
        slackUserId: '',
        whatsappNumber: '',
        preferredChannels: ['email', 'dashboard'],
        alertTiers: ['critical', 'warning'],
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to create persona:', error);
    }
  };

  const toggleChannel = (channel: NotificationChannel) => {
    setFormData({
      ...formData,
      preferredChannels: formData.preferredChannels.includes(channel)
        ? formData.preferredChannels.filter(c => c !== channel)
        : [...formData.preferredChannels, channel],
    });
  };

  const toggleTier = (tier: AlertTier) => {
    setFormData({
      ...formData,
      alertTiers: formData.alertTiers.includes(tier)
        ? formData.alertTiers.filter(t => t !== tier)
        : [...formData.alertTiers, tier],
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Persona'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Persona Type</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as PersonaType })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {personaTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slack User ID</label>
              <input
                type="text"
                value={formData.slackUserId}
                onChange={(e) => setFormData({ ...formData, slackUserId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="U1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Channels</label>
            <div className="flex flex-wrap gap-2">
              {channels.map(channel => (
                <button
                  key={channel.value}
                  type="button"
                  onClick={() => toggleChannel(channel.value)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    formData.preferredChannels.includes(channel.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {channel.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Alert Tiers to Receive</label>
            <div className="flex flex-wrap gap-2">
              {alertTiers.map(tier => (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => toggleTier(tier.value)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    formData.alertTiers.includes(tier.value)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Persona
          </button>
        </form>
      )}

      <div className="space-y-4">
        {personas.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
            No personas configured. Add personas to route alerts appropriately.
          </div>
        ) : (
          personas.map(persona => (
            <div key={persona.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{persona.name}</h3>
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {personaTypes.find(t => t.value === persona.type)?.label || persona.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    {persona.email && (
                      <div>
                        <span className="font-medium">Email:</span> {persona.email}
                      </div>
                    )}
                    {persona.slackUserId && (
                      <div>
                        <span className="font-medium">Slack ID:</span> {persona.slackUserId}
                      </div>
                    )}
                    {persona.whatsappNumber && (
                      <div>
                        <span className="font-medium">WhatsApp:</span> {persona.whatsappNumber}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">Channels:</span>
                    {persona.preferredChannels.map(channel => (
                      <span key={channel} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {channel}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">Alert Tiers:</span>
                    {persona.alertTiers.map(tier => (
                      <span
                        key={tier}
                        className={`px-2 py-1 rounded text-xs ${
                          tier === 'critical' ? 'bg-red-100 text-red-800' :
                          tier === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {tier}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

