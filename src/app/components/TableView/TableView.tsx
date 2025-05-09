'use client';

import { useCallback, useMemo } from 'react';

import ColumnHeader from '@/components/ColumnHeader/ColumnHeader';
import { Cell } from '@/components/Cell/Cell';
import ActiveSorts from '@/components/ActiveSorts/ActiveSorts';
import { useTableState } from '@/hooks/useTableState';
import { TableColumn } from '@/types/table';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  LinearProgress,
  Button,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

export type TableViewProps = {
  pageSize?: number;
};

export const TableView = ({ pageSize = 10 }: TableViewProps) => {
  const {
    tableState,
    loading,
    error,
    currentSorts,
    loadMore,
    addSort,
    removeSort,
    reorderColumns,
    resizeColumn,
  } = useTableState({
    initialPageSize: pageSize,
  });

  const columns = useMemo(() => tableState.columns, [tableState.columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column.id === active.id);
      const newIndex = columns.findIndex((column) => column.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderColumns(oldIndex, newIndex);
      }
    }
  };

  const renderColumnHeaders = useCallback(
    (columns: TableColumn[]) => {
      return columns.map((column) => {
        const columnId = column.id;
        const actions = [
          {
            icon: <ArrowUpwardIcon />,
            title: 'Sort ascending',
            action: () => addSort({ columnId, direction: 'ascending' }),
          },
          {
            icon: <ArrowDownwardIcon />,
            title: 'Sort descending',
            action: () => addSort({ columnId, direction: 'descending' }),
          },
        ];

        return (
          <ColumnHeader
            key={columnId}
            column={column}
            resizeColumn={resizeColumn}
            actions={actions}
          />
        );
      });
    },
    [columns, addSort, resizeColumn]
  );

  if (!!error) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography color='error'>
          Error loading table data: {error.message}
        </Typography>
      </Paper>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {loading && <LinearProgress />}
        <ActiveSorts
          removeSort={removeSort}
          currentSorts={currentSorts}
        />

        <TableContainer>
          <Table
            stickyHeader
            aria-label='Notion Table View'
          >
            <TableHead>
              <TableRow>
                <SortableContext
                  items={columns.map((col) => col.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  {renderColumnHeaders(columns)}
                </SortableContext>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableState.rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align='center'
                    sx={{ py: 3 }}
                  >
                    {loading ? 'Loading data...' : 'No data found'}
                  </TableCell>
                </TableRow>
              ) : (
                tableState.rows.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                  >
                    {columns.map((column) => (
                      <Cell
                        key={`${row.id}-${column.id}`}
                        value={row[column.id]}
                        type={column.type}
                      />
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!loading && tableState.hasMore && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Button
              variant='outlined'
              onClick={loadMore}
              disabled={loading}
            >
              Load More
            </Button>
          </Box>
        )}
      </Paper>
    </DndContext>
  );
};

export default TableView;
