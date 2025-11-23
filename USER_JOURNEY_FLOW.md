# AdSight - Visual User Journey

A concise, pictorial guide to user flows in AdSight.

---

## 1. Complete User Journey Overview

```mermaid
graph TD
    A([User Opens AdSight]) --> B{Persona Selected?}
    B -->|No| C[Choose Your Role]
    B -->|Yes| D[Dashboard]
    
    C --> C1[Performance Marketer]
    C --> C2[Account Manager]
    C --> C3[Business Owner]
    C --> C4[CMO]
    
    C1 --> D
    C2 --> D
    C3 --> D
    C4 --> D
    
    D --> E[Recent Alerts]
    D --> F[Campaign List]
    D --> G[Top Stats]
    
    E -->|Click Alert| H[Alert Details Modal]
    F -->|View Details| I[Campaign Page]
    
    H --> J[Mark Resolved/Snooze]
    I --> K[Health Score & Metrics]
    
    J --> D
    K --> D
    
    D -->|Navigate| L[Campaigns Page]
    D -->|Navigate| M[Alerts Tab]
    D -->|Navigate| N[Rules Tab]
    
    N --> O[Create/Edit Rules]
    O --> D
    
    D -->|Change Role| C
    
    style A fill:#4CAF50,color:#fff
    style D fill:#2196F3,color:#fff
    style H fill:#FF9800,color:#fff
    style I fill:#9C27B0,color:#fff
    style C fill:#E91E63,color:#fff
```

---

## 2. Alert Workflow (Critical Path)

```mermaid
graph LR
    A[Alert Triggered] --> B[Multi-Channel Notification]
    B --> C[Email]
    B --> D[Slack]
    B --> E[WhatsApp]
    B --> F[Dashboard]
    
    F --> G[User Sees Alert]
    C --> G
    D --> G
    E --> G
    
    G --> H{Click to View}
    H --> I[Alert Modal Opens]
    
    I --> J[Shows:<br/>Impact Analysis<br/>Recommendations<br/>History]
    
    J --> K{User Action}
    K -->|Resolve| L[Acknowledged]
    K -->|Snooze| M[Hidden 1hr]
    K -->|Close| N[Still Active]
    
    M --> O[Resurfaces After 1hr]
    O --> G
    
    style A fill:#F44336,color:#fff
    style B fill:#FF9800,color:#fff
    style I fill:#2196F3,color:#fff
    style L fill:#4CAF50,color:#fff
```

---

## 3. Daily Workflow by Persona

```mermaid
graph TD
    subgraph Performance Marketer
    PM1[Morning: Check Alerts] --> PM2[Analyze Critical Issues]
    PM2 --> PM3[Campaign Deep Dive]
    PM3 --> PM4[Optimize in Ad Platform]
    PM4 --> PM5[Mark Resolved]
    PM5 --> PM6[End of Day Review]
    end
    
    subgraph Account Manager
    AM1[Review Client Portfolios] --> AM2[Prepare Reports]
    AM2 --> AM3[Client Meeting]
    AM3 --> AM4[Show Live Dashboard]
    AM4 --> AM5[Adjust Rules]
    AM5 --> AM6[Weekly Summary]
    end
    
    subgraph Business Owner
    BO1[Mobile Quick Check] --> BO2[WhatsApp Alert]
    BO2 --> BO3[Review Unit Economics]
    BO3 --> BO4[Quick Decision]
    BO4 --> BO5[Delegate to Team]
    BO5 --> BO6[Weekly Financial Review]
    end
    
    subgraph CMO
    CMO1[Monthly Dashboard Review] --> CMO2[Team Performance Analysis]
    CMO2 --> CMO3[Campaign Portfolio Review]
    CMO3 --> CMO4[Strategic Decisions]
    CMO4 --> CMO5[Adjust Enterprise Rules]
    CMO5 --> CMO6[Executive Reporting]
    end
    
    style PM1 fill:#FF9800,color:#fff
    style AM1 fill:#2196F3,color:#fff
    style BO1 fill:#4CAF50,color:#fff
    style CMO1 fill:#9C27B0,color:#fff
```

---

## 4. Campaign Details Flow

```mermaid
graph TB
    A[Click View Details] --> B[Campaign Details Page]
    
    B --> C[Column 1:<br/>Health Score]
    B --> D[Column 2:<br/>Performance Metrics]
    B --> E[Column 3:<br/>Active Alerts]
    
    C --> C1[Score: 42/100<br/>Status: Critical]
    C1 --> C2[Contributors:<br/>ROAS: 45<br/>CVR: 38<br/>CTR: 52]
    
    D --> D1[CTR: 2.5%<br/>CVR: 1.8%<br/>ROAS: 2.1<br/>CPC: $0.85]
    D1 --> D2{Click Metric}
    D2 --> D3[Show 30-Day Graph]
    
    E --> E1[List of Alerts<br/>by Severity]
    E1 --> E2{Click Alert}
    E2 --> E3[Open Alert Modal]
    
    B --> F[Bottom Tabs]
    F --> F1[Performance Summary]
    F --> F2[Alert History]
    F --> F3[Team Actions]
    
    style B fill:#9C27B0,color:#fff
    style C1 fill:#F44336,color:#fff
    style D1 fill:#2196F3,color:#fff
    style E1 fill:#FF9800,color:#fff
```

---

## 5. Rules Configuration Flow

```mermaid
graph LR
    A[Rules Tab] --> B[View All Rules]
    
    B --> C{User Action}
    C -->|Create| D[New Rule Form]
    C -->|Edit| E[Load Existing Rule]
    C -->|Toggle| F[Enable/Disable]
    C -->|Delete| G[Confirm Delete]
    
    E --> D
    
    D --> H[Fill Form:<br/>1. Metric<br/>2. Condition<br/>3. Threshold<br/>4. Severity<br/>5. Campaigns<br/>6. Notifications]
    
    H --> I{Validate}
    I -->|Invalid| J[Show Errors]
    J --> H
    
    I -->|Valid| K[Save Rule]
    K --> L[Rule Active]
    L --> M[Monitor Campaigns]
    
    M --> N{Condition Met?}
    N -->|Yes| O[Trigger Alert]
    N -->|No| M
    
    F --> B
    G --> B
    
    style A fill:#2196F3,color:#fff
    style D fill:#FF9800,color:#fff
    style K fill:#4CAF50,color:#fff
    style O fill:#F44336,color:#fff
```

---

## 6. Page Navigation Map

```mermaid
graph TD
    HOME([Home]) --> PERSONA[Persona Selector]
    PERSONA --> DASH[Dashboard]
    
    DASH --> DASH_OVERVIEW[Overview Tab]
    DASH --> DASH_ALERTS[Alerts Tab]
    DASH --> DASH_RULES[Rules Tab]
    
    DASH_OVERVIEW -->|Click Alert| ALERT_MODAL[Alert Modal]
    DASH_OVERVIEW -->|View Details| CAMPAIGN_DETAIL[Campaign Details]
    DASH_OVERVIEW -->|Campaigns Nav| CAMPAIGNS_PAGE[Campaigns Page]
    
    CAMPAIGNS_PAGE -->|View Details| CAMPAIGN_DETAIL
    CAMPAIGN_DETAIL -->|Click Alert| ALERT_MODAL
    
    DASH_RULES -->|Create/Edit| RULE_FORM[Rule Form]
    
    ALERT_MODAL -->|Close| DASH
    CAMPAIGN_DETAIL -->|Back| DASH
    CAMPAIGNS_PAGE -->|Back| DASH
    RULE_FORM -->|Save| DASH
    
    DASH -->|Change Role| PERSONA
    
    style HOME fill:#4CAF50,color:#fff
    style DASH fill:#2196F3,color:#fff
    style CAMPAIGN_DETAIL fill:#9C27B0,color:#fff
    style ALERT_MODAL fill:#FF9800,color:#fff
    style PERSONA fill:#E91E63,color:#fff
```

---

## 7. Real-Time Alert Example (Performance Marketer)

```mermaid
sequenceDiagram
    participant System
    participant Dashboard
    participant PM as Performance Marketer
    participant Slack
    participant AdPlatform as Ad Platform
    
    System->>Dashboard: CVR drops to 1.5%
    System->>Dashboard: Trigger Alert
    System->>Slack: Send notification
    System->>PM: Email notification
    
    PM->>Slack: Sees alert (mobile)
    Slack->>Dashboard: Opens link
    
    Dashboard->>PM: Shows Alert Modal
    Note over PM: Reviews:<br/>Impact: -$2.4k daily<br/>Time to critical: 4hrs
    
    PM->>Dashboard: Views Campaign Details
    Dashboard->>PM: Shows metrics
    Note over PM: Identifies:<br/>Landing page issue
    
    PM->>AdPlatform: Reverts landing page
    PM->>Dashboard: Snooze alert 1hr
    
    Note over System: Wait 1 hour
    
    System->>Dashboard: Check CVR
    System->>PM: Alert resurfaces
    PM->>Dashboard: Verify CVR: 2.8%
    PM->>Dashboard: Mark as Resolved
    
    Dashboard->>System: Update alert status
```

---

## 8. Business Owner Mobile Alert Response

```mermaid
sequenceDiagram
    participant System
    participant WhatsApp
    participant BO as Business Owner
    participant Mobile as Mobile App
    participant Team
    
    System->>System: CAC exceeds $45
    System->>WhatsApp: Send alert
    
    Note over WhatsApp: 🔴 CRITICAL<br/>CAC: $45.50<br/>Target: $30.00<br/>Revenue risk: -$12k
    
    WhatsApp->>BO: Notification arrives
    BO->>WhatsApp: Reads message
    BO->>Mobile: Clicks link
    
    Mobile->>BO: Opens alert
    Note over BO: Calculates:<br/>Not profitable!<br/>Urgent action needed
    
    BO->>Team: Call PM
    Team->>System: Pause campaign
    Team->>BO: Confirm action
    
    BO->>Mobile: Add resolution note
    BO->>Mobile: Mark resolved
    Mobile->>System: Update status
```

---

## Key Points

### Color Legend
- 🟢 **Green** - Start/Success/Completion
- 🔵 **Blue** - Dashboard/Primary screens
- 🟣 **Purple** - Campaign screens
- 🟠 **Orange** - Alerts/Warnings
- 🔴 **Red** - Critical/High priority
- 🔴 **Pink** - Persona selection

### User Actions
- **View** - Navigate to new page
- **Click** - Open modal/expand
- **Mark Resolved** - Acknowledge alert
- **Snooze** - Hide temporarily
- **Create/Edit** - Modify rules

### Notification Channels
1. **Dashboard** - Always visible
2. **Email** - Detailed notification
3. **Slack** - Instant message
4. **WhatsApp** - Mobile urgent alerts

---

## How to View These Diagrams

**GitHub/GitLab:** Renders automatically ✅

**VS Code:** Install "Markdown Preview Mermaid Support" extension

**Online:** Copy code to [mermaid.live](https://mermaid.live/)

**Export:** Convert to PNG/SVG using online tools

---

*Simplified version - Last updated: November 23, 2025*
