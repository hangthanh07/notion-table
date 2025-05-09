import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useQueryTableSchema, useQueryTableData } from './useTableData';
import {
  TableState,
  TableColumn,
  SortState,
} from '@/types/table';
import { resultsToRows } from '@/utils/notion-data';

type UseTableStateParams = {
  initialPageSize?: number;
};

export const useTableState = ({
  initialPageSize = 10,
}: UseTableStateParams) => {
  const [currentSorts, setCurrentSorts] = useState<SortState[]>([]);
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const columnsInitialized = useRef(false);

  const {
    data: schemaData,
    isLoading: isSchemaLoading,
    error: schemaError,
  } = useQueryTableSchema();

  const notionSorts = useMemo(() => {
    if (!currentSorts.length) return [];
    return currentSorts
      .filter((s) => !!s.columnId)
      .map((sort) => ({
        property: sort.columnId,
        direction: sort.direction,
      }));
  }, [currentSorts]);

  const {
    data: databaseData,
    isLoading: isDatabaseLoading,
    error: databaseError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQueryTableData([], notionSorts, initialPageSize);

  useEffect(() => {
    if (schemaData?.columns && !columnsInitialized.current) {
      setColumns(schemaData.columns);
      columnsInitialized.current = true;
    }
  }, [schemaData]);

  const rows = useMemo(() => {
    if (!databaseData?.pages) return [];
    return resultsToRows(databaseData.pages);
  }, [databaseData]);

  const tableState: TableState = useMemo(
    () => ({
      columns,
      rows,
      hasMore: Boolean(hasNextPage),
      nextCursor:
        databaseData?.pages?.[databaseData.pages.length - 1]?.next_cursor ||
        null,
    }),
    [columns, rows, hasNextPage, databaseData]
  );

  const addSort = ({ columnId, direction }: SortState) => {
    setCurrentSorts((prevSorts) => {
      const existingIndex = prevSorts.findIndex(
        (item) => item.columnId === columnId
      );
      if (existingIndex < 0) {
        return [...prevSorts, { columnId, direction }];
      } else {
        const newSorts = [...prevSorts];
        newSorts[existingIndex].direction = direction;
        return newSorts;
      }
    });
  };

  const removeSort = (columnId: string) => {
    setCurrentSorts(currentSorts.filter((item) => item.columnId !== columnId));
  };

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const reorderColumns = useCallback(
    (sourceIndex: number, destinationIndex: number) => {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        const [removed] = newColumns.splice(sourceIndex, 1);
        newColumns.splice(destinationIndex, 0, removed);
        return newColumns;
      });
    },
    []
  );

  const resizeColumn = useCallback((columnId: string, width: number) => {
    const newWidth = Math.max(50, width);

    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === columnId) {
          return { ...column, width: newWidth };
        }
        return column;
      });
    });
  }, []);

  const loading = isSchemaLoading || isDatabaseLoading || isFetchingNextPage;
  const error = schemaError || databaseError || null;

  return {
    tableState,
    loading,
    error: error as Error | null,
    currentSorts,
    loadMore,
    addSort,
    removeSort,
    reorderColumns,
    resizeColumn,
  };
};
