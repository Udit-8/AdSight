import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readData<T>(filename: string, defaultValue: T): T {
  const filePath = path.join(DATA_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File ${filename} doesn't exist, creating with default value`);
    writeData(filename, defaultValue);
    return defaultValue;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content) as T;
    console.log(`Successfully read ${filename}, data length:`, Array.isArray(data) ? data.length : 'not array');
    return data;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return defaultValue;
  }
}

export function writeData<T>(filename: string, data: T): void {
  const filePath = path.join(DATA_DIR, filename);
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Successfully wrote ${filename}, data length:`, Array.isArray(data) ? data.length : 'not array');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

