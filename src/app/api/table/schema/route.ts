import { NextResponse } from 'next/server';

import { fetchDatabaseSchema } from '@/lib/notion/api';
import { env } from '@/utils/env';

export async function GET() {
  try {
    const schema = await fetchDatabaseSchema({ database_id: env.NOTION_DATABASE_ID});
    
    return NextResponse.json(schema);
  } catch (error) {
    console.error('Error in /api/table/schema:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch database schema' },
      { status: 500 }
    );
  }
}