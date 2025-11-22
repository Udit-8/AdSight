import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { Persona, PersonaType } from '@/types';
import { personaConfigs } from '@/lib/personaConfig';

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
    
    const personaType = body.type as PersonaType;
    const config = personaConfigs[personaType];
    
    if (!config) {
      return NextResponse.json({ error: 'Invalid persona type' }, { status: 400 });
    }
    
    const newPersona: Persona = {
      id: `persona-${Date.now()}`,
      type: personaType,
      name: body.name,
      email: body.email,
      slackUserId: body.slackUserId,
      whatsappNumber: body.whatsappNumber,
      preferredChannels: body.preferredChannels || config.preferredChannels,
      alertTiers: body.alertTiers || config.alertTiers,
      metrics: config.metrics,
      triggers: config.triggers,
    };
    
    personas.push(newPersona);
    writeData('personas.json', personas);
    
    return NextResponse.json(newPersona, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create persona' }, { status: 500 });
  }
}

