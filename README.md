# AdSight - Real-Time Ad Metrics Monitoring & Alerting Platform

AdSight is a comprehensive platform for monitoring ad campaign KPIs in real-time and triggering multi-channel alerts when metrics fall or spike beyond configured thresholds.

## Features

### MVP Features
- ✅ **Real-Time Monitoring of KPIs** - Continuous tracking of ad metrics
- ✅ **Multichannel Notifications** - Email, Slack, WhatsApp, and Dashboard alerts
- ✅ **Configurable Rules Engine** - Define custom triggers for any metric
- ✅ **Persona-Specific Trigger Mapping** - Route alerts to the right people via preferred channels
- ✅ **Campaign Health Score** - 0-100 score indicating overall campaign performance
- ✅ **Tiered Alerts** - Critical, Warning, and Informational alert levels

### Supported Personas
1. **Performance Marketer** (Agency Side)
2. **Account Manager** (Agency Side)
3. **New Business Owner / Growth-Stage Founder** (Client Side)
4. **CMO / Marketing Head** (Mid–Large Enterprise)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Notifications**: Nodemailer (Email), Slack Web API, Twilio (WhatsApp)
- **Data Storage**: JSON files (MVP - easily upgradeable to database)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd AdSight
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!
5. Seed initial data by visiting `/api/seed` or clicking "Load Sample Data" in the dashboard

The project is already configured for Vercel deployment with `vercel.json`.

**Important Note**: Vercel uses serverless functions with ephemeral file systems. Data stored in JSON files will not persist between deployments. For production use, consider upgrading to a database (see DEPLOYMENT.md for details).

## Project Structure

```
AdSight/
├── app/                    # Next.js app directory
│   ├── api/              # API routes
│   ├── dashboard/       # Dashboard pages
│   └── layout.tsx        # Root layout
├── components/           # React components
├── lib/                  # Utilities and services
│   ├── services/         # Notification services
│   ├── rules/            # Rules engine
│   └── monitoring/       # Monitoring logic
├── types/                # TypeScript types
└── data/                 # Data storage (JSON files)
```

## Configuration

### Setting Up Notifications

#### Email (SMTP)
Configure SMTP settings in `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Slack
1. Create a Slack app at https://api.slack.com/apps
2. Get Bot Token or set up Incoming Webhook
3. Add to `.env`:
```
SLACK_BOT_TOKEN=xoxb-your-token
# OR
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

#### WhatsApp (Twilio)
1. Sign up for Twilio
2. Get Account SID, Auth Token, and Phone Number
3. Add to `.env`:
```
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890
```

## Usage

1. **Configure Rules**: Set up alert rules in the dashboard
2. **Map Personas**: Assign personas to campaigns and notification channels
3. **Monitor**: View real-time metrics and health scores
4. **Receive Alerts**: Get notified via configured channels when thresholds are breached

## License

MIT

