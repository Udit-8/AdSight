import { NextResponse } from 'next/server';
import { readData } from '@/lib/data';
import { Campaign } from '@/types';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const DATA_DIR = path.join(process.cwd(), 'data');
    
    const debug = {
      dataDir: DATA_DIR,
      dataDirExists: fs.existsSync(DATA_DIR),
      files: fs.existsSync(DATA_DIR) ? fs.readdirSync(DATA_DIR) : [],
      campaigns: readData<Campaign[]>('campaigns.json', []),
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(debug);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
