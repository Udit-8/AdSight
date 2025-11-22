import nodemailer from 'nodemailer';
import { Alert, Persona } from '@/types';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export async function sendEmailAlert(alert: Alert, persona: Persona): Promise<boolean> {
  if (!persona.email) {
    console.warn(`No email address for persona ${persona.name}`);
    return false;
  }

  try {
    const transporter = getTransporter();
    
    const tierEmoji = {
      critical: '🔴',
      warning: '⚠️',
      informational: 'ℹ️',
    };

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: ${alert.tier === 'critical' ? '#dc2626' : alert.tier === 'warning' ? '#f59e0b' : '#3b82f6'}; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .metric { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid ${alert.tier === 'critical' ? '#dc2626' : alert.tier === 'warning' ? '#f59e0b' : '#3b82f6'}; }
            .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${tierEmoji[alert.tier]} ${alert.tier.toUpperCase()} Alert: ${alert.campaignName}</h2>
            </div>
            <div class="content">
              <p>Hello ${persona.name},</p>
              <p>${alert.message}</p>
              <div class="metric">
                <strong>Metric:</strong> ${alert.metricName}<br>
                <strong>Current Value:</strong> ${alert.metricValue}<br>
                <strong>Threshold:</strong> ${alert.threshold}<br>
                <strong>Rule:</strong> ${alert.ruleName}
              </div>
              <p>Please review this alert in your AdSight dashboard.</p>
            </div>
            <div class="footer">
              <p>This is an automated alert from AdSight</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@adsight.com',
      to: persona.email,
      subject: `[${alert.tier.toUpperCase()}] ${alert.campaignName}: ${alert.metricName} Alert`,
      html,
    });

    return true;
  } catch (error) {
    console.error('Failed to send email alert:', error);
    return false;
  }
}

