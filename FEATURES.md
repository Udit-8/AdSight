# AdSight Features Documentation

## MVP Features Implemented

### ✅ Real-Time Monitoring of KPIs
- Continuous tracking of ad campaign metrics
- Automatic health score calculation (0-100)
- Real-time dashboard updates every 30 seconds
- Support for multiple metrics: CTR, Conversion Rate, ROAS, Impressions, Clicks, etc.

### ✅ Multichannel Notifications
- **Email**: HTML-formatted alerts via SMTP
- **Slack**: Rich message blocks via Slack Web API or Webhooks
- **WhatsApp**: SMS-style alerts via Twilio
- **Dashboard**: In-app alert notifications

### ✅ Configurable Rules Engine
- Define custom alert rules for any metric
- Multiple condition types:
  - Above threshold
  - Below threshold
  - Change above percentage
  - Change below percentage
- Enable/disable rules dynamically
- Campaign-specific or global rules

### ✅ Persona-Specific Trigger Mapping
- Four persona types supported:
  - Performance Marketer (Agency Side)
  - Account Manager (Agency Side)
  - New Business Owner / Growth-Stage Founder (Client Side)
  - CMO / Marketing Head (Mid–Large Enterprise)
- Each persona can:
  - Choose preferred notification channels
  - Select which alert tiers to receive
  - Configure contact information per channel

### ✅ Campaign Health Score
- Calculated score from 0-100
- Weighted metric aggregation
- Color-coded visualization:
  - Green (80+): Excellent
  - Blue (60-79): Good
  - Yellow (40-59): Fair
  - Red (<40): Poor
- Configurable metric weights

### ✅ Tiered Alerts
- **Critical**: Red alerts for severe issues
- **Warning**: Yellow alerts for concerning metrics
- **Informational**: Blue alerts for notable changes
- Visual distinction in dashboard
- Filterable by tier

## User Interface

### Dashboard Overview
- Real-time statistics cards
- Campaign cards with health scores
- Quick access to all features
- Auto-refresh every 30 seconds

### Alerts Management
- List of all alerts (active and acknowledged)
- Filter by tier, campaign, or status
- Acknowledge alerts
- View notification delivery status

### Rules Management
- Create, edit, and delete alert rules
- Enable/disable rules
- Visual rule configuration form
- Rule preview and status

### Personas Management
- Add and configure personas
- Set notification preferences
- Map personas to campaigns
- View persona details

## API Endpoints

### Campaigns
- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/[id]` - Get campaign details
- `PATCH /api/campaigns/[id]` - Update campaign
- `DELETE /api/campaigns/[id]` - Delete campaign

### Rules
- `GET /api/rules` - List all rules
- `POST /api/rules` - Create rule
- `PATCH /api/rules/[id]` - Update rule
- `DELETE /api/rules/[id]` - Delete rule

### Personas
- `GET /api/personas` - List all personas
- `POST /api/personas` - Create persona

### Alerts
- `GET /api/alerts` - List alerts (with filters)
- `PATCH /api/alerts` - Acknowledge alert

### Metrics
- `POST /api/metrics` - Process metric and trigger alerts

### Utilities
- `POST /api/seed` - Seed initial sample data

## Data Models

### Campaign
- ID, name, platform, status
- Assigned personas
- Metrics dictionary
- Health score
- Timestamps

### Alert Rule
- ID, name, metric name
- Condition type and threshold
- Alert tier
- Campaign scope (optional)
- Enabled status

### Persona
- ID, type, name
- Contact information (email, Slack, WhatsApp)
- Preferred channels
- Alert tier preferences

### Alert
- ID, rule reference
- Campaign and metric info
- Tier and message
- Notification delivery status
- Acknowledgment status

## Future Enhancements

### Recommended for Production
1. **Database Integration**: Replace JSON files with PostgreSQL/MongoDB
2. **Authentication**: Add user login and multi-tenancy
3. **Ad Platform Integration**: Direct API connections to Google Ads, Facebook Ads
4. **Advanced Analytics**: Historical trends, forecasting
5. **Webhook Support**: Receive metrics from external systems
6. **Scheduled Reports**: Daily/weekly summary emails
7. **Alert Escalation**: Automatic escalation for unacknowledged critical alerts
8. **Custom Dashboards**: User-configurable dashboard layouts
9. **API Rate Limiting**: Protect endpoints from abuse
10. **Audit Logging**: Track all changes and actions

