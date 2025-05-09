import {
  NotionSchema,
  NotionFilterCondition,
  NotionSortCondition,
} from '@/types/notion';
import { TableColumn } from '@/types/table';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

const schemaToColumns = (schema: NotionSchema): TableColumn[] => {
  const columns: TableColumn[] = [];

  for (const [propertyId, property] of Object.entries(schema.properties)) {
    const column: TableColumn = {
      id: propertyId,
      name: property.name,
      type: property.type,
    };

    columns.push(column);
  }

  return columns;
};

export const useQueryTableSchema = () => {
  return useQuery({
    queryKey: ['tableSchema'],
    queryFn: async () => {
      const response = await fetch(`/api/table/schema`);

      if (!response.ok) {
        throw new Error(`Failed to fetch schema: ${response.status}`);
      }

      const schema: NotionSchema = await response.json();
      return {
        schema,
        columns: schemaToColumns(schema),
      };
    },
  });
};

export const useQueryTableData = (
  filters: NotionFilterCondition[] = [],
  sorts: NotionSortCondition[] = [],
  pageSize: number = 10,
  enabled: boolean = true
) => {
  return useInfiniteQuery({
    queryKey: ['tableData', { filters, sorts, pageSize }],
    queryFn: async ({ pageParam }) => {
      const response = await fetch('/api/table/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: filters.length > 0 ? filters : undefined,
          sorts: sorts.length > 0 ? sorts : undefined,
          page_size: pageSize,
          start_cursor: pageParam,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const result = await response.json();
      return result;
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.next_cursor,
    enabled,
  });
};
