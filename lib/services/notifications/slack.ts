import { WebClient } from '@slack/web-api';
import { Alert, Persona } from '@/types';

let client: WebClient | null = null;

function getClient() {
  if (client) return client;
  
  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) {
    throw new Error('SLACK_BOT_TOKEN not configured');
  }
  
  client = new WebClient(token);
  return client;
}

export async function sendSlackAlert(alert: Alert, persona: Persona): Promise<boolean> {
  try {
    const slackClient = getClient();
    
    const tierColors = {
      critical: '#dc2626',
      warning: '#f59e0b',
      informational: '#3b82f6',
    };

    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${alert.tier.toUpperCase()} Alert: ${alert.campaignName}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: alert.message,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Metric:*\n${alert.metricName}`,
          },
          {
            type: 'mrkdwn',
            text: `*Current Value:*\n${alert.metricValue}`,
          },
          {
            type: 'mrkdwn',
            text: `*Threshold:*\n${alert.threshold}`,
          },
          {
            type: 'mrkdwn',
            text: `*Rule:*\n${alert.ruleName}`,
          },
        ],
      },
    ];

    // Try to send to user if we have their Slack user ID
    if (persona.slackUserId) {
      await slackClient.chat.postMessage({
        channel: persona.slackUserId,
        text: alert.message,
        blocks,
      });
    } else if (process.env.SLACK_WEBHOOK_URL) {
      // Fallback to webhook
      const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: alert.message,
          blocks,
          attachments: [
            {
              color: tierColors[alert.tier],
              fields: [
                { title: 'Metric', value: alert.metricName, short: true },
                { title: 'Value', value: String(alert.metricValue), short: true },
                { title: 'Threshold', value: String(alert.threshold), short: true },
                { title: 'Rule', value: alert.ruleName, short: true },
              ],
            },
          ],
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Slack webhook failed: ${response.statusText}`);
      }
    } else {
      throw new Error('No Slack configuration found');
    }

    return true;
  } catch (error) {
    console.error('Failed to send Slack alert:', error);
    return false;
  }
}

