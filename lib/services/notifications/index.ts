import { Alert, Persona, NotificationChannel } from '@/types';
import { sendEmailAlert } from './email';
import { sendSlackAlert } from './slack';
import { sendWhatsAppAlert } from './whatsapp';

export async function sendAlert(
  alert: Alert,
  persona: Persona,
  channels: NotificationChannel[]
): Promise<{ channel: NotificationChannel; success: boolean }[]> {
  const results: { channel: NotificationChannel; success: boolean }[] = [];

  for (const channel of channels) {
    if (!persona.preferredChannels.includes(channel)) {
      continue;
    }

    let success = false;

    try {
      switch (channel) {
        case 'email':
          success = await sendEmailAlert(alert, persona);
          break;
        case 'slack':
          success = await sendSlackAlert(alert, persona);
          break;
        case 'whatsapp':
          success = await sendWhatsAppAlert(alert, persona);
          break;
        case 'dashboard':
          // Dashboard alerts are handled separately (stored in database)
          success = true;
          break;
      }
    } catch (error) {
      console.error(`Failed to send ${channel} alert:`, error);
      success = false;
    }

    results.push({ channel, success });
  }

  return results;
}

