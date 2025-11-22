import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { Alert } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const campaignId = searchParams.get('campaignId');
    const tier = searchParams.get('tier');
    const acknowledged = searchParams.get('acknowledged');
    
    let alerts = readData<Alert[]>('alerts.json', []);
    
    if (campaignId) {
      alerts = alerts.filter(a => a.campaignId === campaignId);
    }
    
    if (tier) {
      alerts = alerts.filter(a => a.tier === tier);
    }
    
    if (acknowledged !== null) {
      alerts = alerts.filter(a => a.acknowledged === (acknowledged === 'true'));
    }
    
    // Sort by timestamp, newest first
    alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return NextResponse.json(alerts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId, acknowledged } = body;
    
    const alerts = readData<Alert[]>('alerts.json', []);
    const alert = alerts.find(a => a.id === alertId);
    
    if (!alert) {
      return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    }
    
    alert.acknowledged = acknowledged !== undefined ? acknowledged : !alert.acknowledged;
    writeData('alerts.json', alerts);
    
    return NextResponse.json(alert);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update alert' }, { status: 500 });
  }
}

