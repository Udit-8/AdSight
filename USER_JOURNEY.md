# AdSight - Complete User Journey Documentation

## Table of Contents
1. [Overview](#overview)
2. [Persona Types](#persona-types)
3. [Initial Setup & Onboarding](#initial-setup--onboarding)
4. [User Journey by Persona](#user-journey-by-persona)
5. [Core Features & Workflows](#core-features--workflows)
6. [Alert Management Journey](#alert-management-journey)
7. [Campaign Management Journey](#campaign-management-journey)
8. [Rules Configuration Journey](#rules-configuration-journey)
9. [Edge Cases & Error Scenarios](#edge-cases--error-scenarios)

---

## Overview

AdSight is an intelligent advertising monitoring and alerting platform designed to help marketing teams and business owners proactively manage their ad campaigns across multiple channels. The application provides real-time monitoring, persona-specific dashboards, and multi-channel notifications.

### Key Value Propositions
- **Real-time monitoring** of critical advertising KPIs
- **Persona-specific alerts** tailored to different stakeholder needs
- **Multi-channel notifications** (Email, Slack, WhatsApp, Dashboard)
- **Campaign health scoring** (0-100 scale)
- **Configurable rules engine** for custom trigger definitions
- **Tiered alert system** (Critical / Warning / Informational)

---

## Persona Types

AdSight supports four distinct personas, each with unique metrics and alert priorities:

### 1. Performance Marketer (Agency Side)
**Focus:** Tactical optimization and cost efficiency

**Key Metrics:**
- **Upper Funnel:** CPM, CTR
- **Mid Funnel:** CPC, Add-to-cart, Lead submission
- **Bottom Funnel:** CVR, CPA/CAC, ROAS

**Alert Triggers:**
- CAC increases 20-30% vs last 7-day baseline
- CVR drops 15-25% within 4 hours
- 60% of daily budget spent by noon
- CTR decreases while impressions remain steady
- MMP conversions lag dashboard data

### 2. Account Manager (Agency Side)
**Focus:** Client communication and delivery management

**Key Metrics:**
- Daily spend, pacing, sales/leads
- Creative status, weekly trends
- Campaign delivery status

**Alert Triggers:**
- Daily spend >120% of planned pacing
- Sales/leads drop before client review calls
- Creative rejections without timely notification
- CAC worsening week over week

### 3. New Business Owner / Growth-Stage Founder (Client Side)
**Focus:** Financial impact and unit economics

**Key Metrics:**
- Total spend, revenue, profitability
- CAC vs selling price & contribution margin
- Orders/leads per day

**Alert Triggers:**
- Negative profitability trends
- CAC exceeds acceptable threshold vs selling price
- Daily order/lead volume drops significantly
- Budget runway concerns

### 4. CMO / Marketing Head (Mid-Large Enterprise)
**Focus:** Strategic oversight and team governance

**Key Metrics:**
- Total spend vs revenue impact
- CAC trendline, blended ROAS
- Team performance metrics
- Budget runway, pipeline risk

**Alert Triggers:**
- Revenue impact not meeting targets
- CAC trendline deteriorating
- Team response time issues
- Budget runway falling below threshold
- Pipeline risk indicators

---

## Initial Setup & Onboarding

### Step 1: Landing Page
**URL:** `https://adsight.com/`

**User Action:**
1. User visits the application URL
2. System checks for existing persona selection in browser storage

**System Response:**
- If no persona is stored → Display Persona Selector screen
- If persona exists → Redirect to Dashboard

---

### Step 2: Persona Selection
**Screen:** Persona Selector

**User Experience:**
1. **Welcome Message:** "Select Your Role to Get Started"
2. **Four Persona Cards Displayed:**
   - Performance Marketer (Agency Side)
   - Account Manager (Agency Side)
   - New Business Owner / Growth-Stage Founder
   - CMO / Marketing Head

**Each Card Shows:**
- Persona name and context
- Key metrics tracked (visual badges)
- Trigger examples relevant to role
- "Select Role" button

**User Action:**
1. Reviews persona options
2. Identifies their role
3. Clicks "Select Role" button on appropriate card

**System Response:**
1. Stores persona selection in browser localStorage
2. Initiates data loading/seeding for selected persona
3. Redirects to Dashboard with persona-specific view

---

### Step 3: Initial Dashboard Load
**Screen:** Dashboard (Overview Tab)

**System Actions:**
1. Fetches or seeds campaign data
2. Loads alert data relevant to persona
3. Loads rule configurations
4. Calculates campaign health scores
5. Filters metrics based on persona type

**Loading States:**
- Display "Loading..." message during data fetch
- Show skeleton screens or loading indicators
- Handle errors gracefully if data fetch fails

---

## User Journey by Persona

### Journey 1: Performance Marketer Daily Workflow

#### Morning Routine (8:00 AM - 9:00 AM)

**Step 1: Login & Dashboard Review**
1. Opens AdSight application
2. Automatically logged in with Performance Marketer role
3. Dashboard loads with recent alerts at top

**Step 2: Review Recent Alerts**
1. Sees "Recent Alerts" section prominently displayed
2. Notices a CRITICAL alert: "Campaign Health Alert"
   - Summer Sale Campaign ROAS dropped to 2.1 (threshold: 3.0)
   - Message: "Revenue efficiency deteriorated. If trend persists 24h, projected daily revenue -18%."
3. Clicks on the alert to view details

**Step 3: Detailed Alert Analysis**
1. Modal opens with comprehensive alert breakdown:
   - **Alert Summary:** Metric (ROAS), Current Value (2.1), Threshold (3.0), Severity (Critical)
   - **Impact Analysis:** 
     - Projected Revenue Impact: -18%
     - Time to Critical: 24h
     - Affected Campaigns: 3
   - **Top Contributors:**
     - ROAS: -4.3
     - CVR: -2.1
     - Budget Pacing: -2.0
   - **Recommended Actions:**
     - Pause underperforming ad sets (Impact: +12% efficiency)
     - Increase bids on high-converting keywords (Impact: +8% conversions)
     - Adjust budget allocation (Impact: +5% ROAS)

**Step 4: Take Action**
1. Reviews suggested actions in the modal
2. Clicks "Apply" on "Pause underperforming ad sets"
3. System applies the recommendation (future feature)
4. Clicks "Mark as Resolved" to acknowledge alert
5. Closes modal

**Step 5: Review Campaign Details**
1. Scrolls to "Campaigns" section on dashboard
2. Sees table with campaigns showing:
   - Campaign name
   - Channel (Google Ads / Meta Ads)
   - Health Score (circular progress indicator)
   - Trend (↓ -1.3)
   - Alert status (CRITICAL badge)
   - "View Details" button
3. Clicks "View Details" on Summer Sale Campaign

**Step 6: Deep Campaign Analysis**
**Screen:** Campaign Detail Page

Views comprehensive campaign information:
- **Header:** Campaign name, platform, date range, status
- **Action Buttons:** Edit Campaign, Pause Campaign, View Reports

**Three-Column Layout:**

**Column 1: Health Score & Breakdown**
- Large health score circle (42/100) in red
- Previous score: 85
- Status: Critical
- Score contributors with progress bars:
  - ROAS: 45/100 (red)
  - CVR: 38/100 (red)
  - CTR: 52/100 (yellow)
  - Budget Pacing: 68/100 (yellow)
  - CPC: 75/100 (green)

**Column 2: Performance Metrics**
- CTR: 2.5% (target: 3.0%, status: Below Target)
- CVR: 1.8% (target: 3.5%, status: Critical)
- CPC: $0.85 (target: $1.00, status: Good)
- ROAS: 2.1 (target: 4.0, status: Critical)
- Daily Spend: $850 (budget: $1000, status: Under Budget)
- Impressions: 50,000
- Clicks: 1,250
- Conversions: 45

**Column 3: Active Alerts**
- List of active alerts for this campaign
- Each alert shows:
  - Severity badge
  - Alert title
  - Timestamp
  - Quick actions

**Step 7: Decision Making**
1. Identifies CVR and ROAS as primary issues
2. Notes that CPC is good, suggesting ad quality isn't the issue
3. Decides to check landing page performance
4. Returns to dashboard to review other campaigns

#### Mid-Day Check (12:00 PM - 1:00 PM)

**Step 1: Budget Pacing Alert**
1. Receives Slack notification: "Budget Pacing Alert - Summer Sale Campaign"
2. Opens AdSight to investigate
3. Navigates to Alerts tab

**Step 2: Alerts Tab Review**
**Screen:** Dashboard (Alerts Tab)

Views all alerts in categorized lists:
- **Unacknowledged Alerts (3):**
  - Critical: Campaign Health Alert
  - Warning: Budget Pacing Alert (NEW)
  - Warning: Low Conversion Rate
- **Acknowledged Alerts (5):**
  - Previous resolved alerts with timestamps

**Step 3: Alert Investigation**
1. Clicks on Budget Pacing Alert
2. Reviews details: Daily spend at 60% by noon
3. Checks if this aligns with campaign objectives
4. Determines this is expected due to time-based bidding strategy
5. Clicks "Acknowledge" to dismiss alert
6. Optionally adds a note: "Expected - time-based bidding active"

#### End of Day Review (5:00 PM - 6:00 PM)

**Step 1: Campaigns Overview**
1. Navigates to Campaigns page via top navigation
2. Sees all campaigns in grid view with cards

**Step 2: Campaign Search & Filter**
1. Uses search bar to filter campaigns
2. Types "Summer" to find Summer Sale Campaign
3. Applies filter by status: "Active"
4. Sorts by health score: "Lowest to Highest"

**Step 3: Bulk Campaign Review**
1. Reviews all low-performing campaigns
2. Notes trends across multiple campaigns
3. Plans optimization strategy for tomorrow

---

### Journey 2: Account Manager Weekly Review

#### Monday Morning: Client Prep (9:00 AM)

**Step 1: Dashboard Review**
1. Opens AdSight with Account Manager role
2. Reviews top-level stats:
   - Total Campaigns: 12
   - Avg Health Score: 68
   - Today's Spend: $15,450
   - Critical Alerts: 2

**Step 2: Prepare Client Report**
1. Navigates to Campaign Details for client campaigns
2. Takes screenshots of key metrics
3. Notes health score trends
4. Reviews alert history for discussion points

**Step 3: Rules Configuration**
**Screen:** Dashboard (Rules Tab)

Checks existing alert rules:
1. Clicks "Rules" in top navigation
2. Reviews active rules:
   - Low CTR Alert (Warning, threshold: 1.0%)
   - Critical CTR Drop (Critical, threshold: 0.5%)
   - Low Conversion Rate (Warning, threshold: 2.0%)
   - ROAS Below Target (Critical, threshold: 3.0)
   - High CTR Increase (Informational, threshold: +50%)

**Step 4: Create Custom Rule**
1. Clicks "Create New Rule" button
2. Fills in rule configuration:
   - **Rule Name:** "Client Review Call Alert"
   - **Metric:** Daily Spend
   - **Condition:** Above
   - **Threshold:** 120% of budget
   - **Severity:** Warning
   - **Campaign:** Select specific client campaigns
   - **Enabled:** Yes
3. Clicks "Save Rule"
4. System confirms rule created successfully

#### Wednesday: Client Meeting (2:00 PM)

**Step 1: Live Dashboard Sharing**
1. Opens AdSight on screen share
2. Shows client their campaign health scores
3. Walks through Recent Alerts that affected performance
4. Explains actions taken to resolve issues

**Step 2: Alert History Review**
1. Navigates to Alerts tab
2. Filters alerts by date range: Last 7 days
3. Shows client all acknowledged alerts and resolutions
4. Demonstrates proactive monitoring

---

### Journey 3: Business Owner Daily Check

#### Morning Snapshot (7:30 AM)

**Step 1: Quick Mobile Check**
1. Opens AdSight on mobile device
2. Dashboard loads in responsive mobile view
3. Reviews Recent Alerts section
4. Checks key financial metrics:
   - Today's Spend
   - Critical Alerts count

**Step 2: WhatsApp Alert Received**
1. Receives WhatsApp notification at 7:45 AM
2. Message: "⚠️ CRITICAL: CAC Alert - Product Launch Q4
   - CAC increased to $45.50 (threshold: $30.00)
   - This impacts your contribution margin
   - Revenue at risk: -$12,000 daily"
3. Clicks link in WhatsApp to open alert in app

**Step 3: Quick Decision**
1. Reviews alert details in mobile view
2. Sees CAC has spiked beyond acceptable unit economics
3. Needs to take immediate action
4. Calls performance marketer to pause campaign

#### Weekly Financial Review (Friday 10:00 AM)

**Step 1: Profitability Analysis**
1. Opens dashboard on desktop
2. Reviews financial metrics across all campaigns:
   - Total Spend: $15,000
   - Revenue: $67,500
   - Profitability: $52,500
   - Blended ROAS: 4.5

**Step 2: Campaign ROI Comparison**
1. Navigates to Campaigns page
2. Compares profitability across campaigns
3. Identifies best and worst performers
4. Makes budget reallocation decisions

**Step 3: Alert Rule Adjustment**
1. Navigates to Rules tab
2. Adjusts CAC threshold based on new pricing
3. Updates rule: CAC threshold from $30 to $35
4. Saves changes

---

### Journey 4: CMO Monthly Strategy Review

#### Monthly Dashboard Review (1st of Month)

**Step 1: Strategic Overview**
1. Opens AdSight with CMO role
2. Reviews month-over-month trends
3. Examines team performance metrics
4. Analyzes budget runway

**Step 2: Multi-Campaign Analysis**
1. Reviews all campaigns across teams
2. Identifies patterns in alert generation
3. Notes which teams are responding effectively
4. Identifies training opportunities

**Step 3: Governance Review**
1. Checks alert response times
2. Reviews acknowledgment rates
3. Identifies campaigns with repeated alerts
4. Plans strategic interventions

---

## Core Features & Workflows

### Feature 1: Real-Time Dashboard

#### Overview Tab
**Purpose:** High-level snapshot of all campaign performance

**Components:**
1. **Top Stats Bar:**
   - Total Campaigns
   - Average Health Score
   - Today's Spend
   - Critical Alerts

2. **Recent Alerts Section:**
   - Grid layout (1-3 columns based on screen size)
   - Up to 6 most recent unacknowledged alerts
   - Each alert card shows:
     - Severity badge (Critical/Warning/Info)
     - Timestamp
     - Alert title
     - Health score impact
     - Top contributors
     - Suggested actions
     - Quick action buttons (View, Acknowledge, Dismiss)

3. **Key Metrics Banner:**
   - Displays persona-specific metrics being tracked
   - Example: "Your Key Metrics: CPM, CTR, CPC, CAC, ROAS, CVR..."

4. **Campaigns Table:**
   - Campaign name and platform
   - Channel indicator
   - Health score (circular progress)
   - Trend indicator (↑↓ with change value)
   - Alert status badge
   - View Details button
   - Expandable metrics row showing top 4 persona-specific metrics

**User Interactions:**
- Click alert card → Opens detailed alert modal
- Click View Details → Navigates to campaign detail page
- Hover over health score → Shows tooltip with breakdown
- Auto-refresh every 30 seconds for real-time updates

---

### Feature 2: Alert Management System

#### Alert Detail Modal
**Triggered by:** Clicking any alert card

**Modal Structure:**

**Header:**
- Alert icon (⚠️)
- Alert title
- Campaign name
- Timestamp
- Close button (X)

**Body Sections:**

**1. Alert Summary**
- Metric name
- Current value (highlighted in red/yellow)
- Threshold value
- Severity level badge

**2. Impact Analysis**
- Projected revenue impact (percentage)
- Time to critical (hours/days)
- Number of affected campaigns
- Visual indicators for each metric

**3. Recommended Actions**
- List of 3-5 actionable items
- Each with:
  - Action description
  - Estimated impact
  - "Apply" button (future feature)

**4. Notification History**
- List of team members notified
- Channels used per person (email, slack, whatsapp)
- Delivery status

**Footer Actions:**
- **Mark as Resolved** button (green)
- **Snooze for 1 hour** button (gray)
- **Close** button (outlined)

**User Flow:**
1. User clicks alert card
2. Modal slides in with animation
3. User reviews all sections
4. User takes action:
   - Marks as resolved → Alert moves to acknowledged list
   - Snoozes → Alert hidden for 1 hour then reappears
   - Closes → No status change, can review again later

---

### Feature 3: Campaign Details Page

#### Navigation
- From dashboard: Click "View Details" button on campaign row
- Direct URL: `/campaign/[campaign-id]`

#### Page Structure

**Header Bar:**
- Campaign name (large, bold)
- Platform badge (Google Ads / Meta Ads)
- Date range selector
- Status indicator (Active / Paused / Ended)
- Action buttons:
  - Edit Campaign
  - Pause/Resume Campaign
  - View Reports
  - Back to Dashboard

**Main Content (3-Column Layout):**

**Column 1: Health Score (Left)**
- Large circular health score indicator
  - Color-coded: Green (80+), Blue (60-79), Yellow (40-59), Red (<40)
  - Shows current score and previous score
- Status text (Excellent / Good / Fair / Critical)
- Health Score Contributors:
  - List of 5-7 metrics affecting score
  - Each with:
    - Metric name
    - Score out of 100
    - Progress bar (color-coded)
    - Weight in calculation
- Score calculation explanation tooltip

**Column 2: Performance Metrics (Center)**
- Grid of key metrics (persona-specific)
- Each metric card shows:
  - Metric name
  - Current value
  - Target value
  - Status indicator (Good / Below Target / Critical)
  - Trend icon and percentage
  - Mini sparkline chart
- Metrics update in real-time
- Click metric → Expands to show historical graph

**Column 3: Active Alerts (Right)**
- List of alerts specific to this campaign
- Grouped by severity
- Each alert shows:
  - Severity badge
  - Alert title
  - Triggered timestamp
  - Quick view button
- "View All Alerts" link at bottom

**Bottom Section: Recent Performance**
- Tabbed interface:
  - Performance Summary (7-day, 14-day, 30-day views)
  - Alert History
  - Rule Triggers
  - Team Actions Log
- Summary cards:
  - Total impressions
  - Total clicks
  - Total conversions
  - Total spend
  - Average metrics
- Performance timeline graph

---

### Feature 4: Rules Configuration

#### Rules Tab (Dashboard)

**Purpose:** Configure custom alert rules for automated monitoring

**Page Layout:**

**Header:**
- "Alert Rules Configuration" title
- "Create New Rule" button (primary CTA)
- Search bar for filtering rules
- Filter dropdowns: Status (All/Enabled/Disabled), Severity (All/Critical/Warning/Info)

**Rules List:**
- Table view with columns:
  - Rule Name
  - Metric Monitored
  - Condition & Threshold
  - Severity
  - Campaigns Applied To
  - Status (Enabled/Disabled toggle)
  - Actions (Edit / Delete)

**Rule Details Expandable Row:**
- Click rule row to expand
- Shows:
  - Full rule configuration
  - Alert history (how many times triggered)
  - Affected campaigns
  - Last triggered timestamp
  - Notification settings

#### Create/Edit Rule Form

**Triggered by:** "Create New Rule" or "Edit" button

**Form Fields:**

**1. Basic Information:**
- **Rule Name:** Text input (required)
  - Example: "Low ROAS Alert"
- **Description:** Textarea (optional)
  - Example: "Alert when ROAS drops below target threshold"

**2. Metric Selection:**
- **Select Metric:** Dropdown (required)
  - Options: All available metrics (CPM, CTR, CPC, CVR, ROAS, CAC, etc.)
- **Condition:** Dropdown (required)
  - Options: Above, Below, Change Above, Change Below
- **Threshold:** Number input (required)
  - Unit depends on metric (%, $, ratio)
  - Example: 3.0 for ROAS

**3. Alert Configuration:**
- **Severity Level:** Radio buttons (required)
  - Critical (red) / Warning (yellow) / Informational (blue)
- **Time Window:** Dropdown (optional)
  - Options: Immediate, 15 minutes, 1 hour, 4 hours, 24 hours
  - Prevents alert fatigue

**4. Campaign Assignment:**
- **Apply to:** Radio buttons
  - All Campaigns
  - Specific Campaigns (opens multi-select)
- **Campaign Multi-Select:** (if specific selected)
  - Checkbox list of all campaigns
  - Search/filter functionality

**5. Notification Settings:**
- **Notify Personas:** Checkbox list
  - All assigned personas for selected campaigns
  - Can override default persona alert tiers
- **Channels:** Checkboxes
  - Dashboard (always on)
  - Email
  - Slack
  - WhatsApp

**6. Advanced Options (Collapsed by default):**
- **Cooldown Period:** Number input
  - Minutes between repeated alerts for same condition
  - Prevents spam
- **Auto-resolve:** Checkbox
  - Automatically mark as resolved when metric returns to normal
- **Custom Message Template:** Textarea
  - Override default alert message
  - Variables available: {metric}, {value}, {threshold}, {campaign}

**Form Actions:**
- **Save Rule** button (primary)
- **Save & Test** button (runs simulation)
- **Cancel** button
- **Delete Rule** button (if editing)

**Validation:**
- Required fields must be filled
- Threshold must be valid number
- At least one campaign must be selected (if specific)
- At least one persona must be selected

**Save Flow:**
1. User fills form
2. Clicks "Save Rule"
3. System validates inputs
4. If valid:
   - Creates/updates rule
   - Shows success message
   - Redirects to rules list
   - New rule appears with "Enabled" status
5. If invalid:
   - Shows error messages inline
   - Highlights problematic fields
   - User corrects and resubmits

---

### Feature 5: Multi-Channel Notifications

#### Notification Triggers

**When Alert is Generated:**
1. System evaluates all active rules against incoming metrics
2. Rule triggered if conditions met
3. System identifies assigned personas for campaign
4. For each persona:
   - Checks if persona should receive this alert tier
   - Determines preferred notification channels
   - Sends notifications via selected channels

#### Notification Channels

**1. Dashboard Notifications (Always On)**
- Alert appears in Recent Alerts section
- Badge counter updates in top navigation
- Alert added to Alerts tab list
- Real-time update without page refresh

**2. Email Notifications**
- Sent to persona's registered email
- Email template includes:
  - Subject: "[CRITICAL/WARNING] Alert: [Rule Name]"
  - Campaign name and platform
  - Metric details (current value, threshold)
  - Impact summary
  - Quick action links
  - Link to view in dashboard
- HTML formatted with brand styling

**3. Slack Notifications**
- Sent to persona's Slack user ID
- Message format:
  - Header with severity emoji (🔴 Critical, ⚠️ Warning, ℹ️ Info)
  - Campaign name (bold)
  - Metric summary
  - Impact bullets
  - Action buttons:
    - View in AdSight
    - Mark as Resolved
    - Snooze

**4. WhatsApp Notifications**
- Sent to persona's registered WhatsApp number
- Formatted message:
  - Emoji indicator based on severity
  - Alert title
  - Key metrics
  - Revenue impact
  - Link to dashboard

#### Notification Preferences (Future Enhancement)
- Per-persona configuration page
- Quiet hours settings
- Channel priority order
- Alert tier filtering
- Frequency caps

---

## Alert Management Journey

### Scenario: Critical Alert Response

**Context:** CVR drops suddenly on active campaign

**Timeline:**

**T+0 minutes (Alert Triggered):**
1. System detects CVR drop from 3.2% to 1.5%
2. Evaluates against rule: "Low Conversion Rate" (threshold: 2.0%)
3. Rule triggered with Warning severity
4. Identifies assigned personas: Sarah (Performance Marketer), Mike (Account Manager)

**T+1 minute (Notifications Sent):**
1. **Dashboard:** Alert appears in Recent Alerts section
2. **Email:** Sent to sarah@agency.com and mike@agency.com
3. **Slack:** Direct message sent to both users' Slack accounts
4. **Notification Log:** Records all delivery attempts and statuses

**T+5 minutes (Sarah Responds):**
1. Sarah sees Slack notification on mobile
2. Clicks "View in AdSight" link
3. Opens alert modal on mobile
4. Reviews impact analysis:
   - Projected revenue impact: -$2,400 daily
   - Time to critical: 4 hours
   - Affected campaigns: 1

**T+10 minutes (Investigation):**
1. Sarah reviews recommended actions
2. Clicks "View Campaign Details"
3. Examines detailed metrics:
   - Notices traffic quality unchanged (CTR stable)
   - Landing page might be the issue
4. Checks recent changes: Landing page updated yesterday

**T+15 minutes (Action Taken):**
1. Sarah reverts landing page to previous version (external system)
2. Returns to AdSight
3. Adds note to alert: "Landing page issue identified and reverted"
4. Clicks "Snooze for 1 hour" to monitor recovery

**T+75 minutes (Follow-up):**
1. Alert resurfaces after snooze period
2. Sarah checks updated metrics
3. CVR recovering: now at 2.8%
4. Clicks "Mark as Resolved"
5. Alert moves to acknowledged list

**T+90 minutes (Mike's Follow-up):**
1. Mike sees alert was resolved by Sarah
2. Reviews resolution notes
3. Adds to client report notes
4. Updates internal documentation

---

## Campaign Management Journey

### Scenario: New Campaign Launch

**Pre-Launch (Day -1):**

**Step 1: Campaign Creation (External Platform)**
1. User creates campaign in Google Ads/Meta Ads
2. Campaign goes live with budget and targeting

**Step 2: AdSight Integration (Future Feature)**
1. Campaign automatically syncs to AdSight
2. System prompts for configuration:
   - Assign personas to monitor
   - Set custom thresholds
   - Configure alert rules
3. User completes setup wizard

**Launch Day (Day 0):**

**Hour 0-2: Initial Monitoring**
1. Campaign appears in dashboard
2. Initial health score: 50 (neutral, insufficient data)
3. Status: "Learning Phase"
4. No alerts triggered (grace period)

**Hour 2-6: Data Accumulation**
1. Metrics begin populating
2. Health score updates: 50 → 45 → 52 → 58
3. First impressions and clicks recorded
4. Performance Marketer monitoring closely

**Hour 6-12: First Alert**
1. Alert triggered: "CPM Above Expected" (Informational)
2. Expected during learning phase
3. User reviews but doesn't take action
4. Acknowledges with note: "Learning phase - monitoring"

**Day 1-3: Stabilization**
1. Health score stabilizes around 65-70
2. Conversion tracking validates
3. Some warning alerts for optimization opportunities
4. User makes bid and creative adjustments

**Day 4-7: Optimization Phase**
1. Health score improves: 70 → 75 → 78
2. Fewer alerts triggered
3. Performance trending positive
4. Campaign considered stable

**Ongoing Monitoring:**
1. Daily health score checks
2. Weekly trend analysis
3. Monthly strategic reviews
4. Continuous rule refinement

---

### Scenario: Multi-Campaign Management

**Context:** Agency managing 15 campaigns across 5 clients

**Monday Morning Routine:**

**Step 1: Triage (15 minutes)**
1. Open dashboard
2. Review "Critical Alerts" stat: 3
3. Quickly scan Recent Alerts section
4. Identify most urgent issues
5. Prioritize response list

**Step 2: Critical Response (30 minutes)**
1. Address all critical alerts first
2. For each:
   - Open alert details
   - Assess impact
   - Decide action: immediate fix or escalate
   - Take action in ad platform
   - Mark as acknowledged with notes

**Step 3: Campaign Health Audit (20 minutes)**
1. Navigate to Campaigns page
2. Sort by health score (low to high)
3. Review bottom 5 campaigns
4. Identify common issues
5. Plan optimization strategy

**Step 4: Client Grouping (15 minutes)**
1. Filter campaigns by assigned persona (client)
2. Review each client's portfolio health
3. Prepare summary for each client
4. Note discussion points for weekly calls

**Mid-Week Check (Wednesday):**

**Step 1: Progress Review**
1. Review acknowledged alerts
2. Verify fixes are working
3. Check if any issues recurring
4. Update optimization tracking sheet

**Step 2: Proactive Adjustments**
1. Review warning alerts (not yet critical)
2. Make preemptive optimizations
3. Prevent escalation to critical

**End of Week (Friday):**

**Step 1: Weekly Report Prep**
1. Review week's alert history
2. Calculate resolution times
3. Identify patterns
4. Prepare insights for team meeting

**Step 2: Rules Refinement**
1. Analyze false positive alerts
2. Adjust thresholds if needed
3. Disable rules that aren't valuable
4. Create new rules for observed patterns

---

## Rules Configuration Journey

### Scenario: Custom Rule Creation for Budget Protection

**Context:** Business owner wants early warning when daily spend exceeds plan

**Step 1: Access Rules**
1. Navigate to Dashboard
2. Click "Rules" in top navigation
3. Rules configuration page loads

**Step 2: Initiate Creation**
1. Click "Create New Rule" button
2. Form modal opens

**Step 3: Configure Rule**
1. **Rule Name:** "Daily Budget Overrun Alert"
2. **Description:** "Alert when daily spend exceeds 110% of daily budget before 4 PM"
3. **Metric:** "daily_spend"
4. **Condition:** "Above"
5. **Threshold:** "1100" (for $1000 daily budget)
6. **Severity:** "Warning"
7. **Time Window:** "4 hours" (check at 4 PM)

**Step 4: Campaign Assignment**
1. Select "Specific Campaigns"
2. Choose: "Summer Sale Campaign", "Product Launch Q4"
3. Leave others unchecked

**Step 5: Notification Setup**
1. Persona: Check "Business Owner" (self)
2. Channels: Select "WhatsApp" and "Dashboard"
3. Leave Email unchecked (too much noise)

**Step 6: Advanced Settings**
1. Expand advanced options
2. Set cooldown: 240 minutes (don't alert more than once per 4 hours)
3. Enable auto-resolve: Yes (resolve if spend returns to acceptable range)

**Step 7: Save & Test**
1. Click "Save & Test" button
2. System simulates against last 7 days of data
3. Shows: "Would have triggered 2 times in past week"
4. Confirms this is expected
5. Clicks "Confirm Save"

**Step 8: Verification**
1. Rule appears in rules list
2. Status: "Enabled" (green toggle)
3. Applied to: 2 campaigns
4. Last triggered: Never
5. System now monitoring

---

### Scenario: Rule Adjustment After False Positives

**Context:** Rule triggering too frequently with low-value alerts

**Problem Identification:**
1. Performance Marketer notices receiving 5-6 alerts daily
2. Most alerts are not actionable
3. Alert fatigue setting in
4. Decides to review and adjust rules

**Step 1: Analyze Alert History**
1. Navigate to Alerts tab
2. Filter by rule: "Low CTR Alert"
3. Reviews last 20 triggers
4. Notices: 15 out of 20 were false positives
5. CTR fluctuations normal during certain hours

**Step 2: Edit Rule**
1. Goes to Rules tab
2. Finds "Low CTR Alert" rule
3. Current threshold: 1.0%
4. Clicks "Edit" button

**Step 3: Adjust Threshold**
1. Changes threshold: 1.0% → 0.8%
2. Adds time window: "2 hours" (must persist)
3. Increases cooldown: 60 → 120 minutes

**Step 4: Save & Validate**
1. Clicks "Save & Test"
2. System shows: "Would have triggered 3 times (vs 20) in past week"
3. Improvement confirmed
4. Saves changes

**Step 5: Monitor Results**
1. Over next week, only 2 alerts triggered
2. Both were actionable
3. Alert fatigue reduced
4. Rule effectiveness improved

---

## Edge Cases & Error Scenarios

### Scenario 1: No Internet Connection

**User Action:** Opens dashboard while offline

**System Response:**
1. Attempts to load data
2. Fails to fetch from API
3. Displays error message: "Unable to connect. Please check your internet connection."
4. Shows last cached data (if available)
5. Retry button available
6. Auto-retries every 30 seconds

**User Options:**
- Click retry button manually
- Wait for auto-retry
- View cached data (read-only)

---

### Scenario 2: Stale Data

**Context:** Real-time updates fail but user is online

**Detection:**
1. System tracks last successful data fetch
2. If >5 minutes old, shows warning banner

**Warning Display:**
- Yellow banner at top of page
- Message: "Data may be outdated. Last updated: 8 minutes ago"
- Refresh button
- Auto-refresh attempted in background

---

### Scenario 3: Campaign Not Found

**User Action:** Clicks "View Details" on campaign that was just deleted

**System Response:**
1. Navigates to /campaign/[id]
2. API returns 404
3. Shows error page:
   - "Campaign Not Found"
   - "This campaign may have been deleted or you may not have access."
   - "Return to Dashboard" button
4. Automatically redirects to dashboard after 5 seconds

---

### Scenario 4: Persona Change Mid-Session

**User Action:** Clicks "Change Role" button

**System Flow:**
1. Confirmation modal: "Are you sure? This will reload the dashboard."
2. User confirms
3. System:
   - Clears localStorage persona setting
   - Redirects to home page
   - Shows persona selector
4. User selects new persona
5. Dashboard reloads with new persona's view
6. Metrics filter to new persona's priorities

---

### Scenario 5: Alert Already Acknowledged

**User Action:** Clicks alert that was just acknowledged by teammate

**System Response:**
1. Opens alert modal
2. Shows banner: "This alert was recently resolved by Mike Johnson"
3. Resolution timestamp displayed
4. Resolution notes visible
5. "Mark as Resolved" button disabled
6. Can still view all details
7. Option to "Reopen Alert" if still relevant

---

### Scenario 6: Conflicting Rules

**Context:** Two rules targeting same metric with different thresholds

**Example:**
- Rule 1: ROAS below 3.0 → Warning
- Rule 2: ROAS below 2.5 → Critical

**System Behavior:**
1. ROAS drops to 2.3
2. Both rules evaluate to true
3. System triggers highest severity (Critical)
4. Single alert created (not duplicate)
5. Alert references both rules in details

**User Sees:**
- One critical alert (not two)
- Alert details show: "Triggered by 2 rules"
- Both rule names listed

---

### Scenario 7: API Rate Limiting

**Context:** User rapidly clicking refresh or making many requests

**System Response:**
1. API returns 429 Too Many Requests
2. Frontend catches error
3. Shows toast notification: "Too many requests. Please wait a moment."
4. Implements exponential backoff
5. Retries after 5s, then 10s, then 20s
6. User experience minimally impacted

---

### Scenario 8: Invalid Persona Data

**Context:** Browser localStorage corrupted or tampered

**Detection:**
1. Dashboard loads
2. Reads persona from localStorage
3. Persona value is invalid (not one of four types)

**System Response:**
1. Logs error to console
2. Clears invalid localStorage
3. Redirects to persona selector
4. Shows message: "Session expired. Please select your role again."

---

### Scenario 9: Empty State - No Campaigns

**Context:** New user or all campaigns deleted

**User Sees:**
1. Dashboard loads successfully
2. Top stats show zeros
3. No Recent Alerts (expected)
4. Campaigns section shows empty state:
   - Icon (📊)
   - Message: "No campaigns found"
   - Subtext: "Campaigns will appear here once data is synced"
   - "Refresh" button

**User Actions:**
- Wait for data sync
- Click refresh manually
- Check back later

---

### Scenario 10: Rule Creation Validation Errors

**User Action:** Tries to save rule with missing required fields

**System Response:**
1. Prevents form submission
2. Scrolls to first error
3. Highlights all error fields in red
4. Shows inline error messages:
   - "Rule name is required"
   - "Threshold must be a positive number"
   - "At least one campaign must be selected"
5. User corrects errors
6. Validation re-runs on blur
7. Green checkmark appears when field valid

---

## User Journey Completion Checklist

### For Performance Marketers:
- ✅ Quick morning alert review
- ✅ Deep dive into critical issues
- ✅ Campaign health monitoring
- ✅ Tactical optimization actions
- ✅ Budget pacing checks
- ✅ End-of-day performance review

### For Account Managers:
- ✅ Client portfolio overview
- ✅ Alert history for reporting
- ✅ Custom rule configuration for client needs
- ✅ Multi-campaign comparison
- ✅ Weekly trend analysis
- ✅ Client communication prep

### For Business Owners:
- ✅ Financial impact visibility
- ✅ CAC and unit economics monitoring
- ✅ Mobile-friendly quick checks
- ✅ WhatsApp alert integration
- ✅ Profitability tracking
- ✅ ROI analysis across campaigns

### For CMOs:
- ✅ Strategic dashboard overview
- ✅ Team performance visibility
- ✅ Budget runway monitoring
- ✅ Cross-campaign analysis
- ✅ Governance and compliance checks
- ✅ Executive reporting preparation

---

## Future Enhancements

### Planned Features:
1. **Automated Actions:**
   - Click "Apply" on recommendations to execute changes
   - Auto-pause campaigns on critical alerts
   - Auto-budget adjustments

2. **Advanced Analytics:**
   - Predictive alerts (issues before they happen)
   - Trend forecasting
   - Anomaly detection with AI

3. **Collaboration Tools:**
   - Team comments on alerts
   - Task assignment
   - Resolution workflows

4. **Integrations:**
   - Direct API connections to ad platforms
   - Bi-directional sync
   - CRM integrations

5. **Custom Dashboards:**
   - Drag-and-drop widgets
   - Personalized metric cards
   - Custom date ranges and comparisons

6. **Mobile App:**
   - Native iOS and Android apps
   - Push notifications
   - Offline mode

---

## Conclusion

AdSight provides a comprehensive, persona-driven approach to advertising campaign monitoring and alerting. Each user journey is optimized for the specific needs of different stakeholders, from tactical marketers to strategic executives. The system balances automation with human oversight, providing intelligent alerts while minimizing noise and alert fatigue.

The multi-channel notification system ensures critical issues are never missed, while the configurable rules engine allows each organization to customize monitoring to their unique needs and thresholds.

**Key Success Metrics:**
- Average alert response time < 15 minutes
- Alert acknowledgment rate > 90%
- False positive rate < 10%
- User engagement (daily active users) > 80%
- Campaign health score improvement over 30 days

---

*Last Updated: November 23, 2025*
*Version: 1.0*
*Document Owner: Product Team*

