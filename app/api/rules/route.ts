import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { AlertRule } from '@/types';

export async function GET() {
  try {
    const rules = readData<AlertRule[]>('rules.json', []);
    return NextResponse.json(rules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rules' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rules = readData<AlertRule[]>('rules.json', []);
    
    const newRule: AlertRule = {
      id: `rule-${Date.now()}`,
      name: body.name,
      metricName: body.metricName,
      condition: body.condition,
      threshold: body.threshold,
      tier: body.tier,
      enabled: body.enabled !== undefined ? body.enabled : true,
      campaignId: body.campaignId,
    };
    
    rules.push(newRule);
    writeData('rules.json', rules);
    
    return NextResponse.json(newRule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create rule' }, { status: 500 });
  }
}

