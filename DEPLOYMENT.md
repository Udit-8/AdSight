# Deployment Guide for Vercel

This guide will help you deploy AdSight to Vercel using Git.

## Prerequisites

1. A GitHub, GitLab, or Bitbucket account
2. A Vercel account (sign up at [vercel.com](https://vercel.com))
3. Your AdSight project ready to commit

## Step 1: Initialize Git Repository

If you haven't already, initialize a Git repository:

```bash
cd AdSight
git init
git add .
git commit -m "Initial commit: AdSight MVP"
```

## Step 2: Push to Git Repository

Create a new repository on GitHub/GitLab/Bitbucket and push your code:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js
5. Configure environment variables (see Step 4)
6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

## Step 4: Configure Environment Variables

In your Vercel project settings, add these environment variables:

### Required (for notifications to work):
- `SMTP_HOST` - Your SMTP server (e.g., smtp.gmail.com)
- `SMTP_PORT` - SMTP port (usually 587)
- `SMTP_USER` - Your email address
- `SMTP_PASS` - Your email app password
- `SMTP_FROM` - Sender email address

### Optional (for specific channels):
- `SLACK_BOT_TOKEN` - For Slack notifications
- `SLACK_WEBHOOK_URL` - Alternative Slack webhook
- `TWILIO_ACCOUNT_SID` - For WhatsApp notifications
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_PHONE_NUMBER` - Your Twilio WhatsApp number

### App Configuration:
- `NEXT_PUBLIC_APP_URL` - Your Vercel deployment URL (auto-set)
- `NODE_ENV` - Set to "production"

## Step 5: Seed Initial Data

After deployment, visit:
```
https://your-app.vercel.app/api/seed
```

Or use curl:
```bash
curl -X POST https://your-app.vercel.app/api/seed
```

This will create sample personas, rules, and campaigns.

## Step 6: Test Your Deployment

1. Visit your deployed URL
2. Go to the dashboard
3. Create a test campaign
4. Create a test rule
5. Send a test metric to trigger alerts

## Important Notes

### File System Limitations on Vercel

Vercel uses serverless functions, which means:
- File system writes are **ephemeral** (they don't persist between deployments)
- For production, consider using a database (PostgreSQL, MongoDB, etc.)
- The current JSON file storage works for MVP but should be upgraded for production

### Recommended Upgrades for Production

1. **Database**: Replace JSON files with a database
   - Vercel Postgres
   - MongoDB Atlas
   - Supabase
   - PlanetScale

2. **Real-time Updates**: Add WebSocket support or use Vercel's Edge Functions

3. **Authentication**: Add user authentication (NextAuth.js, Clerk, etc.)

4. **API Rate Limiting**: Implement rate limiting for API routes

5. **Monitoring**: Add error tracking (Sentry, LogRocket, etc.)

## Troubleshooting

### Build Errors

- Check that all dependencies are in `package.json`
- Ensure TypeScript types are correct
- Check Vercel build logs for specific errors

### Environment Variables Not Working

- Make sure variables are set in Vercel dashboard
- Redeploy after adding new variables
- Check variable names match exactly (case-sensitive)

### File System Errors

- Remember that file writes don't persist on Vercel
- Consider using a database instead
- For MVP, data will reset on each deployment

## Next Steps

1. Set up a database for persistent storage
2. Add authentication
3. Integrate with actual ad platform APIs (Google Ads, Facebook Ads)
4. Add more sophisticated monitoring and alerting
5. Implement user management and multi-tenancy

