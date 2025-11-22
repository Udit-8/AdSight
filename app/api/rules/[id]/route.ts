import { NextRequest, NextResponse } from 'next/server';
import { readData, writeData } from '@/lib/data';
import { AlertRule } from '@/types';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const rules = readData<AlertRule[]>('rules.json', []);
    const index = rules.findIndex(r => r.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
    }
    
    rules[index] = { ...rules[index], ...body };
    writeData('rules.json', rules);
    return NextResponse.json(rules[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update rule' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rules = readData<AlertRule[]>('rules.json', []);
    const filtered = rules.filter(r => r.id !== params.id);
    writeData('rules.json', filtered);
    return NextResponse.json({ message: 'Rule deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete rule' }, { status: 500 });
  }
}

