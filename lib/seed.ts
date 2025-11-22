import { writeData } from './data';
import { Persona, AlertRule, Campaign } from '@/types';

export function seedInitialData() {
  // Seed default personas
  const defaultPersonas: Persona[] = [
    {
      id: 'persona-1',
      type: 'performance_marketer',
      name: 'Sarah Chen',
      email: 'sarah@agency.com',
      slackUserId: 'U1234567890',
      preferredChannels: ['email', 'slack', 'dashboard'],
      alertTiers: ['critical', 'warning', 'informational'],
    },
    {
      id: 'persona-2',
      type: 'account_manager',
      name: 'Mike Johnson',
      email: 'mike@agency.com',
      slackUserId: 'U0987654321',
      preferredChannels: ['email', 'slack', 'dashboard'],
      alertTiers: ['critical', 'warning'],
    },
    {
      id: 'persona-3',
      type: 'business_owner',
      name: 'Alex Rivera',
      email: 'alex@startup.com',
      whatsappNumber: '+1234567890',
      preferredChannels: ['email', 'whatsapp', 'dashboard'],
      alertTiers: ['critical', 'warning'],
    },
    {
      id: 'persona-4',
      type: 'cmo',
      name: 'Jennifer Martinez',
      email: 'jennifer@enterprise.com',
      slackUserId: 'U1122334455',
      preferredChannels: ['email', 'slack', 'dashboard'],
      alertTiers: ['critical'],
    },
  ];

  // Seed default rules
  const defaultRules: AlertRule[] = [
    {
      id: 'rule-1',
      name: 'Low CTR Alert',
      metricName: 'ctr',
      condition: 'below',
      threshold: 1.0,
      tier: 'warning',
      enabled: true,
    },
    {
      id: 'rule-2',
      name: 'Critical CTR Drop',
      metricName: 'ctr',
      condition: 'below',
      threshold: 0.5,
      tier: 'critical',
      enabled: true,
    },
    {
      id: 'rule-3',
      name: 'Low Conversion Rate',
      metricName: 'conversion_rate',
      condition: 'below',
      threshold: 2.0,
      tier: 'warning',
      enabled: true,
    },
    {
      id: 'rule-4',
      name: 'ROAS Below Target',
      metricName: 'roas',
      condition: 'below',
      threshold: 3.0,
      tier: 'critical',
      enabled: true,
    },
    {
      id: 'rule-5',
      name: 'High CTR Increase',
      metricName: 'ctr',
      condition: 'change_above',
      threshold: 50,
      tier: 'informational',
      enabled: true,
    },
  ];

  // Seed sample campaigns
  const defaultCampaigns: Campaign[] = [
    {
      id: 'campaign-1',
      name: 'Summer Sale Campaign',
      platform: 'google_ads',
      status: 'active',
      assignedPersonas: ['persona-1', 'persona-2'],
      metrics: {
        ctr: 2.5,
        conversion_rate: 3.2,
        roas: 4.5,
        impressions: 50000,
        clicks: 1250,
      },
      healthScore: 75,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'campaign-2',
      name: 'Product Launch Q4',
      platform: 'facebook_ads',
      status: 'active',
      assignedPersonas: ['persona-3', 'persona-4'],
      metrics: {
        ctr: 1.8,
        conversion_rate: 2.5,
        roas: 3.8,
        impressions: 75000,
        clicks: 1350,
      },
      healthScore: 68,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  try {
    writeData('personas.json', defaultPersonas);
    writeData('rules.json', defaultRules);
    writeData('campaigns.json', defaultCampaigns);
    writeData('alerts.json', []);
    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Failed to seed initial data:', error);
  }
}

