import { NextResponse } from 'next/server';
import { seedInitialData, getSeedData } from '@/lib/seed';

export async function POST() {
  try {
    console.log('Seeding data...');
    seedInitialData();
    console.log('Data seeded successfully');
    
    // Return the seeded data for verification
    const seedData = getSeedData();
    return NextResponse.json({ 
      message: 'Data seeded successfully',
      data: {
        campaigns: seedData.campaigns.length,
        rules: seedData.rules.length,
        personas: seedData.personas.length
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed data', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Return the seed data directly without file system
    const seedData = getSeedData();
    return NextResponse.json(seedData);
  } catch (error) {
    console.error('Get seed data error:', error);
    return NextResponse.json({ error: 'Failed to get seed data' }, { status: 500 });
  }
}

