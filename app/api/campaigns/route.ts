import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { Campaign } from '@/types';

export async function GET() {
  try {
    console.log('GET /api/campaigns called');
    const campaigns = readData<Campaign[]>('campaigns.json', []);
    console.log('Returning campaigns:', campaigns.length);
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Error in GET /api/campaigns:', error);
    return NextResponse.json({ error: 'Failed to fetch campaigns' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const campaigns = readData<Campaign[]>('campaigns.json', []);
    
    const newCampaign: Campaign = {
      id: `campaign-${Date.now()}`,
      name: body.name,
      platform: body.platform || 'google_ads',
      status: body.status || 'active',
      assignedPersonas: body.assignedPersonas || [],
      metrics: body.metrics || {},
      healthScore: 50,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    campaigns.push(newCampaign);
    writeData('campaigns.json', campaigns);
    
    return NextResponse.json(newCampaign, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}

