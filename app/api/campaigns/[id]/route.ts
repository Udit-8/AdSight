import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { Campaign } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaigns = readData<Campaign[]>('campaigns.json', []);
    const campaign = campaigns.find(c => c.id === params.id);
    
    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    
    return NextResponse.json(campaign);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const campaigns = readData<Campaign[]>('campaigns.json', []);
    const index = campaigns.findIndex(c => c.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }
    
    campaigns[index] = {
      ...campaigns[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    writeData('campaigns.json', campaigns);
    return NextResponse.json(campaigns[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const campaigns = readData<Campaign[]>('campaigns.json', []);
    const filtered = campaigns.filter(c => c.id !== params.id);
    writeData('campaigns.json', filtered);
    return NextResponse.json({ message: 'Campaign deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete campaign' }, { status: 500 });
  }
}

