import { Persona, PersonaType } from '@/types';

export const personaConfigs: Record<PersonaType, Omit<Persona, 'id' | 'name' | 'email' | 'slackUserId' | 'whatsappNumber'>> = {
  performance_marketer: {
    type: 'performance_marketer',
    preferredChannels: ['email', 'slack', 'dashboard'],
    alertTiers: ['critical', 'warning', 'informational'],
    metrics: {
      upper: ['CPM', 'CTR'],
      mid: ['CPC', 'add_to_cart', 'lead_submission'],
      bottom: ['CVR', 'CPA', 'CAC', 'ROAS'],
    },
    triggers: [
      {
        type: 'Cost Efficiency',
        description: 'CAC ↑ 20–30% vs last 7-day baseline',
        metricName: 'CAC',
        condition: 'change_above',
        threshold: 20,
        timeWindow: '7 days',
      },
      {
        type: 'Conversion',
        description: 'CVR ↓ 15–25% within 4 hours',
        metricName: 'CVR',
        condition: 'change_below',
        threshold: -15,
        timeWindow: '4 hours',
      },
      {
        type: 'Budget Drain',
        description: '60% of daily budget spent by noon',
        metricName: 'daily_budget_spent',
        condition: 'above',
        threshold: 60,
      },
      {
        type: 'Creative Fatigue',
        description: 'CTR ↓ but impressions steady',
        metricName: 'CTR',
        condition: 'change_below',
        threshold: -10,
      },
      {
        type: 'Attribution',
        description: 'MMP conversions lagging dashboard data',
        metricName: 'conversion_discrepancy',
        condition: 'above',
        threshold: 10,
      },
    ],
  },
  account_manager: {
    type: 'account_manager',
    preferredChannels: ['email', 'slack', 'dashboard'],
    alertTiers: ['critical', 'warning'],
    metrics: {
      upper: ['daily_spend', 'pacing'],
      mid: ['sales', 'leads', 'creative_status'],
      bottom: ['CAC', 'weekly_trend'],
    },
    triggers: [
      {
        type: 'Overspend',
        description: 'Daily spend >120% of planned pacing',
        metricName: 'spend_vs_pacing',
        condition: 'above',
        threshold: 120,
      },
      {
        type: 'Underdelivery',
        description: 'Sales/leads drop before campaign review call',
        metricName: 'sales_leads',
        condition: 'change_below',
        threshold: -10,
      },
      {
        type: 'Policy',
        description: 'Creative rejection without timely notification',
        metricName: 'creative_rejection',
        condition: 'above',
        threshold: 0,
      },
      {
        type: 'Trend Risk',
        description: 'CAC worsening week over week',
        metricName: 'CAC',
        condition: 'change_above',
        threshold: 10,
        timeWindow: '7 days',
      },
    ],
  },
  business_owner: {
    type: 'business_owner',
    preferredChannels: ['email', 'whatsapp', 'dashboard'],
    alertTiers: ['critical', 'warning'],
    metrics: {
      upper: ['total_spend', 'revenue', 'profitability'],
      mid: ['CAC', 'selling_price', 'contribution_margin'],
      bottom: ['orders', 'leads_per_day'],
    },
    triggers: [
      {
        type: 'Finance',
        description: 'Total spend vs revenue impact',
        metricName: 'spend_to_revenue_ratio',
        condition: 'above',
        threshold: 0.3,
      },
      {
        type: 'Efficiency',
        description: 'CAC vs selling price & contribution margin',
        metricName: 'CAC_vs_price',
        condition: 'above',
        threshold: 0.5,
      },
      {
        type: 'Sales Impact',
        description: 'Orders/leads per day drop',
        metricName: 'orders_per_day',
        condition: 'change_below',
        threshold: -20,
      },
    ],
  },
  cmo: {
    type: 'cmo',
    preferredChannels: ['email', 'slack', 'dashboard'],
    alertTiers: ['critical'],
    metrics: {
      upper: ['total_spend', 'revenue_impact'],
      mid: ['CAC_trendline', 'blended_ROAS'],
      bottom: ['budget_runway', 'pipeline_risk', 'team_performance'],
    },
    triggers: [
      {
        type: 'Financial',
        description: 'Total spend vs revenue impact',
        metricName: 'spend_to_revenue',
        condition: 'above',
        threshold: 0.4,
      },
      {
        type: 'Efficiency',
        description: 'CAC trendline, blended ROAS',
        metricName: 'CAC_trendline',
        condition: 'change_above',
        threshold: 15,
      },
      {
        type: 'Governance',
        description: 'Which teams detected + fixed issues on time',
        metricName: 'issue_resolution_time',
        condition: 'above',
        threshold: 24, // hours
      },
      {
        type: 'Forecasting',
        description: 'Budget runway, pipeline risk',
        metricName: 'budget_runway_days',
        condition: 'below',
        threshold: 7,
      },
    ],
  },
};

export function getPersonaMetrics(personaType: PersonaType): string[] {
  const config = personaConfigs[personaType];
  return [...config.metrics.upper, ...config.metrics.mid, ...config.metrics.bottom];
}

export function getPersonaDisplayName(personaType: PersonaType): string {
  const names: Record<PersonaType, string> = {
    performance_marketer: 'Performance Marketer (Agency Side)',
    account_manager: 'Account Manager (Agency Side)',
    business_owner: 'New Business Owner / Growth-Stage Founder',
    cmo: 'CMO / Marketing Head of Mid–Large Enterprise',
  };
  return names[personaType];
}

export function getPersonaDescription(personaType: PersonaType): string {
  const descriptions: Record<PersonaType, string> = {
    performance_marketer: 'Focus on cost efficiency, conversion rates, and budget optimization. Monitor CPM, CTR, CPC, CVR, CAC, and ROAS.',
    account_manager: 'Track daily spend, pacing, sales/leads delivery, and creative compliance. Ensure campaigns meet client expectations.',
    business_owner: 'Monitor total spend, revenue, profitability, and sales impact. Focus on CAC efficiency and contribution margins.',
    cmo: 'Executive view of financial impact, efficiency trends, team governance, and budget forecasting.',
  };
  return descriptions[personaType];
}

