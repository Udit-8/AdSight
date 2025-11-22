import twilio from 'twilio';
import { Alert, Persona } from '@/types';

let twilioClient: twilio.Twilio | null = null;

function getClient() {
  if (twilioClient) return twilioClient;
  
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (!accountSid || !authToken) {
    throw new Error('Twilio credentials not configured');
  }
  
  twilioClient = twilio(accountSid, authToken);
  return twilioClient;
}

export async function sendWhatsAppAlert(alert: Alert, persona: Persona): Promise<boolean> {
  if (!persona.whatsappNumber) {
    console.warn(`No WhatsApp number for persona ${persona.name}`);
    return false;
  }

  try {
    const client = getClient();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    
    if (!fromNumber) {
      throw new Error('TWILIO_PHONE_NUMBER not configured');
    }

    const tierEmoji = {
      critical: '🔴',
      warning: '⚠️',
      informational: 'ℹ️',
    };

    const message = `${tierEmoji[alert.tier]} *${alert.tier.toUpperCase()} ALERT*

${alert.message}

*Campaign:* ${alert.campaignName}
*Metric:* ${alert.metricName}
*Value:* ${alert.metricValue}
*Threshold:* ${alert.threshold}

View in AdSight Dashboard`;

    await client.messages.create({
      from: `whatsapp:${fromNumber}`,
      to: `whatsapp:${persona.whatsappNumber}`,
      body: message,
    });

    return true;
  } catch (error) {
    console.error('Failed to send WhatsApp alert:', error);
    return false;
  }
}

