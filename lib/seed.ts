import { writeData } from './data';
import { Persona, AlertRule, Campaign } from '@/types';
import { personaConfigs } from './personaConfig';

export function seedInitialData() {
  // Seed default personas with full configuration
  const defaultPersonas: Persona[] = [
    {
      id: 'persona-1',
      name: 'Sarah Chen',
      email: 'sarah@agency.com',
      slackUserId: 'U1234567890',
      ...personaConfigs.performance_marketer,
    },
    {
      id: 'persona-2',
      name: 'Mike Johnson',
      email: 'mike@agency.com',
      slackUserId: 'U0987654321',
      ...personaConfigs.account_manager,
    },
    {
      id: 'persona-3',
      name: 'Alex Rivera',
      email: 'alex@startup.com',
      whatsappNumber: '+1234567890',
      ...personaConfigs.business_owner,
    },
    {
      id: 'persona-4',
      name: 'Jennifer Martinez',
      email: 'jennifer@enterprise.com',
      slackUserId: 'U1122334455',
      ...personaConfigs.cmo,
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

  // Seed sample campaigns with persona-specific metrics
  const defaultCampaigns: Campaign[] = [
    {
      id: 'campaign-1',
      name: 'Summer Sale Campaign',
      platform: 'google_ads',
      status: 'active',
      assignedPersonas: ['persona-1', 'persona-2'],
      metrics: {
        // Performance Marketer metrics
        CPM: 12.5,
        CTR: 2.5,
        CPC: 0.85,
        add_to_cart: 450,
        lead_submission: 125,
        CVR: 3.2,
        CPA: 25.50,
        CAC: 28.75,
        ROAS: 4.5,
        // Account Manager metrics
        daily_spend: 850,
        pacing: 95,
        sales: 120,
        leads: 45,
        creative_status: 1,
        weekly_trend: 2.5,
        // Common metrics
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
        // Business Owner metrics
        total_spend: 15000,
        revenue: 67500,
        profitability: 52500,
        CAC: 30.25,
        selling_price: 150,
        contribution_margin: 0.65,
        orders: 450,
        leads_per_day: 25,
        // CMO metrics
        revenue_impact: 67500,
        CAC_trendline: 2.8,
        blended_ROAS: 4.2,
        budget_runway_days: 12,
        pipeline_risk: 0.15,
        team_performance: 85,
        // Common metrics
        CTR: 1.8,
        impressions: 75000,
        clicks: 1350,
      },
      healthScore: 68,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  try {
    console.log('Writing personas data...');
    writeData('personas.json', defaultPersonas);
    console.log('Writing rules data...');
    writeData('rules.json', defaultRules);
    console.log('Writing campaigns data...');
    writeData('campaigns.json', defaultCampaigns);
    console.log('Writing alerts data...');
    writeData('alerts.json', []);
    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Failed to seed initial data:', error);
    throw error;
  }
}

// Export function to get seed data directly (for Vercel compatibility)
export function getSeedData() {
  const defaultPersonas: Persona[] = [
    {
      id: 'persona-1',
      name: 'Sarah Chen',
      email: 'sarah@agency.com',
      slackUserId: 'U1234567890',
      ...personaConfigs.performance_marketer,
    },
    {
      id: 'persona-2',
      name: 'Mike Johnson',
      email: 'mike@agency.com',
      slackUserId: 'U0987654321',
      ...personaConfigs.account_manager,
    },
    {
      id: 'persona-3',
      name: 'Alex Rivera',
      email: 'alex@startup.com',
      whatsappNumber: '+1234567890',
      ...personaConfigs.business_owner,
    },
    {
      id: 'persona-4',
      name: 'Jennifer Martinez',
      email: 'jennifer@enterprise.com',
      slackUserId: 'U1122334455',
      ...personaConfigs.cmo,
    },
  ];

  const defaultRules: AlertRule[] = [
    {
      id: 'rule-1',
      name: 'Low CTR Alert',
      metricName: 'CTR',
      condition: 'below',
      threshold: 1.0,
      tier: 'warning',
      enabled: true,
    },
    {
      id: 'rule-2',
      name: 'Critical CTR Drop',
      metricName: 'CTR',
      condition: 'below',
      threshold: 0.5,
      tier: 'critical',
      enabled: true,
    },
    {
      id: 'rule-3',
      name: 'Low Conversion Rate',
      metricName: 'CVR',
      condition: 'below',
      threshold: 2.0,
      tier: 'warning',
      enabled: true,
    },
    {
      id: 'rule-4',
      name: 'ROAS Below Target',
      metricName: 'ROAS',
      condition: 'below',
      threshold: 3.0,
      tier: 'critical',
      enabled: true,
    },
    {
      id: 'rule-5',
      name: 'High CTR Increase',
      metricName: 'CTR',
      condition: 'change_above',
      threshold: 50,
      tier: 'informational',
      enabled: true,
    },
  ];

  const defaultCampaigns: Campaign[] = [
    {
      id: 'campaign-1',
      name: 'Summer Sale Campaign',
      platform: 'google_ads',
      status: 'active',
      assignedPersonas: ['persona-1', 'persona-2'],
      metrics: {
        CPM: 12.5,
        CTR: 2.5,
        CPC: 0.85,
        add_to_cart: 450,
        lead_submission: 125,
        CVR: 3.2,
        CPA: 25.50,
        CAC: 28.75,
        ROAS: 4.5,
        daily_spend: 850,
        pacing: 95,
        sales: 120,
        leads: 45,
        creative_status: 1,
        weekly_trend: 2.5,
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
        total_spend: 15000,
        revenue: 67500,
        profitability: 52500,
        CAC: 30.25,
        selling_price: 150,
        contribution_margin: 0.65,
        orders: 450,
        leads_per_day: 25,
        revenue_impact: 67500,
        CAC_trendline: 2.8,
        blended_ROAS: 4.2,
        budget_runway_days: 12,
        pipeline_risk: 0.15,
        team_performance: 85,
        CTR: 1.8,
        impressions: 75000,
        clicks: 1350,
      },
      healthScore: 68,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  return {
    personas: defaultPersonas,
    rules: defaultRules,
    campaigns: defaultCampaigns,
    alerts: []
  };
}

