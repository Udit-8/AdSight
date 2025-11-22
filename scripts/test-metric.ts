/**
 * Test script to send a sample metric and trigger alerts
 * Run with: npx tsx scripts/test-metric.ts
 */

async function sendTestMetric() {
  const metric = {
    campaignId: 'campaign-1', // Make sure this campaign exists
    name: 'ctr',
    value: 0.3, // Low CTR to trigger alert
    previousValue: 2.5,
    change: -2.2,
    changePercent: -88,
  };

  try {
    const response = await fetch('http://localhost:3000/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
    });

    const result = await response.json();
    console.log('Metric sent:', result);
    console.log('Alerts triggered:', result.alerts?.length || 0);
  } catch (error) {
    console.error('Error sending metric:', error);
  }
}

sendTestMetric();

