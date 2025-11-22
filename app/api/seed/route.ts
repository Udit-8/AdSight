import { NextResponse } from 'next/server';
import { seedInitialData } from '@/lib/seed';

export async function POST() {
  try {
    seedInitialData();
    return NextResponse.json({ message: 'Data seeded successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}

