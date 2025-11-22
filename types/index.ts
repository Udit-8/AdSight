export type AlertTier = 'critical' | 'warning' | 'informational';

export type NotificationChannel = 'email' | 'slack' | 'whatsapp' | 'dashboard';

export type PersonaType = 
  | 'performance_marketer'
  | 'account_manager'
  | 'business_owner'
  | 'cmo';

export interface Metric {
  id: string;
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
  timestamp: string;
  campaignId: string;
}

export interface AlertRule {
  id: string;
  name: string;
  metricName: string;
  condition: 'above' | 'below' | 'change_above' | 'change_below';
  threshold: number;
  tier: AlertTier;
  enabled: boolean;
  campaignId?: string; // If undefined, applies to all campaigns
}

export interface Persona {
  id: string;
  type: PersonaType;
  name: string;
  email?: string;
  slackUserId?: string;
  whatsappNumber?: string;
  preferredChannels: NotificationChannel[];
  alertTiers: AlertTier[]; // Which alert tiers this persona should receive
  metrics: {
    upper: string[];
    mid: string[];
    bottom: string[];
  };
  triggers: {
    type: string;
    description: string;
    metricName: string;
    condition: 'above' | 'below' | 'change_above' | 'change_below';
    threshold: number;
    timeWindow?: string;
  }[];
}

export interface Alert {
  id: string;
  ruleId: string;
  ruleName: string;
  campaignId: string;
  campaignName: string;
  metricName: string;
  metricValue: number;
  threshold: number;
  tier: AlertTier;
  message: string;
  timestamp: string;
  sentTo: {
    personaId: string;
    personaName: string;
    channels: NotificationChannel[];
  }[];
  acknowledged: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  platform: string; // 'google_ads', 'facebook_ads', etc.
  status: 'active' | 'paused' | 'ended';
  assignedPersonas: string[]; // Persona IDs
  metrics: {
    [key: string]: number;
  };
  healthScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface HealthScoreConfig {
  metricWeights: {
    [metricName: string]: number; // Weight 0-1, should sum to 1
  };
  thresholds: {
    excellent: number; // >= 80
    good: number; // >= 60
    fair: number; // >= 40
    poor: number; // < 40
  };
}

