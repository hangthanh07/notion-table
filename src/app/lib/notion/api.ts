import {
  NotionDatabaseQueryParams,
  NotionDatabaseSchemaParams,
} from '@/types/notion';
import { getNotionClient } from '.';

export const fetchDatabaseSchema = async (
  params: NotionDatabaseSchemaParams
) => {
  try {
    const notion = getNotionClient();
    const response = await notion.databases.retrieve({
      database_id: params.database_id,
    });

    return response;
  } catch (error) {
    console.error('Error fetching database schema:', error);
    throw error;
  }
};

export const queryDatabase = async (params: NotionDatabaseQueryParams) => {
  try {
    const { database_id, sorts, page_size = 25, start_cursor } = params;
    const notion = getNotionClient();

    const queryParams: any = {
      database_id,
      page_size,
    };


    if (sorts && sorts.length > 0) {
      queryParams.sorts = sorts.map(({ property, direction }) => ({
        property,
        direction,
      }));
    }

    if (start_cursor) {
      queryParams.start_cursor = start_cursor;
    }

    const response = await notion.databases.query(queryParams);
    return response;
  } catch (error) {
    console.error('Error querying database:', error);
    throw error;
  }
};
