import { Campaign, Metric, AlertRule, Alert, Persona } from '@/types';
import { checkRules } from './rulesEngine';
import { sendAlert } from './notifications';
import { calculateHealthScore } from './healthScore';
import { readData, writeData } from '../data';

export async function processMetric(
  metric: Metric,
  campaigns: Campaign[],
  rules: AlertRule[],
  personas: Persona[]
): Promise<Alert[]> {
  const campaign = campaigns.find(c => c.id === metric.campaignId);
  if (!campaign) {
    console.warn(`Campaign ${metric.campaignId} not found`);
    return [];
  }

  // Update campaign metrics
  campaign.metrics[metric.name] = metric.value;
  campaign.updatedAt = new Date().toISOString();

  // Calculate health score
  campaign.healthScore = calculateHealthScore(campaign.metrics);

  // Get previous metric for change detection
  const previousMetric = metric.previousValue !== undefined ? {
    ...metric,
    value: metric.previousValue,
  } : undefined;

  // Check rules
  const triggeredAlerts = checkRules(rules, metric, campaign, previousMetric);

  // Send notifications to assigned personas
  for (const alert of triggeredAlerts) {
    const sentTo: Alert['sentTo'] = [];

    for (const personaId of campaign.assignedPersonas) {
      const persona = personas.find(p => p.id === personaId);
      if (!persona) continue;

      // Check if persona should receive this alert tier
      if (!persona.alertTiers.includes(alert.tier)) {
        continue;
      }

      // Determine which channels to use
      const channels = persona.preferredChannels.filter(ch => 
        ch !== 'dashboard' // Dashboard is always included
      );

      // Send notifications
      const results = await sendAlert(alert, persona, channels);

      sentTo.push({
        personaId: persona.id,
        personaName: persona.name,
        channels: results.filter(r => r.success).map(r => r.channel),
      });
    }

    alert.sentTo = sentTo;

    // Store alert
    const alerts = readData<Alert[]>('alerts.json', []);
    alerts.push(alert);
    writeData('alerts.json', alerts);
  }

  // Update campaign
  const allCampaigns = readData<Campaign[]>('campaigns.json', []);
  const index = allCampaigns.findIndex(c => c.id === campaign.id);
  if (index >= 0) {
    allCampaigns[index] = campaign;
    writeData('campaigns.json', allCampaigns);
  }

  return triggeredAlerts;
}

