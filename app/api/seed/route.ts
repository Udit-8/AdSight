import { NextResponse } from 'next/server';
import { seedInitialData } from '@/lib/seed';

export async function POST() {
  try {
    console.log('Seeding data...');
    seedInitialData();
    console.log('Data seeded successfully');
    return NextResponse.json({ message: 'Data seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}

