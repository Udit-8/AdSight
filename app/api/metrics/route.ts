import { NextRequest, NextResponse } from 'next/server';
import { readData } from '@/lib/data';
import { processMetric } from '@/lib/services/monitoring';
import { Metric } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const metric: Metric = {
      id: `metric-${Date.now()}`,
      name: body.name,
      value: body.value,
      previousValue: body.previousValue,
      change: body.change,
      changePercent: body.changePercent,
      timestamp: new Date().toISOString(),
      campaignId: body.campaignId,
    };
    
    const campaigns = readData('campaigns.json', []);
    const rules = readData('rules.json', []);
    const personas = readData('personas.json', []);
    
    const alerts = await processMetric(metric, campaigns, rules, personas);
    
    return NextResponse.json({ metric, alerts });
  } catch (error) {
    console.error('Error processing metric:', error);
    return NextResponse.json({ error: 'Failed to process metric' }, { status: 500 });
  }
}

