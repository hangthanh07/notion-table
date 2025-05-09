import { NextRequest, NextResponse } from 'next/server';

import { queryDatabase } from '@/lib/notion/api';
import { NotionFilterCondition, NotionSortCondition } from '@/types/notion';
import { env } from '@/utils/env';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      filter, 
      sorts, 
      page_size,
      start_cursor 
    } = body;

    let filterConditions: NotionFilterCondition[] | undefined;
    let sortConditions: NotionSortCondition[] | undefined;

    if (filter) {
      filterConditions = Array.isArray(filter) ? filter : [filter];
    }

    if (sorts) {
      sortConditions = Array.isArray(sorts) ? sorts : [sorts];
    }

    const response = await queryDatabase({
      database_id: env.NOTION_DATABASE_ID,
      filter: filterConditions,
      sorts: sortConditions,
      page_size,
      start_cursor
    });
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in /api/table/data:', error);
    
    return NextResponse.json(
      { error: 'Failed to query database' },
      { status: 500 }
    );
  }
}