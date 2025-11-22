import { AlertRule, Metric, Alert, Campaign } from '@/types';

export function evaluateRule(rule: AlertRule, metric: Metric, previousMetric?: Metric): boolean {
  if (!rule.enabled) return false;

  const value = metric.value;
  const previousValue = previousMetric?.value;

  switch (rule.condition) {
    case 'above':
      return value > rule.threshold;
    
    case 'below':
      return value < rule.threshold;
    
    case 'change_above': {
      if (!previousValue) return false;
      const change = value - previousValue;
      return change > rule.threshold;
    }
    
    case 'change_below': {
      if (!previousValue) return false;
      const change = value - previousValue;
      return change < rule.threshold;
    }
    
    default:
      return false;
  }
}

export function generateAlertMessage(
  rule: AlertRule,
  metric: Metric,
  campaign: Campaign
): string {
  const { metricName, condition, threshold, tier } = rule;
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  
  let message = `[${tierLabel}] ${campaign.name}: `;
  
  switch (condition) {
    case 'above':
      message += `${metricName} is ${metric.value} (above threshold of ${threshold})`;
      break;
    case 'below':
      message += `${metricName} is ${metric.value} (below threshold of ${threshold})`;
      break;
    case 'change_above':
      message += `${metricName} increased by ${metric.changePercent?.toFixed(2)}% (above threshold of ${threshold}%)`;
      break;
    case 'change_below':
      message += `${metricName} decreased by ${Math.abs(metric.changePercent || 0).toFixed(2)}% (below threshold of ${threshold}%)`;
      break;
  }
  
  return message;
}

export function checkRules(
  rules: AlertRule[],
  metric: Metric,
  campaign: Campaign,
  previousMetric?: Metric
): Alert[] {
  const triggeredAlerts: Alert[] = [];
  
  for (const rule of rules) {
    // Check if rule applies to this campaign
    if (rule.campaignId && rule.campaignId !== campaign.id) {
      continue;
    }
    
    // Check if rule applies to this metric
    if (rule.metricName !== metric.name) {
      continue;
    }
    
    if (evaluateRule(rule, metric, previousMetric)) {
      const alert: Alert = {
        id: `alert-${Date.now()}-${Math.random()}`,
        ruleId: rule.id,
        ruleName: rule.name,
        campaignId: campaign.id,
        campaignName: campaign.name,
        metricName: metric.name,
        metricValue: metric.value,
        threshold: rule.threshold,
        tier: rule.tier,
        message: generateAlertMessage(rule, metric, campaign),
        timestamp: new Date().toISOString(),
        sentTo: [],
        acknowledged: false,
      };
      
      triggeredAlerts.push(alert);
    }
  }
  
  return triggeredAlerts;
}

