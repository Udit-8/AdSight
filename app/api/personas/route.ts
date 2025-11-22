import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { Persona } from '@/types';

export async function GET() {
  try {
    const personas = readData<Persona[]>('personas.json', []);
    return NextResponse.json(personas);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch personas' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const personas = readData<Persona[]>('personas.json', []);
    
    const newPersona: Persona = {
      id: `persona-${Date.now()}`,
      type: body.type,
      name: body.name,
      email: body.email,
      slackUserId: body.slackUserId,
      whatsappNumber: body.whatsappNumber,
      preferredChannels: body.preferredChannels || ['email', 'dashboard'],
      alertTiers: body.alertTiers || ['critical', 'warning', 'informational'],
    };
    
    personas.push(newPersona);
    writeData('personas.json', personas);
    
    return NextResponse.json(newPersona, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create persona' }, { status: 500 });
  }
}

