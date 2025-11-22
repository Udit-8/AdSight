# Quick Start Guide

Get AdSight up and running in 5 minutes!

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration (at minimum, you need SMTP for email alerts):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@adsight.com
```

**For Gmail**: You'll need to create an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Seed Sample Data

Visit the dashboard and click "Load Sample Data" button, or:

```bash
curl -X POST http://localhost:3000/api/seed
```

This creates:
- 4 sample personas (one of each type)
- 5 sample alert rules
- 2 sample campaigns

### 5. Test Alert System

Send a test metric that will trigger an alert:

```bash
curl -X POST http://localhost:3000/api/metrics \
  -H "Content-Type: application/json" \
  -d '{
    "campaignId": "campaign-1",
    "name": "ctr",
    "value": 0.3,
    "previousValue": 2.5
  }'
```

This will:
1. Update the campaign's CTR metric
2. Check all rules
3. Trigger alerts if thresholds are breached
4. Send notifications to assigned personas

## Using the Dashboard

### Create a Campaign

1. Go to Dashboard → Overview
2. Click "Create Campaign"
3. Enter campaign name and platform
4. Assign personas who should receive alerts

### Create Alert Rules

1. Go to Dashboard → Rules
2. Click "+ Create Rule"
3. Configure:
   - Rule name
   - Metric to monitor
   - Condition (above/below threshold)
   - Threshold value
   - Alert tier (Critical/Warning/Informational)
   - Campaign (optional - leave blank for all campaigns)

### Add Personas

1. Go to Dashboard → Personas
2. Click "+ Add Persona"
3. Fill in:
   - Persona type
   - Name and contact info
   - Preferred notification channels
   - Alert tiers to receive

### View Alerts

1. Go to Dashboard → Alerts
2. See all active and acknowledged alerts
3. Click "Acknowledge" to mark alerts as resolved

## Testing Notifications

### Email
- Configure SMTP in `.env`
- Create a persona with an email address
- Trigger an alert

### Slack
- Create a Slack app at https://api.slack.com/apps
- Get Bot Token or set up Incoming Webhook
- Add `SLACK_BOT_TOKEN` or `SLACK_WEBHOOK_URL` to `.env`
- Add Slack User ID to persona

### WhatsApp
- Sign up for Twilio
- Get Account SID, Auth Token, and Phone Number
- Add to `.env`
- Add WhatsApp number to persona

## Next Steps

1. **Integrate Real Ad Data**: Connect to Google Ads or Facebook Ads APIs
2. **Set Up Monitoring**: Schedule metric collection (cron job, webhook, etc.)
3. **Customize Rules**: Create rules specific to your campaigns
4. **Configure Personas**: Add your team members with their preferences

## Troubleshooting

### "Failed to send email alert"
- Check SMTP credentials in `.env`
- For Gmail, use App Password, not regular password
- Verify SMTP port (587 for TLS, 465 for SSL)

### "No campaigns found"
- Click "Load Sample Data" in dashboard
- Or create a campaign manually

### Alerts not triggering
- Check that rules are enabled
- Verify metric names match rule metric names
- Ensure campaign has assigned personas
- Check persona alert tier preferences

### Data not persisting (Vercel)
- This is expected on Vercel (ephemeral file system)
- Upgrade to a database for production (see DEPLOYMENT.md)

## Need Help?

- Check [README.md](./README.md) for detailed documentation
- See [FEATURES.md](./FEATURES.md) for feature list
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

